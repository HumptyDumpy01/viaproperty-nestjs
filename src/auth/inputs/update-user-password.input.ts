import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateUserPasswordInput {
  @IsEmail()
  @Field()
  userEmail: string;

  @Length(6, 6)
  @Field()
  token: string;

  @MinLength(8)
  @MaxLength(100)
  @Field()
  password: string;

  @MinLength(8)
  @MaxLength(100)
  @Field()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `The new password should have at least 1 upper, 1 lower case letter, and 1 special character.`,
  })
  confirmPassword: string;
}
