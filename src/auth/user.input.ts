import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthMethodEnum } from './enums/auth-method.enum';

@InputType()
export class UserInput {
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

  @Field()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `The password should have at least 1 upper, 1 lower case letter, and 1 special character.`,
  })
  confirmPassword: string;

  @Field(() => String)
  @IsEnum(AuthMethodEnum)
  authMethod: AuthMethodEnum;

  @Length(6, 6)
  @Field()
  verificationToken: string;
}
