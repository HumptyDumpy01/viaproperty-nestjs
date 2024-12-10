import { OrderType } from '../types/order.type';

export interface OrderDetailsInterface {
  customerId: string;
  landlordId: string;
  status: OrderType;
  extra: {
    refundAvailable: boolean;
    refundRequested: boolean;
    date: string;
  };
  totalPricing: string;
  createdAt: string;
}
