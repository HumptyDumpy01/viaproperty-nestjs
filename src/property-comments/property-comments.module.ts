import { Module } from '@nestjs/common';
import { PropertyCommentsService } from './property-comments.service';
import { PropertyCommentsResolver } from './property-comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyComments } from './property-comments.entity';

@Module({
  providers: [PropertyCommentsService, PropertyCommentsResolver],
  imports: [TypeOrmModule.forFeature([PropertyComments])],
})
export class PropertyCommentsModule {}
