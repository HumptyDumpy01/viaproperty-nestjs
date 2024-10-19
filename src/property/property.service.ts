import { Injectable } from '@nestjs/common';
import { Property } from './property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyInput } from './inputs/property.input';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async getProperties(): Promise<Property[] | []> {
    return await this.propertyRepository.find();
  }

  async getProperty(id: string): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async createPropertyAdvert(propertyInput: PropertyInput): Promise<any> {
    const newProperty = this.propertyRepository.create(propertyInput);
    return await this.propertyRepository.save(newProperty);
  }
}
