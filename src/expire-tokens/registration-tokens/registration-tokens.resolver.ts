import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegistrationTokensService } from './registration-tokens.service';
import { CreateRegistrationTokenInput } from './dto/create-registration-token.input';
import { RegistrationToken } from './object-types/registration-token.object.type';
import { CreateRegistrationTokenObjectType } from './object-types/create-registration-token.object.type';

@Resolver(() => RegistrationToken)
export class RegistrationTokensResolver {
  constructor(
    private readonly registrationTokensService: RegistrationTokensService,
  ) {}

  @Mutation(() => CreateRegistrationTokenObjectType)
  async createRegistrationToken(
    @Args('createRegistrationTokenInput')
    createRegistrationTokenInput: CreateRegistrationTokenInput,
  ) {
    return await this.registrationTokensService.create(
      createRegistrationTokenInput,
    );
  }
}
