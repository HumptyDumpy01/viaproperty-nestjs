import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyResolver } from './property.resolver';

@Module({
  providers: [PropertyService, PropertyResolver],
  imports: [TypeOrmModule.forFeature([Property])],
})
export class PropertyModule {}
