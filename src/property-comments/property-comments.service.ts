import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyComments } from './property-comments.entity';
import { Repository } from 'typeorm';
import { PropertyCommentInput } from './inputs/property-comment.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PropertyCommentsService {
  constructor(
    @InjectRepository(PropertyComments)
    private propertyCommentsRepository: Repository<PropertyComments>,
  ) {}

  async createComment(
    propertyCommentInput: PropertyCommentInput,
  ): Promise<PropertyComments> {
    // const { propertyId, userId } = propertyCommentInput;

    const newCommentData = {
      ...propertyCommentInput,
      id: uuid(),
      likes: [],
      createdAt: new Date().toISOString(),
    };
    const newComment = this.propertyCommentsRepository.create(newCommentData);
    return await this.propertyCommentsRepository.save(newComment);
  }
}
