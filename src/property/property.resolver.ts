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

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => PropertyType)
export class PropertyResolver {
  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private propertyCommentsService: PropertyCommentsService,
  ) {}

  @Query(() => [PropertyType])
  properties(@Args('filter', { nullable: true }) filter?: PropertyFilterInput) {
    return this.propertyService.getProperties(filter);
  }

  @Query((_returns) => PropertyType)
  property(@Args('id') id: string) {
    return this.propertyService.getProperty(id);
  }

  // example of usage (mutation)
  @Mutation((_returns) => PropertyType)
  addPropertyAdvert(@Args(`propertyInput`) propertyInput: PropertyInput) {
    // USE A SERVICE HERE. INJECT IT AS A DEP ONTO THIS CLASS
    return this.propertyService.createPropertyAdvert(propertyInput);
  }

  @ResolveField(() => UserType)
  async landlord(@Parent() property: PropertyType) {
    return this.authService.getUserData(property.landlordId);
  }

  @ResolveField(() => [PropertyCommentsType])
  async reviews(@Parent() property: PropertyType) {
    return this.propertyCommentsService.propertyComments(property.id);
  }
}
