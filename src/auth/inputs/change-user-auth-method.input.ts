import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { AuthMethodEnum } from '../enums/auth-method.enum';

@InputType()
export class ChangeUserAuthMethodInput {
  @Field()
  @IsEnum(AuthMethodEnum)
  authMethod: string;
}
