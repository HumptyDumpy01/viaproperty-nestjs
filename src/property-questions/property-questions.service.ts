import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyQuestions } from './property-questions.entity';
import { PropertyQuestionInput } from './inputs/property-question.input';
import { showErrorMessage } from '../../utils/functions/showErrorMessage';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { PropertyService } from '../property/property.service';
import { AuthService } from '../auth/auth.service';
import { PropertyReplyInput } from '../property-comments/inputs/property-reply.input';
import { PropertyRepliesInterface } from '../property-comments/interfaces/property-replies.interface';
import { JWTPayloadType } from '../auth/auth.guard';
import { UserTypeEnum } from '../property-comments/enums/user-type.enum';
import { PropertyQuestionsGateway } from './property-questions.gateway';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class PropertyQuestionsService {
  constructor(
    @InjectRepository(PropertyQuestions)
    private propertyQuestionsRepository: Repository<PropertyQuestions>,
    private propertyService: PropertyService,
    private authService: AuthService,
    private propertyQuestionsGateway: PropertyQuestionsGateway,
  ) {}

  async getPropertyQuestionsByPropId(
    propertyId: string,
  ): Promise<PropertyQuestions[] | []> {
    return await this.propertyQuestionsRepository.find({
      where: { propertyId },
    });
  }

  async createPropertyQuestion(
    propertyQuestionInput: PropertyQuestionInput,
  ): Promise<PropertyQuestions> {
    const { propertyId, userId } = propertyQuestionInput;

    const property = await this.propertyService.getProperty(propertyId);

    if (!property) {
      throw new NotFoundException(
        showErrorMessage(`Property with id ${propertyId} not found`),
      );
    }

    const user = await this.authService.getUserData(userId);

    if (!user) {
      throw new NotFoundException(
        showErrorMessage(`User with id ${userId} not found`),
      );
    }

    const newQuestionData = {
      ...propertyQuestionInput,
      id: uuid(),
      likes: [],
      replies: [],
      createdAt: new Date().toISOString(),
    };

    const newQuestion =
      this.propertyQuestionsRepository.create(newQuestionData);

    return await this.propertyQuestionsRepository.save(newQuestion);
  }

  async createReplyOnQuestion(
    propertyReplyInput: PropertyReplyInput,
    user: JWTPayloadType,
  ): Promise<PropertyRepliesInterface> {
    const { commentId, propertyId } = propertyReplyInput;

    const property = await this.propertyService.getProperty(propertyId);

    if (!property) {
      throw new NotFoundException(
        showErrorMessage(`Property with ${propertyId} does not exist.`),
      );
    }

    let userType: UserTypeEnum;

    if (property.landlordId !== user.id) {
      userType = UserTypeEnum.USER;
    }
    if (property.landlordId === user.id) {
      userType = UserTypeEnum.LANDLORD;
    }
    // push newReply into replies an array of comment
    const propertyComment = await this.propertyQuestionsRepository.findOne({
      where: { id: commentId },
    });

    if (!propertyComment) {
      throw new NotFoundException(
        showErrorMessage(`Comment with id ${commentId} not found`),
      );
    }

    const newReply = {
      ...propertyReplyInput,
      replierId: user.id,
      userType,
      replierInitials: user.initials,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };

    propertyComment.replies.push(newReply);
    await this.propertyQuestionsRepository.save(propertyComment);

    await pubSub.publish('newReply', { newReply });

    return newReply;
  }

  async likeQuestion(questionId: string, userPayload: JWTPayloadType) {
    // push newReply into replies an array of comment
    const propertyQuestion = await this.propertyQuestionsRepository.findOne({
      where: { id: questionId },
    });

    if (!propertyQuestion) {
      throw new NotFoundException(
        showErrorMessage(`Comment with id ${questionId} not found`),
      );
    }

    const questionLikes = propertyQuestion.likes;
    if (questionLikes.includes(userPayload.email)) {
      throw new BadRequestException(
        showErrorMessage(`User already liked the question`),
      );
    }
    // update likes array
    questionLikes.push(userPayload.email);
    propertyQuestion.likes = questionLikes;
    return await this.propertyQuestionsRepository.save(propertyQuestion);
  }

  async unlikeQuestion(questionId: string, userPayload: JWTPayloadType) {
    // push newReply into replies an array of comment
    const propertyQuestion = await this.propertyQuestionsRepository.findOne({
      where: { id: questionId },
    });

    if (!propertyQuestion) {
      throw new NotFoundException(
        showErrorMessage(`Comment with id ${questionId} not found`),
      );
    }

    const questionLikes = propertyQuestion.likes;
    if (!questionLikes.includes(userPayload.email)) {
      throw new BadRequestException(
        showErrorMessage(`User did not like the question.`),
      );
    }
    const updatedQuestionLikes = questionLikes.filter(
      (like) => like !== userPayload.email,
    );
    // update likes array
    propertyQuestion.likes = updatedQuestionLikes;
    return await this.propertyQuestionsRepository.save(propertyQuestion);
  }

  async getPropertyQuestionById(questionId: string) {
    // push newReply into replies an array of comment
    const propertyQuestion = await this.propertyQuestionsRepository.findOne({
      where: { id: questionId },
    });

    if (!propertyQuestion) {
      throw new NotFoundException(
        showErrorMessage(`Comment with id ${questionId} not found`),
      );
    }

    return propertyQuestion;
  }
}
