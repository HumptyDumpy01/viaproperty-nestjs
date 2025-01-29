import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserWishlisted {
  @Field(() => Boolean)
  wishlisted: boolean;
}
