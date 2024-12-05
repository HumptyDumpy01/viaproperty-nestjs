import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyComments } from './property-comments.entity';
import { Repository } from 'typeorm';
import { PropertyCommentInput } from './inputs/property-comment.input';

@Injectable()
export class PropertyCommentsService {
  constructor(
    @InjectRepository(PropertyComments)
    private propertyCommentsRepository: Repository<PropertyComments>,
  ) {}

  async createComment(
    propertyCommentInput: PropertyCommentInput,
  ): Promise<PropertyComments> {
    const newComment =
      this.propertyCommentsRepository.create(propertyCommentInput);
    return await this.propertyCommentsRepository.save(newComment);
  }
}
