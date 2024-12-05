import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyCommentsType } from './property-comments.type';
import { PropertyCommentsService } from './property-comments.service';
import { PropertyCommentInput } from './inputs/property-comment.input';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => PropertyCommentsType)
export class PropertyCommentsResolver {
  constructor(private propertyCommentsService: PropertyCommentsService) {}

  @Query((returns) => PropertyCommentsType)
  test() {
    return {
      message: `Hello World!`,
    };
  }

  // example of usage (mutation)
  @Mutation((returns) => PropertyCommentsType)
  createComment(
    @Args('propertyCommentInput') propertyCommentInput: PropertyCommentInput,
  ) {
    return this.propertyCommentsService.createComment(propertyCommentInput);
  }

  // INFO: POST-HOOKS IN GRAPH-QL
  // if you have e.g. a lesson where students array contains ids of students(child referencing)
  // you can enable the unwound search of all students by using @ResolveField
  // IMPORT THE ENTITY AS A TYPE, NOT <NAME>!
  // @ResolveField()
  // async students(@Parent() lesson: Lesson) {
  //  console.log(lesson);
  // TO USE THIS SERVICE, GO TO ITS MODULE AND INJECT A SERVICE ONTO "IMPORTS"
  // THEN GO TO THE MODULE WHERE YOU WANT TO USE THIS SERVICE, AND INJECT ENTIRE
  // THE MODULE ONTO IMPORTS.
  //  return this.studentService.getManyStudents(lesson.students);
  //}
}
