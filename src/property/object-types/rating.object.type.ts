import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Rating {
  @Field()
  count: number;

  @Field()
  overall: number;

  // Add other fields as needed
}
