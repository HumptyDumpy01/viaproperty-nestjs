import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

// the input type, regarding GraphQL, is all about DTO.
// still, to use any DTO's, remember to enable global validation pipes!
@InputType()
export class NewsletterInput {
  @IsEmail()
  @Field()
  email: string;
}
