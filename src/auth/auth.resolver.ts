import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { AuthService } from './auth.service';
import { LoginResponse } from './object-types/login-response.object.type';
import { ChangeUserInitialsObjectType } from './object-types/change-user-initials.object.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UpdateUserPasswordInput } from './inputs/update-user-password.input';
import { AuthMethodObjectType } from './object-types/auth-method.object.type';
import { ChangeUserAuthMethodInput } from './inputs/change-user-auth-method.input';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((returns) => UserType)
  getUserData(@Args('id') id: string) {
    return this.authService.getUserData(id);
  }

  @UseGuards(AuthGuard)
  @Query((_returns) => AuthMethodObjectType)
  getUserAuthMethod(@Context() context: any) {
    const userAuthMethod = this.authService.getUserAuthMethod(
      context.req.user.email,
    );
    return { authMethod: userAuthMethod };
  }

  @UseGuards(AuthGuard)
  @Mutation((_returns) => ChangeUserInitialsObjectType)
  async changeUserInitials(
    @Args(`updatedInitials`) updatedInitials: string,
    @Context() context: any,
  ) {
    const { initials, accessToken } = await this.authService.changeUserInitials(
      context.req.user.id,
      updatedInitials,
    );
    return { updatedInitials: initials, accessToken };
  }

  @Mutation((_returns) => UserType)
  async updateUserPassword(
    @Args(`updateUserPasswordInput`)
    updateUserPasswordInput: UpdateUserPasswordInput,
  ) {
    return await this.authService.updateUserPassword(updateUserPasswordInput);
  }

  @Mutation((returns) => LoginResponse)
  async login(
    @Args(`email`) email: string,
    @Args(`password`) password: string,
  ) {
    const user = await this.authService.validateUserByEmailAndPassword(
      email,
      password,
    );

    const { accessToken } = await this.authService.login(user);
    return { accessToken };
  }

  @UseGuards(AuthGuard)
  @Mutation((_returns) => AuthMethodObjectType)
  changeUserAuthMethod(
    @Context() context: any,
    @Args(`changeUserAuthMethodInput`)
    changeUserAuthMethodInput: ChangeUserAuthMethodInput,
  ) {
    return this.authService.changeUserAuthMethod(
      changeUserAuthMethodInput,
      context.req.user.email,
    );
  }

  // INFO: POST-HOOKS IN GRAPH-QL
  // if you have e.g. a lesson where students array contains ids of students(child referencing)
  // you can enable the unwound search of all students by using @ResolveField
  // IMPORT THE ENTITY AS A TYPE, NOT <NAME>Type!
  // @ResolveField()
  // async students(@Parent() lesson: Lesson) {
  //  console.log(lesson);
  // TO USE THIS SERVICE, GO TO ITS MODULE AND INJECT A SERVICE ONTO "IMPORTS"
  // THEN GO TO THE MODULE WHERE YOU WANT TO USE THIS SERVICE, AND INJECT ENTIRE
  // THE MODULE ONTO IMPORTS.
  //  return this.studentService.getManyStudents(lesson.students);
  //}
}
