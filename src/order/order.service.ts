import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './inputs/create-order.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    const newOrder = {
      ...createOrderInput,
      id: uuid(),
      extraFeaturesSelected: createOrderInput.extraFeaturesSelected || null,
      rentalPeriod: createOrderInput.rentalPeriod,
    };

    return await this.orderRepository.save(newOrder);
  }
}
