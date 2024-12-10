import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '../enums/order.status.enum';
import { OrderDetailsExtraType } from './order-details.extra.object.type';

@ObjectType()
export class OrderDetailsType {
  @Field(() => ID)
  customerId: string;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => OrderDetailsExtraType)
  extra: OrderDetailsExtraType;

  @Field()
  totalPricing: string;

  @Field()
  createdAt: string;
}
