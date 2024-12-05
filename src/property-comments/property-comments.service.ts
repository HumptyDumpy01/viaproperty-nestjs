import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyComments } from './property-comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyCommentsService {
  constructor(
    @InjectRepository(PropertyComments)
    private propertyCommentsRepository: Repository<PropertyComments>,
  ) {}
}
