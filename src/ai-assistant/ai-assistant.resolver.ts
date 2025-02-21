import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AiAssistantService } from './ai-assistant.service';
import { AiAssistant } from './object-types/ai-assistant.object.type';
import { CreateAiAssistantInput } from './dto/create-ai-assistant.input';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateRatingAiAssistantInput } from './dto/update-ai-assistant.input';
import { UpdateResponsePastedInput } from './dto/update-response-pasted.input';

@Resolver(() => AiAssistant)
@UseGuards(AuthGuard)
export class AiAssistantResolver {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Mutation(() => AiAssistant)
  createAIResponse(
    @Args('createAiAssistantInput')
    createAiAssistantInput: CreateAiAssistantInput,
    @Context() context: any,
  ) {
    return this.aiAssistantService.create(
      createAiAssistantInput,
      context.req.user.email,
    );
  }

  @Mutation(() => AiAssistant)
  updateResponseRating(
    @Args('updateRatingAiAssistantInput')
    updateRatingAiAssistantInput: UpdateRatingAiAssistantInput,
    @Context() context: any,
  ) {
    return this.aiAssistantService.updateResponseRating(
      updateRatingAiAssistantInput,
      context.req.user.email,
    );
  }

  @Mutation(() => AiAssistant)
  updateResponsePasted(
    @Args('updateResponsePastedInput')
    updateResponsePastedInput: UpdateResponsePastedInput,
    @Context() context: any,
  ) {
    return this.aiAssistantService.updateResponsePasted(
      updateResponsePastedInput,
      context.req.user.email,
    );
  }
}
