import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  pending = 'pending',
  complete = 'complete',
  refunded = 'refunded',
  rejected = 'rejected',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
