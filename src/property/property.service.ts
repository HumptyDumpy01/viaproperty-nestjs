import { Injectable } from '@nestjs/common';
import { Property } from './property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyInput } from './inputs/property.input';
import { PropertyFilterInput } from './inputs/propertyFilterInput';
import { filterProperties } from '../../utils/functions/filterProperties';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async getProperties(filter?: PropertyFilterInput): Promise<Property[] | []> {
    return await this.propertyRepository.find(filterProperties(filter));
  }

  async getProperty(id: string): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async createPropertyAdvert(propertyInput: PropertyInput): Promise<Property> {
    const newProperty = this.propertyRepository.create(propertyInput);
    return await this.propertyRepository.save(newProperty);
  }
}
