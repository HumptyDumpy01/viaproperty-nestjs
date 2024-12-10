import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PropertyType } from '../property/property.type';
import { OrderService } from './order.service';
import { OrderType } from './order.object.type';
import { CreateOrderInput } from './inputs/create-order.input';
import { PropertyService } from '../property/property.service';

@Resolver((of) => OrderType)
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    private propertyService: PropertyService,
  ) {}

  @Query(() => [OrderType])
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Mutation(() => OrderType)
  createOrder(@Args(`createOrderInput`) createOrderInput: CreateOrderInput) {
    return this.orderService.createOrder(createOrderInput);
  }

  @ResolveField(() => PropertyType)
  async property(@Parent() order: OrderType) {
    return this.propertyService.getProperty(order.propertyId);
  }
}
