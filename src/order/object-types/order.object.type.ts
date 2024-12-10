import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ExtraFeaturesType } from './extra-features.object.type';
import { RentalPeriodType } from './rental-period.object.type';
import { PricingType } from './overall-pricing.object.type';
import { ContactDetailsType } from './contact-details.object.type';
import { OrderDetailsType } from './order-details.object.type';

@ObjectType('Order')
export class OrderType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  propertyId: string;

  @Field(() => [ExtraFeaturesType])
  extraFeaturesSelected: ExtraFeaturesType[];

  @Field(() => RentalPeriodType, { nullable: true })
  rentalPeriod: string;

  @Field(() => [PricingType])
  overallPricing: PricingType[];

  @Field(() => ContactDetailsType)
  contactDetails: ContactDetailsType;

  @Field(() => OrderDetailsType)
  orderDetails: OrderDetailsType;
}
