import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';

@Module({
  providers: [PropertyService],
})
export class PropertyModule {}
