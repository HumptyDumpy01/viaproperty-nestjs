import { forwardRef, Module } from '@nestjs/common';
import { PropertyQuestionsService } from './property-questions.service';
import { PropertyQuestionsResolver } from './property-questions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyQuestions } from './property-questions.entity';
import { PropertyModule } from '../property/property.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [PropertyQuestionsService, PropertyQuestionsResolver],
  imports: [
    forwardRef(() => PropertyModule),
    AuthModule,
    TypeOrmModule.forFeature([PropertyQuestions]),
  ],
  exports: [PropertyQuestionsService],
})
export class PropertyQuestionsModule {}
