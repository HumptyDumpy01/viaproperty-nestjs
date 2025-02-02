import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { ChangePasswordTokensService } from './change-password-tokens.service';
import { CreateChangePasswordTokenInput } from './dto/create-change-password-token.input';
import { ChangePasswordToken } from './object-types/change-password-token.object.type';

@Resolver(() => ChangePasswordToken)
export class ChangePasswordTokensResolver {
  constructor(
    private readonly changePasswordTokensService: ChangePasswordTokensService,
  ) {}

  @Mutation(() => ChangePasswordToken)
  createChangePasswordToken(
    @Args('createChangePasswordTokenInput')
    createChangePasswordTokenInput: CreateChangePasswordTokenInput,
  ) {
    return this.changePasswordTokensService.create(
      createChangePasswordTokenInput,
    );
  }

  @Mutation(() => ChangePasswordToken)
  removeChangePasswordToken(@Args('id', { type: () => Int }) id: number) {
    return this.changePasswordTokensService.remove(id);
  }
}
