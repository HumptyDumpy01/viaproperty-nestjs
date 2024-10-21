import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyRefund } from './property-refunds.entity';
import { Repository } from 'typeorm';
import { PropertyRefundInput } from './property-refunds.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PropertyRefundService {
  constructor(
    @InjectRepository(PropertyRefund)
    private propertyRefundRepository: Repository<PropertyRefund>,
  ) {}

  async createPropertyRefund(
    propertyRefundInput: PropertyRefundInput,
  ): Promise<PropertyRefund> {
    const { orderId } = propertyRefundInput;

    const newRefund = this.propertyRefundRepository.create({
      orderId,
      id: uuid(),
      createdAt: new Date().toISOString(),
      status: `pending`,
    });
    return await this.propertyRefundRepository.save(newRefund);
  }

  async changePropertyRefundStatus(
    id: string,
    status: `pending` | `approved` | `rejected`,
  ): Promise<PropertyRefund> {
    const updatedPropertyRefund = await this.propertyRefundRepository.update(
      id,
      { status },
    );
    return;
  }
}
