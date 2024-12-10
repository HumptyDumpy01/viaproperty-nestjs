import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ExtraFeaturesType } from './object-types/extra-features.object.type';
import { RentalPeriodType } from './object-types/rental-period.object.type';
import { ContactDetailsType } from './object-types/contact-details.object.type';
import { OrderDetailsType } from './object-types/order-details.object.type';
import { PropertyType } from '../property/property.type';

@ObjectType('Order')
export class OrderType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  propertyId: string;

  @Field(() => PropertyType)
  property: PropertyType;

  @Field(() => [ExtraFeaturesType])
  extraFeaturesSelected: ExtraFeaturesType[];

  @Field(() => RentalPeriodType, { nullable: true })
  rentalPeriod: string;

  @Field(() => Number)
  totalPrice: number;

  @Field(() => ContactDetailsType)
  contactDetails: ContactDetailsType;

  @Field(() => OrderDetailsType)
  orderDetails: OrderDetailsType;
}
