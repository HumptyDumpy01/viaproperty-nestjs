import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { ExtraFeaturesInterface } from './interfaces/order.extra-features.interface';
import { RentalPeriodInterface } from './interfaces/order.rental-period.interface';
import { PricingInterface } from './interfaces/order.pricing.interface';
import { ContactDetailsInterface } from './interfaces/order.contact-details.interface';
import { OrderDetailsInterface } from './interfaces/order.order-details.interface';

@Entity(`orders`)
export class Order {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column(`uuid`)
  propertyId: string;

  @Column()
  paid: boolean;

  @Column()
  extraFeaturesSelected: ExtraFeaturesInterface[];

  @Column()
  rentalPeriod: RentalPeriodInterface;

  @Column()
  overallPricing: PricingInterface[];

  @Column()
  contactDetails: ContactDetailsInterface;

  @Column()
  orderDetails: OrderDetailsInterface;
}
