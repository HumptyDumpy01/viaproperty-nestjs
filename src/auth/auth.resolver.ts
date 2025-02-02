import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { AuthService } from './auth.service';
import { UserInput } from './user.input';
import { LoginResponse } from './object-types/login-response.object.type';
import { ChangeUserInitialsObjectType } from './object-types/change-user-initials.object.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((returns) => UserType)
  getUserData(@Args('id') id: string) {
    return this.authService.getUserData(id);
  }

  // example of usage (mutation)
  @Mutation((returns) => UserType)
  createUser(
    @Args(`createUserInput`) userInput: UserInput,
    @Args(`confirmPassword`) confirmPassword: string,
  ) {
    // USE A SERVICE HERE. INJECT IT AS A DEP ONTO THIS CLASS
    return this.authService.createUser(userInput, confirmPassword);
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
