import { Injectable } from '@nestjs/common';
import { Property } from './property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyInput } from './inputs/property.input';
import { PropertyFilterInput } from './inputs/propertyFilterInput';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async getProperties(filter?: PropertyFilterInput): Promise<Property[] | []> {
    const query: any = {};
    if (filter) {
      if (filter.title) query.title = filter.title;
      if (filter.tags) query.tags = { $in: filter.tags };
      if (filter.additionalConveniences)
        query.additionalConveniences = { $in: filter.additionalConveniences };
      if (filter.propertyFor) query.propertyFor = filter.propertyFor;
      if (filter.ownership) query.ownership = filter.ownership;
      if (filter.propertyArea) query.propertyArea = filter.propertyArea;
      if (filter.type) query.type = filter.type;
      if (filter.onSale) query.onSale = filter.onSale;
      if (filter.searchFor) {
        query.$text = { $search: filter.searchFor };
      }
    }
    const options = { where: query };
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
