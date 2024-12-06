import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyQuestions } from './property-questions.entity';

@Injectable()
export class PropertyQuestionsService {
  constructor(
    @InjectRepository(PropertyQuestions)
    private propertyQuestionsRepository: PropertyQuestions,
  ) {}
}
