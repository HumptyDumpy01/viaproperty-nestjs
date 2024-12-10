import { forwardRef, Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { PropertyModule } from '../property/property.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => PropertyModule),
    AuthModule,
  ],
})
export class OrderModule {}
