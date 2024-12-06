import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyQuestions } from './property-questions.entity';
import { PropertyQuestionInput } from './inputs/property-question.input';
import { showErrorMessage } from '../../utils/functions/showErrorMessage';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { PropertyService } from '../property/property.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PropertyQuestionsService {
  constructor(
    @InjectRepository(PropertyQuestions)
    private propertyQuestionsRepository: Repository<PropertyQuestions>,
    private propertyService: PropertyService,
    private authService: AuthService,
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
}
