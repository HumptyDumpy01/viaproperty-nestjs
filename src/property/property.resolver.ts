import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyType } from './property.type';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => PropertyType)
export class PropertyResolver {
  @Query((returns) => PropertyType)
  test() {
    return {
      message: `Hello World!`,
    };
  }

  // example of usage (mutation)
  @Mutation((returns) => PropertyType)
  someMutation() {
    // USE A SERVICE HERE. INJECT IT AS A DEP ONTO THIS CLASS
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
