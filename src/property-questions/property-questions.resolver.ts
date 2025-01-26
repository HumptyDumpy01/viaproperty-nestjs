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
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PubSub } from 'graphql-subscriptions';

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
  @Query(() => PropertyQuestionsType)
  getPropertyQuestionById(@Args('questionId') questionId: string) {
    return this.propertyQuestionsService.getPropertyQuestionById(questionId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PropertyQuestionsType)
  async createPropertyQuestion(
    @Args('propertyQuestionInput') propertyQuestionInput: PropertyQuestionInput,
  ) {
    const question = await this.propertyQuestionsService.createPropertyQuestion(
      propertyQuestionInput,
    );

    return question;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PropertyQuestionsType)
  async createReplyOnQuestion(
    @Args('propertyReplyInput') propertyReplyInput: PropertyReplyInput,
    @Context() context: any,
  ) {
    const reply = this.propertyQuestionsService.createReplyOnQuestion(
      propertyReplyInput,
      context.req.user,
    );
    await pubSub.publish('newReply', { newReply: reply });
    return reply;
  }

  @Subscription(() => PropertyQuestionRepliesObjectType, {
    resolve: (payload) => payload.newReply,
  })
  newReply() {
    return pubSub.asyncIterator('newReply');
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
