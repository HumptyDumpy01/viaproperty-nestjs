import {
  Args,
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
    resolve: (value) => value,
  })
  questionAdded() {
    return pubSub.asyncIterator('questionAdded');
  }

  @Mutation(() => PropertyQuestionsType)
  createReplyOnQuestion(
    @Args('propertyReplyInput') propertyReplyInput: PropertyReplyInput,
  ) {
    return this.propertyQuestionsService.createReplyOnQuestion(
      propertyReplyInput,
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
