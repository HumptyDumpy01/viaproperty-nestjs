import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

// the input type, regarding GraphQL, is all about DTO.
// still, to use any DTO's, remember to enable global validation pipes!
@InputType()
export class ReportedErrors500Input {
  @MinLength(5)
  @MaxLength(1500)
  @Field()
  userMessage: string;

  @Field()
  @IsString()
  errorStack: string;
}
