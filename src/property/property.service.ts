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
    const options = filterProperties(filter);
    if (filter?.limit) {
      options['take'] = filter.limit;
    }
    return await this.propertyRepository.find(options);
  }

  async getProperty(id: string): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async createPropertyAdvert(propertyInput: PropertyInput): Promise<any> {
    // @ts-ignore
    const newProperty = this.propertyRepository.create(propertyInput);
    return await this.propertyRepository.save(newProperty);
  }
}
