import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { PropertyDescriptionInput } from './property.description.input';
import { PropertyHasInput } from './property-has.input';
import { ExtraPricingInput } from './property.extra-price.input';
import { OnSaleInput } from './property.on-sale.input';
import { RatingInput } from './property.rating.input';
import { v4 as uuid } from 'uuid';

@InputType()
export class PropertyInput {
  @Field()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @Field(() => ID, { defaultValue: uuid() })
  @IsUUID()
  id: string;

  @Field(() => PropertyDescriptionInput)
  description: PropertyDescriptionInput;

  @Field(() => [String])
  tags: string[];

  @Field(() => String)
  propertyFor: 'rent' | 'sell';

  @Field(() => [String])
  images: string[];

  @Field(() => String, { nullable: true })
  ownership: 'leasehold' | `freehold` | null;

  @Field()
  propertyArea: number;

  @Field(() => PropertyHasInput)
  propertyHas: PropertyHasInput;

  @Field(() => String)
  type: 'apartment' | 'home' | 'cottage' | 'commercial';

  @Field(() => [ExtraPricingInput], { nullable: true })
  extraPricing: ExtraPricingInput[] | null;

  @Field(() => OnSaleInput)
  onSale: OnSaleInput;

  @Field(() => RatingInput)
  rating: RatingInput;

  @Field()
  @IsUUID()
  landlord: string;

  @IsDateString()
  @Field()
  createdAt: string;
}
