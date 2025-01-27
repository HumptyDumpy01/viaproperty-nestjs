import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyComments } from './property-comments.entity';
import { Repository } from 'typeorm';
import { PropertyCommentInput } from './inputs/property-comment.input';
import { v4 as uuid } from 'uuid';
import { PropertyService } from '../property/property.service';
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
  ) {}

  async propertyComments(propertyId: string): Promise<PropertyComments[] | []> {
    return await this.propertyCommentsRepository.find({
      where: { propertyId },
    });
  }

  async createComment(
    propertyCommentInput: PropertyCommentInput,
    userData: JWTPayloadType,
  ): Promise<PropertyComments> {
    const { propertyId } = propertyCommentInput;
    const { id: userId } = userData;

    const property = await this.propertyService.getProperty(propertyId);

    if (!property) {
      throw new NotFoundException(
        showErrorMessage(`Property with id ${propertyId} not found`),
      );
    }
    const overallRating = Number(
      (
        (propertyCommentInput.rated.location +
          propertyCommentInput.rated.security +
          propertyCommentInput.rated.amenities +
          propertyCommentInput.rated.noiseLevel +
          propertyCommentInput.rated.ownership +
          propertyCommentInput.rated.condition) /
        6
      ).toFixed(2),
    );

    propertyCommentInput.rated.overall = overallRating;

    const newCommentData = {
      ...propertyCommentInput,
      userId,
      id: uuid(),
      likes: [],
      replies: [],
      createdAt: new Date().toISOString(),
    };
    const newComment = this.propertyCommentsRepository.create(newCommentData);

    const { location, security, amenities, noiseLevel, condition, ownership } =
      propertyCommentInput.rated;

    await this.propertyService.updatePropertyRating(
      {
        location,
        security,
        amenities,
        noiseLevel,
        condition,
        ownership,
      },
      propertyId,
    );

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

  async likePropertyReview(reviewId: string, userPayload: JWTPayloadType) {
    // push newReply into replies an array of comment
    const propertyReview = await this.propertyCommentsRepository.findOne({
      where: { id: reviewId },
    });

    if (!propertyReview) {
      throw new NotFoundException(
        showErrorMessage(`Comment with id ${reviewId} not found`),
      );
    }

    const propertyReviewLikes = propertyReview.likes;
    if (propertyReviewLikes.includes(userPayload.email)) {
      throw new BadRequestException(
        showErrorMessage(`User already liked the question`),
      );
    }
    // update likes array
    propertyReviewLikes.push(userPayload.email);
    propertyReview.likes = propertyReviewLikes;
    return await this.propertyCommentsRepository.save(propertyReview);
  }

  async unlikePropertyReview(reviewId: string, userPayload: JWTPayloadType) {
    // push newReply into replies an array of comment
    const propertyReview = await this.propertyCommentsRepository.findOne({
      where: { id: reviewId },
    });

    if (!propertyReview) {
      throw new NotFoundException(
        showErrorMessage(`Comment with id ${reviewId} not found`),
      );
    }

    const reviewLikes = propertyReview.likes;
    if (!reviewLikes.includes(userPayload.email)) {
      throw new BadRequestException(
        showErrorMessage(`User did not like the question.`),
      );
    }
    const updatedReviewLikes = reviewLikes.filter(
      (like) => like !== userPayload.email,
    );
    // update likes array
    propertyReview.likes = updatedReviewLikes;
    return await this.propertyCommentsRepository.save(propertyReview);
  }
}
