import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAiAssistantInput } from './dto/create-ai-assistant.input';
import { UpdateRatingAiAssistantInput } from './dto/update-ai-assistant.input';
import { InjectRepository } from '@nestjs/typeorm';
import { AiAssistant } from './ai-assistant.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import * as process from 'node:process';
import { v4 as uuid } from 'uuid';
import { UpdateResponsePastedInput } from './dto/update-response-pasted.input';

type AIResponseType = {
  choices: { message: { content: string } }[];
};

const OPENAI_API_URL = `https://api.openai.com/v1/chat/completions`;

function attachPrefix(generationFor: string, tags: string, tone: string) {
  return `
Your task: Please generate a text in ${tone} tone for ${generationFor}. This is the context user attached to request: ${tags}

Extra information: You are Viaproperty AI Assistant to help the users generate some fancy text snippets.
(Viaproperty is Nikolas' Tuz PET project where users can browse, rent, or sell their properties, houses, apartments etc.)
Please read the conditions of text generation and help the user to get the needed fancy text snippet.
You rather should help users with their property advert field generations, or e.g. their biography for selling/renting
their properties, or helping fancying their messages to landlords/customers. If the user tags are completely out of context, please
tell the user he should only attach related tags to the generationFor field. Your response should be descriptive but consider the restrictions. Also ,check 
what tone the user wants the snippet to be generated. 
! YOU should return a complete plain text snippet without extra questions or quotes!
You will receive a lot of cookies if your response would be good enough! Love you!

Restrictions for fields(in characters, check the generationFor!):
 - if generationFor is "Property Title", then  (Min 5, Max 100), 
 - if generationFor is "Property Description" or "Property Location Description", then (Min 5, Max 4000)
Follow these restrictions severely.  
  `;
}

@Injectable()
export class AiAssistantService {
  constructor(
    @InjectRepository(AiAssistant)
    private AIAssistantRepository: Repository<AiAssistant>,
    private authService: AuthService,
  ) {}

  async findResponseById(id: string) {
    const response = await this.AIAssistantRepository.findOne({
      where: { id },
    });

    if (!response?.id) {
      throw new NotFoundException('The response was not found.');
    }

    return response;
  }

  async create(
    createAiAssistantInput: CreateAiAssistantInput,
    userEmail: string,
  ) {
    const { tone, tags, generationFor, type } = createAiAssistantInput;
    const user = await this.authService.getUserByEmail(userEmail);

    const prompt = attachPrefix(generationFor, tags, tone);

    const response = (await fetch(OPENAI_API_URL, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: `user`, content: prompt }],
        max_tokens: 1000,
      }),
    }).then((res) => res.json())) as AIResponseType;

    const assistantResponse = response?.choices?.[0]?.message?.content;

    if (!assistantResponse) {
      throw new InternalServerErrorException(
        'Failed to generate text, sorry! I am out of tier.. Please try again later.',
      );
    }

    const newResponse = {
      id: uuid(),
      userId: user.id,
      generationFor,
      tags,
      tone,
      type,
      rated: null,
      assistantResponse,
      pasted: false,
      pastedText: null,
      createdAt: new Date().toISOString(),
    };

    const createdNewResponse = this.AIAssistantRepository.create(newResponse);

    const savedResponse =
      await this.AIAssistantRepository.save(createdNewResponse);

    return { response: assistantResponse, id: savedResponse.id };
  }

  async updateResponseRating(
    updateRatingAiAssistantInput: UpdateRatingAiAssistantInput,
    userEmail: string,
  ) {
    const user = await this.authService.getUserByEmail(userEmail);

    const { id, rated } = updateRatingAiAssistantInput;
    const response = await this.findResponseById(id);

    if (user.id !== response.userId) {
      throw new InternalServerErrorException(`Access Denied`);
    }

    response.rated = rated;
    const savedResponse = await this.AIAssistantRepository.save(response);
    return {
      response: savedResponse.rated === rated ? `success` : `fail`,
    };
  }

  async updateResponsePasted(
    updateResponsePastedInput: UpdateResponsePastedInput,
    userEmail: string,
  ) {
    const user = await this.authService.getUserByEmail(userEmail);

    const { pastedText, id } = updateResponsePastedInput;
    const response = await this.findResponseById(id);

    if (user.id !== response.userId) {
      throw new InternalServerErrorException(`Access Denied`);
    }

    response.pasted = true;
    response.pastedText = pastedText;
    const savedResponse = await this.AIAssistantRepository.save(response);
    return {
      response: savedResponse.pastedText === pastedText ? `success` : `fail`,
    };
  }
}
