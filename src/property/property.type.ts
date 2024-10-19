import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PropertyDescription } from './types/property-description.type';
import { PropertyHas } from './object-types/property-has.object.type';
import { ExtraPricing } from './object-types/extra-pricing.object.type';
import { OnSale } from './object-types/on-sale.object.type';
import { Rating } from './object-types/rating.object.type';

@ObjectType('Property')
export class PropertyType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => PropertyDescription)
  description: PropertyDescription;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  additionalConveniences: string[];

  @Field()
  propertyFor: 'rent' | 'sell';

  @Field(() => [String])
  images: string[];

  @Field(() => String, { nullable: true })
  ownership: 'leasehold' | `freehold` | null;

  @Field()
  propertyArea: number;

  @Field(() => PropertyHas)
  propertyHas: PropertyHas;

  @Field()
  type: string;

  @Field(() => [ExtraPricing], { nullable: true })
  extraPricing: ExtraPricing[] | null;

  @Field(() => OnSale)
  onSale: OnSale;

  @Field(() => Rating)
  rating: Rating;

  @Field()
  landlord: string;

  @Field()
  createdAt: string;
}
