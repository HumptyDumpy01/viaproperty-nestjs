import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PropertyType } from './property.type';
import { PropertyService } from './property.service';
import { PropertyInput } from './inputs/property.input';
import { AuthService } from '../auth/auth.service';
import { UserType } from '../auth/user.type';
import { PropertyFilterInput } from './inputs/propertyFilterInput';
import { PropertyCommentsService } from '../property-comments/property-comments.service';
import { PropertyCommentsType } from '../property-comments/property-comments.type';
import { PropertyQuestionsService } from '../property-questions/property-questions.service';
import { PropertyQuestionsType } from '../property-questions/property-questions.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => PropertyType)
export class PropertyResolver {
  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private propertyCommentsService: PropertyCommentsService,
    private propertyQuestionsService: PropertyQuestionsService,
  ) {}

  @Query(() => [PropertyType])
  @UseGuards(AuthGuard)
  properties(@Args('filter', { nullable: true }) filter?: PropertyFilterInput) {
    return this.propertyService.getProperties(filter);
  }

  @Query((_returns) => PropertyType)
  @UseGuards(AuthGuard)
  property(@Args('id') id: string) {
    return this.propertyService.getProperty(id);
  }

  // example of usage (mutation)
  @Mutation((_returns) => PropertyType)
  @UseGuards(AuthGuard)
  addPropertyAdvert(@Args(`propertyInput`) propertyInput: PropertyInput) {
    // USE A SERVICE HERE. INJECT IT AS A DEP ONTO THIS CLASS
    return this.propertyService.createPropertyAdvert(propertyInput);
  }

  @ResolveField(() => UserType)
  async landlord(@Parent() property: PropertyType) {
    return this.authService.getUserData(property.landlordId);
  }

  @ResolveField(() => [PropertyCommentsType])
  @UseGuards(AuthGuard)
  async reviews(@Parent() property: PropertyType) {
    return this.propertyCommentsService.propertyComments(property.id);
  }

  @ResolveField(() => [PropertyQuestionsType])
  @UseGuards(AuthGuard)
  async questions(@Parent() property: PropertyType) {
    return this.propertyQuestionsService.getPropertyQuestionsByPropId(
      property.id,
    );
  }
}
