import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ReportedErrors500Type } from './reported-errors-500.type';
import { ReportedErrors500Service } from './reported-errors-500.service';
import { ReportedErrors500Input } from './reported-errors-500.input';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => ReportedErrors500Type)
export class ReportedErrors500Resolver {
  constructor(private reportedErrors500Service: ReportedErrors500Service) {}

  // example of usage (mutation)
  @Mutation((returns) => ReportedErrors500Type)
  createReport500(
    @Args('reportedErrorsInput')
    reportedErrorsInput: ReportedErrors500Input,
  ): Promise<ReportedErrors500Type> {
    // USE A SERVICE HERE. INJECT IT AS A DEP ONTO THIS CLASS
    return this.reportedErrors500Service.createReport500(reportedErrorsInput);
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
