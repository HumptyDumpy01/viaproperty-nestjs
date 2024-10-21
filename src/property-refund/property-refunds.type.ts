import { Field, ID, ObjectType } from '@nestjs/graphql';

// give the actual type a name that would
// be used to query data in GraphQL sandbox
@ObjectType(`PropertyRefund`)
export class PropertyRefundType {
  // specify the type ID manually
  @Field((_type) => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  status: `pending` | `approved` | `rejected`;
}
