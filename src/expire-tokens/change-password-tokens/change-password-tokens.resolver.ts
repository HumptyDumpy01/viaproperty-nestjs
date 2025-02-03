import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChangePasswordTokensService } from './change-password-tokens.service';
import { CreateChangePasswordTokenInput } from './dto/create-change-password-token.input';
import { ChangePasswordToken } from './object-types/change-password-token.object.type';
import { ValidateTokenObjectType } from './object-types/validate-token.object.type';
import { ValidateTokenInput } from './dto/validate-token.input';

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

  @Mutation(() => ValidateTokenObjectType)
  validateToken(
    @Args(`validateTokenInput`) validateTokenInput: ValidateTokenInput,
  ) {
    return this.changePasswordTokensService.validateToken(validateTokenInput);
  }
}
