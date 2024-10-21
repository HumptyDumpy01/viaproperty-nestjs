import { Module } from '@nestjs/common';
import { PropertyRefundService } from './property-refunds.service';
import { PropertyRefundResolver } from './property-refunds.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyRefund } from './property-refunds.entity';

@Module({
  providers: [PropertyRefundService, PropertyRefundResolver],
  imports: [TypeOrmModule.forFeature([PropertyRefund])],
})
export class PropertyRefundModule {}
