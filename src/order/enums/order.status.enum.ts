import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
  REFUNDED = 'refunded',
  REJECTED = 'rejected',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
