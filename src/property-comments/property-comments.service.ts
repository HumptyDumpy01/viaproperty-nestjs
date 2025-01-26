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
import { JWTPayloadType } from '../auth/auth.guard';
import { UserTypeEnum } from './enums/user-type.enum';

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
    user: JWTPayloadType,
  ): Promise<PropertyRepliesInterface> {
    const { commentId, propertyId } = propertyReplyInput;

    const property = await this.propertyService.getProperty(propertyId);

    if (!property) {
      throw new NotFoundException(
        showErrorMessage(`Property with ${propertyId} does not exist.`),
      );
    }

    let userType: UserTypeEnum;

    if (property.landlordId !== user.id) {
      userType = UserTypeEnum.USER;
    }
    if (property.landlordId === user.id) {
      userType = UserTypeEnum.LANDLORD;
    }

    // push newReply into replies an array of comment
    const propertyComment = await this.propertyCommentsRepository.findOne({
      where: { id: commentId },
    });

    if (!propertyComment) {
      throw new NotFoundException(
        showErrorMessage(`Comment with id ${commentId} not found`),
      );
    }

    const newReply = {
      ...propertyReplyInput,
      userType,
      replierInitials: user.initials,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };

    propertyComment.replies.push(newReply);
    await this.propertyCommentsRepository.save(propertyComment);
    return newReply;
  }
}
