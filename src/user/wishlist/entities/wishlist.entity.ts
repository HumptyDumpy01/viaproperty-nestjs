import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Wishlist {
  @Field(() => [String])
  wishlist: string[];
}
