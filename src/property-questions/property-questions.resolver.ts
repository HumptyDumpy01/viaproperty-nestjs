import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PropertyQuestionsService } from './property-questions.service';
import { PropertyQuestionsType } from './property-questions.type';
import { PropertyQuestionInput } from './inputs/property-question.input';
import { UserType } from '../auth/user.type';
import { AuthService } from '../auth/auth.service';
import { PropertyReplyInput } from '../property-comments/inputs/property-reply.input';
import { PropertyQuestionRepliesObjectType } from './object-types/property-question-reply.object.type';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

const pubSub = new PubSub();

@Resolver(() => PropertyQuestionsType)
export class PropertyQuestionsResolver {
  constructor(
    private propertyQuestionsService: PropertyQuestionsService,
    private authService: AuthService,
  ) {}

  @Query(() => [PropertyQuestionsType])
  getPropertyQuestionsByPropId(@Args('propertyId') propertyId: string) {
    return this.propertyQuestionsService.getPropertyQuestionsByPropId(
      propertyId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PropertyQuestionsType)
  async createPropertyQuestion(
    @Args('propertyQuestionInput') propertyQuestionInput: PropertyQuestionInput,
  ) {
    const question = await this.propertyQuestionsService.createPropertyQuestion(
      propertyQuestionInput,
    );
    await pubSub.publish('questionAdded', { questionAdded: question });

    return question;
  }

  @Subscription(() => PropertyQuestionsType, {
    resolve: (payload) => payload.questionAdded, // Use payload to extract the published data
  })
  questionAdded() {
    return pubSub.asyncIterator('questionAdded');
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PropertyQuestionsType)
  createReplyOnQuestion(
    @Args('propertyReplyInput') propertyReplyInput: PropertyReplyInput,
    @Context() context: any,
  ) {
    return this.propertyQuestionsService.createReplyOnQuestion(
      propertyReplyInput,
      context.req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PropertyQuestionsType)
  likeQuestion(
    @Args('questionId') questionId: string,
    @Context() context: any,
  ) {
    return this.propertyQuestionsService.likeQuestion(
      questionId,
      context.req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PropertyQuestionsType)
  unlikeQuestion(
    @Args('questionId') questionId: string,
    @Context() context: any,
  ) {
    return this.propertyQuestionsService.unlikeQuestion(
      questionId,
      context.req.user,
    );
  }

  @ResolveField(() => UserType)
  async replier(
    @Parent() propertyCommentRepliesType: PropertyQuestionRepliesObjectType,
  ) {
    return this.authService.getUserData(propertyCommentRepliesType.replierId);
  }

  @ResolveField(() => UserType)
  async user(@Parent() propertyQuestionsType: PropertyQuestionsType) {
    return this.authService.getUserData(propertyQuestionsType.userId);
  }
}
