import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RequestsInput {
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
