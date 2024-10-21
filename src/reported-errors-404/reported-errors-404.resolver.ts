import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ReportedErrors404Type } from './reported-errors-404.type';
import { ReportedErrors404Service } from './reported-errors-404.service';
import { ReportedErrors404Input } from './reported-errors-404.input';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => ReportedErrors404Type)
export class ReportedErrors404Resolver {
  constructor(private reportedErrors404Service: ReportedErrors404Service) {}

  // example of usage (mutation)
  @Mutation((returns) => ReportedErrors404Type)
  createReport404(
    @Args(`reportedErrors404Input`)
    reportedErrors404Input: ReportedErrors404Input,
  ) {
    // USE A SERVICE HERE. INJECT IT AS A DEP ONTO THIS CLASS
    return this.reportedErrors404Service.createReport404(
      reportedErrors404Input,
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
