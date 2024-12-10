import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
import { ExtraFeaturesInput } from './extra-features.input';
import { RentalPeriodInput } from './rental-period.input';
import { OverallPricingInput } from './overall-pricing.input';
import { ContactDetailsInput } from './contact-details.input';
import { OrderDetailsInput } from './order-details.input';

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  @IsUUID()
  propertyId: string;

  @Field(() => [ExtraFeaturesInput], { nullable: true, defaultValue: null })
  @IsOptional()
  extraFeaturesSelected: ExtraFeaturesInput[];

  @Field(() => RentalPeriodInput, { nullable: true, defaultValue: null })
  @IsOptional()
  rentalPeriod: RentalPeriodInput;

  @Field(() => [OverallPricingInput])
  overallPricing: OverallPricingInput[];

  @Field(() => ContactDetailsInput)
  contactDetails: ContactDetailsInput;

  @Field(() => OrderDetailsInput)
  orderDetails: OrderDetailsInput;
}
