import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsIn,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PropertyDescriptionInput } from './property.description.input';
import { PropertyHasInput } from './property-has.input';
import { ExtraPricingInput } from './property.extra-price.input';
import { OnSaleInput } from './property.on-sale.input';
import { PropertyTags } from '../enums/property-tags.enum';
import { PropertyAdditionalConveniences } from '../enums/property-additional-conveniences.enum';

@InputType()
export class PropertyInput {
  @Field()
  @MinLength(5)
  @MaxLength(100)
  title: string;

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
  @ArrayMaxSize(6)
  images: string[];

  @Field(() => String, { nullable: true, defaultValue: null })
  @IsIn(['leasehold', 'freehold', null])
  ownership: 'leasehold' | `freehold` | null;

  @Field()
  @Min(1)
  propertyArea: number;

  @Field(() => PropertyHasInput)
  propertyHas: PropertyHasInput;

  @Field(() => String)
  @IsIn(['apartment', 'home', 'cottage', 'commercial'])
  type: 'apartment' | 'home' | 'cottage' | 'commercial';

  @Field(() => [ExtraPricingInput], { nullable: true, defaultValue: null })
  @IsOptional()
  extraPricing: ExtraPricingInput[];

  @Field(() => OnSaleInput, {
    defaultValue: {
      isOnSale: false,
      discount: null,
      newPrice: null,
    },
  })
  @IsOptional()
  onSale: OnSaleInput;
}
