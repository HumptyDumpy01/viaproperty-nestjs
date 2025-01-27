import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PropertyCommentsType } from './property-comments.type';
import { PropertyCommentsService } from './property-comments.service';
import { PropertyCommentInput } from './inputs/property-comment.input';
import { UserType } from '../auth/user.type';
import { AuthService } from '../auth/auth.service';
import { PropertyReplyInput } from './inputs/property-reply.input';
import { PropertyCommentRepliesObjectType } from './object-types/property-comment-replies.object.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => PropertyCommentsType)
export class PropertyCommentsResolver {
  constructor(
    private propertyCommentsService: PropertyCommentsService,
    private authService: AuthService,
  ) {}

  @Query((returns) => [PropertyCommentsType])
  propertyComments(@Args('propertyId') propertyId: string) {
    return this.propertyCommentsService.propertyComments(propertyId);
  }

  // example of usage (mutation)
  @UseGuards(AuthGuard)
  @Mutation((returns) => PropertyCommentsType)
  createComment(
    @Args('propertyCommentInput') propertyCommentInput: PropertyCommentInput,
    @Context() context: any,
  ) {
    return this.propertyCommentsService.createComment(
      propertyCommentInput,
      context.req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => PropertyCommentsType)
  createReply(
    @Args('propertyReplyInput') propertyReplyInput: PropertyReplyInput,
    @Context() context: any,
  ) {
    return this.propertyCommentsService.createReply(
      propertyReplyInput,
      context.req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation((_returns) => PropertyCommentsType)
  likePropertyReview(
    @Args('reviewId')
    reviewId: string,
    @Context() context: any,
  ) {
    return this.propertyCommentsService.likePropertyReview(
      reviewId,
      context.req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation((_returns) => PropertyCommentsType)
  unlikePropertyReview(
    @Args('reviewId')
    reviewId: string,
    @Context() context: any,
  ) {
    return this.propertyCommentsService.unlikePropertyReview(
      reviewId,
      context.req.user,
    );
  }

  @ResolveField(() => UserType)
  async replier(
    @Parent() propertyCommentRepliesType: PropertyCommentRepliesObjectType,
  ) {
    return this.authService.getUserData(propertyCommentRepliesType.replierId);
  }

  @ResolveField(() => UserType)
  async user(@Parent() propertyCommentsType: PropertyCommentsType) {
    return this.authService.getUserData(propertyCommentsType.userId);
  }

  // INFO: POST-HOOKS IN GRAPH-QL
  // if you have e.g. a lesson where students array contains ids of students(child referencing)
  // you can enable the unwound search of all students by using @ResolveField
  // IMPORT THE ENTITY AS A TYPE, NOT <NAME>!
  // @ResolveField()
  // async students(@Parent() lesson: Lesson) {
  //  console.log(lesson);
  // TO USE THIS SERVICE, GO TO ITS MODULE AND INJECT A SERVICE ONTO "IMPORTS"
  // THEN GO TO THE MODULE WHERE YOU WANT TO USE THIS SERVICE, AND INJECT ENTIRE
  // THE MODULE ONTO IMPORTS.
  //  return this.studentService.getManyStudents(lesson.students);
  //}
}
