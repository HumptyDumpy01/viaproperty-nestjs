import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ValidateTokenObjectType {
  @Field()
  tokenIsValid: boolean;
}
