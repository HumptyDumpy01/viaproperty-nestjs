import { Module } from '@nestjs/common';
import { PropertyQuestionsService } from './property-questions.service';
import { PropertyQuestionsResolver } from './property-questions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyQuestions } from './property-questions.entity';

@Module({
  providers: [PropertyQuestionsService, PropertyQuestionsResolver],
  imports: [TypeOrmModule.forFeature([PropertyQuestions])],
})
export class PropertyQuestionsModule {}
