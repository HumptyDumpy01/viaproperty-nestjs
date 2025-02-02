import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChangePasswordTokensService } from './change-password-tokens.service';
import { ChangePasswordToken } from './entities/change-password-token.entity';
import { CreateChangePasswordTokenInput } from './dto/create-change-password-token.input';
import { UpdateChangePasswordTokenInput } from './dto/update-change-password-token.input';

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

  @Query(() => ChangePasswordToken, { name: 'changePasswordToken' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.changePasswordTokensService.findOne(id);
  }

  @Mutation(() => ChangePasswordToken)
  updateChangePasswordToken(
    @Args('updateChangePasswordTokenInput')
    updateChangePasswordTokenInput: UpdateChangePasswordTokenInput,
  ) {
    return this.changePasswordTokensService.update(
      updateChangePasswordTokenInput.id,
      updateChangePasswordTokenInput,
    );
  }

  @Mutation(() => ChangePasswordToken)
  removeChangePasswordToken(@Args('id', { type: () => Int }) id: number) {
    return this.changePasswordTokensService.remove(id);
  }
}
