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

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => PropertyType)
export class PropertyResolver {
  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
  ) {}

  @Query((_returns) => [PropertyType])
  properties() {
    return this.propertyService.getProperties();
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
}
