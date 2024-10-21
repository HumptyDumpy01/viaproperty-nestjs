import {
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyRefund } from './property-refunds.entity';
import { Repository } from 'typeorm';
import { PropertyRefundInput } from './inputs/property-refunds.input';
import { v4 as uuid } from 'uuid';
import { ChangePropertyRefundStatusInput } from './inputs/change-property-refund-status.input';

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
      statusChanged: null,
      available: true,
    });
    return await this.propertyRefundRepository.save(newRefund);
  }

  async changePropertyRefundStatus(
    changePropertyRefundStatusInput: ChangePropertyRefundStatusInput,
  ): Promise<any> {
    const { id, status } = changePropertyRefundStatusInput;

    const propertyRefund = await this.propertyRefundRepository.findOne({
      where: { id },
    });

    if (propertyRefund.status === status) {
      throw new InternalServerErrorException(`Status is already ${status}`);
    }

    if (!propertyRefund.available) {
      throw new MethodNotAllowedException(`Property refund is not available`);
    }

    const updatedPropertyRefund = await this.propertyRefundRepository.update(
      { id },
      { status, statusChanged: new Date().toISOString(), available: false },
    );

    return updatedPropertyRefund;
  }
}
