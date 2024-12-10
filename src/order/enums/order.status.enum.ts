import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
  REFUNDED = 'refunded',
  REJECTED = 'rejected',
  INCOMPLETE = 'incomplete',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
