import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyComments } from './property-comments.entity';
import { Repository } from 'typeorm';
import { PropertyCommentInput } from './inputs/property-comment.input';
import { v4 as uuid } from 'uuid';
import { PropertyService } from '../property/property.service';
import { AuthService } from '../auth/auth.service';
import { showErrorMessage } from '../../utils/functions/showErrorMessage';
import { PropertyReplyInput } from './inputs/property-reply.input';
import { PropertyRepliesInterface } from './interfaces/property-replies.interface';

@Injectable()
export class PropertyCommentsService {
  constructor(
    @InjectRepository(PropertyComments)
    private propertyCommentsRepository: Repository<PropertyComments>,
    private propertyService: PropertyService,
    private authService: AuthService,
  ) {}

  async propertyComments(propertyId: string): Promise<PropertyComments[] | []> {
    return await this.propertyCommentsRepository.find({
      where: { propertyId },
    });
  }

  async createComment(
    propertyCommentInput: PropertyCommentInput,
  ): Promise<PropertyComments> {
    const { propertyId, userId } = propertyCommentInput;

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

    const newCommentData = {
      ...propertyCommentInput,
      id: uuid(),
      likes: [],
      replies: [],
      createdAt: new Date().toISOString(),
    };
    const newComment = this.propertyCommentsRepository.create(newCommentData);
    return await this.propertyCommentsRepository.save(newComment);
  }

  async createReply(
    propertyReplyInput: PropertyReplyInput,
  ): Promise<PropertyRepliesInterface> {
    const { commentId, replierId } = propertyReplyInput;

    // push newReply into replies an array of comment
    const propertyComment = await this.propertyCommentsRepository.findOne({
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
    await this.propertyCommentsRepository.save(propertyComment);
    return newReply;
  }
}
