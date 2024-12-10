import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyType } from '../property/property.type';
import { OrderService } from './order.service';
import { OrderType } from './object-types/order.object.type';
import { CreateOrderInput } from './inputs/create-order.input';

@Resolver((of) => PropertyType)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [OrderType])
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Mutation(() => OrderType)
  createOrder(@Args(`createOrderInput`) createOrderInput: CreateOrderInput) {
    return this.orderService.createOrder(createOrderInput);
  }
}
