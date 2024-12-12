import { Injectable, NotFoundException } from '@nestjs/common';
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
import { PropertyQuestionsGateway } from './property-questions.gateway';

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

    this.propertyQuestionsGateway.notifyNewQuestion(newQuestion);

    return await this.propertyQuestionsRepository.save(newQuestion);
  }

  async createReplyOnQuestion(
    propertyReplyInput: PropertyReplyInput,
  ): Promise<PropertyRepliesInterface> {
    const { commentId, replierId } = propertyReplyInput;

    // push newReply into replies an array of comment
    const propertyComment = await this.propertyQuestionsRepository.findOne({
      where: { id: commentId },
    });
    const user = await this.authService.getUserData(replierId);

    if (!propertyComment) {
      throw new NotFoundException(
        showErrorMessage(`Comment with id ${commentId} not found`),
      );
    }

    if (!user) {
      throw new NotFoundException(
        showErrorMessage(`User with id ${replierId} not found`),
      );
    }

    const newReply = {
      ...propertyReplyInput,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };

    propertyComment.replies.push(newReply);
    await this.propertyQuestionsRepository.save(propertyComment);
    return newReply;
  }
}
