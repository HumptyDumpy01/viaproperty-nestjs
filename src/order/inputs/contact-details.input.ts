import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ContactDetailsInput {
  @Field()
  @MinLength(2)
  @MaxLength(200)
  firstName: string;

  @Field()
  @MinLength(2)
  @MaxLength(200)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(10)
  @MaxLength(15)
  phoneNumber: string;
}
