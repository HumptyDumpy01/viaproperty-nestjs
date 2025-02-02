import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength } from 'class-validator';

@InputType()
export class CreateChangePasswordTokenInput {
  @IsEmail()
  @Field()
  @MaxLength(1000)
  email: string;
}
