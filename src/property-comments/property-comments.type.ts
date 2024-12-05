import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType(`PropertyComments`)
export class PropertyCommentsType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  propertyId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => String)
  comment: string;

  @Field(() => [String])
  likes: string[];

  @Field(() => String)
  createdAt: string;
}
