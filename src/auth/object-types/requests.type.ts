import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RequestsType {
  @Field()
  fromUser: string;
  @Field()
  status: `pending` | `accepted` | `rejected`;

  @Field()
  orderId: string;

  @Field()
  message: string;

  @Field(() => String, { defaultValue: new Date().toISOString() })
  createdAt: string;
}
