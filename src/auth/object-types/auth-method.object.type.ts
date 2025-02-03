import { Field, ObjectType } from '@nestjs/graphql';
import { AuthMethodEnum } from '../enums/auth-method.enum';

@ObjectType()
export class AuthMethodObjectType {
  @Field()
  authMethod: AuthMethodEnum;
}
