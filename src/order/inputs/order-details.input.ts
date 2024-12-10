import { Field, ID, InputType } from '@nestjs/graphql';
import { OrderStatus } from '../enums/order.status.enum';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';
import { OrderDetailsExtraInput } from './order-details.extra.input';

@InputType()
export class OrderDetailsInput {
  @Field(() => ID)
  @IsUUID()
  customerId: string;

  @Field(() => ID)
  @IsUUID()
  landlordId: string;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => OrderDetailsExtraInput)
  extra: OrderDetailsExtraInput;

  @Field()
  @IsNotEmpty()
  totalPricing: string;

  @Field()
  @IsDateString()
  createdAt: string;
}
