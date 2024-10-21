import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NewsletterType } from './newsletter.type';
import { NewsletterService } from './newsletter.service';
import { NewsletterInput } from './newsletter.input';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => NewsletterType)
export class NewsletterResolver {
  constructor(private newsletterService: NewsletterService) {}

  // example of usage (mutation)
  @Mutation((returns) => NewsletterType)
  addNewUserToNewsletterCollection(
    @Args(`newsletterInput`) newsletterInput: NewsletterInput,
  ) {
    // USE A SERVICE HERE. INJECT IT AS A DEP ONTO THIS CLASS
    return this.newsletterService.addNewUserToNewsletterCollection(
      newsletterInput,
    );
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
