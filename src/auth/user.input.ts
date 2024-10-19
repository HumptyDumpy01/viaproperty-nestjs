import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { v4 as uuid } from 'uuid';

@InputType()
export class UserInput {
  @Field((_type) => ID, { defaultValue: uuid() })
  id: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(2)
  @MaxLength(100)
  initials: string;

  @Field()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `The password should have at least 1 upper, 1 lower case letter, and 1 special character.`,
  })
  password: string;
}
