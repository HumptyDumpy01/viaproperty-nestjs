import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './inputs/create-order.input';
import { v4 as uuid } from 'uuid';
import { PropertyService } from '../property/property.service';
import { AuthService } from '../auth/auth.service';
import { showErrorMessage } from '../../utils/functions/showErrorMessage';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private propertyService: PropertyService,
    private authService: AuthService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    const { propertyId } = createOrderInput;

    const property = await this.propertyService.getProperty(propertyId);

    if (!property) {
      throw new NotFoundException(
        showErrorMessage(`Property with ID: ${propertyId} not found`),
      );
    }

    const { customerId, landlordId } = createOrderInput.orderDetails;

    const customer = await this.authService.getUserData(customerId);
    const landlord = await this.authService.getUserData(landlordId);

    if (!customer || !landlord) {
      throw new NotFoundException(
        showErrorMessage(`Customer or Landlord not found`),
      );
    }

    const newOrder = {
      ...createOrderInput,
      id: uuid(),
      extraFeaturesSelected: createOrderInput.extraFeaturesSelected || null,
      paid: false,
      rentalPeriod: createOrderInput.rentalPeriod,
    };

    return await this.orderRepository.save(newOrder);
  }
}
