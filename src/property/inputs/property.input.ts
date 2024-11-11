import { Field, ID, InputType } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsIn,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PropertyDescriptionInput } from './property.description.input';
import { PropertyHasInput } from './property-has.input';
import { ExtraPricingInput } from './property.extra-price.input';
import { OnSaleInput } from './property.on-sale.input';
import { RatingInput } from './property.rating.input';
import { v4 as uuid } from 'uuid';
import { PropertyTags } from '../enums/property-tags.enum';
import { PropertyAdditionalConveniences } from '../enums/property-additional-conveniences.enum';

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
  @IsIn(Object.values(PropertyTags), { each: true })
  tags: string[];

  @Field(() => [String])
  @IsIn(Object.values(PropertyAdditionalConveniences), { each: true })
  additionalConveniences: string[];

  @Field(() => String)
  @IsIn(['rent', 'sell'])
  propertyFor: 'rent' | 'sell';

  @Field(() => [String])
  @ArrayMinSize(4)
  @ArrayMaxSize(16)
  images: string[];

  @Field(() => String, { nullable: true })
  @IsIn(['leasehold', 'freehold', null])
  ownership: 'leasehold' | `freehold` | null;

  @Field()
  @Min(3)
  propertyArea: number;

  @Field(() => PropertyHasInput)
  propertyHas: PropertyHasInput;

  @Field(() => String)
  @IsIn(['apartment', 'home', 'cottage', 'commercial'])
  type: 'apartment' | 'home' | 'cottage' | 'commercial';

  @Field(() => [ExtraPricingInput], { nullable: true })
  extraPricing: ExtraPricingInput[] | null;

  @Field(() => OnSaleInput)
  onSale: OnSaleInput;

  @Field(() => RatingInput)
  rating: RatingInput;

  @Field()
  @IsUUID()
  landlordId: string;

  @IsDateString()
  @Field()
  createdAt: string;
}
