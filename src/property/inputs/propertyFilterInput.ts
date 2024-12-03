import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsOptional, MaxLength, Min, MinLength } from 'class-validator';
import { OnSaleInput } from './property.on-sale.input';

@InputType()
export class PropertyFilterInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(5)
  @MaxLength(100)
  title?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  additionalConveniences?: string[];

  // add propertyHas
  @Field(() => Number, { nullable: true })
  @IsOptional()
  propertyHas?: {
    beds: number;
    showers: number;
    bathrooms: number;
    bedrooms: number;
    kitchens: number;
    parkingSpaces: number;
  };

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(500)
  searchFor?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsIn(['rent', 'sell'])
  propertyFor?: 'rent' | 'sell';

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsIn(['leasehold', 'freehold', null])
  ownership?: 'leasehold' | 'freehold' | null;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @Min(3)
  propertyArea?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsIn(['apartment', 'home', 'cottage', 'commercial'])
  type?: 'apartment' | 'home' | 'cottage' | 'commercial';

  @Field(() => Number, { nullable: true })
  @IsOptional()
  limit: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  offset: number;

  @Field(() => OnSaleInput, { nullable: true })
  onSale?: OnSaleInput;
}
