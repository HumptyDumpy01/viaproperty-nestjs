import { forwardRef, Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyResolver } from './property.resolver';
import { AuthModule } from '../auth/auth.module';
import { PropertyCommentsModule } from '../property-comments/property-comments.module';
import { PropertyQuestionsModule } from '../property-questions/property-questions.module';

@Module({
  providers: [PropertyService, PropertyResolver],
  imports: [
    TypeOrmModule.forFeature([Property]),
    AuthModule,
    forwardRef(() => PropertyCommentsModule),
    PropertyQuestionsModule,
  ],
  exports: [PropertyService],
})
export class PropertyModule {}
