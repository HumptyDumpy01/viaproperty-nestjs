import {
  Args,
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
  @Mutation((returns) => PropertyCommentsType)
  createComment(
    @Args('propertyCommentInput') propertyCommentInput: PropertyCommentInput,
  ) {
    return this.propertyCommentsService.createComment(propertyCommentInput);
  }

  @Mutation((returns) => PropertyCommentsType)
  createReply(
    @Args('propertyReplyInput') propertyReplyInput: PropertyReplyInput,
  ) {
    return this.propertyCommentsService.createReply(propertyReplyInput);
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
