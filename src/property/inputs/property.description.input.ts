import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Optional } from '@nestjs/common';

@InputType()
class GeoLocationInput {
  @Field()
  @IsIn(['Point', 'Polygon'])
  type: string;

  @Field(() => [Number])
  coordinates: number[];
}

@InputType()
class LocationInput {
  @MinLength(5)
  @MaxLength(100)
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  country: string;

  @IsNotEmpty()
  @Field()
  city: string;

  @Field(() => GeoLocationInput)
  location: GeoLocationInput;

  @Field(() => String)
  @MinLength(5)
  @MaxLength(4_000)
  description: string;
}

@InputType()
class FeatureInput {
  @Field()
  @MinLength(2)
  @MaxLength(100)
  title: string;

  @Field(() => [String], { defaultValue: [] })
  @MaxLength(3)
  @IsOptional()
  images: string[];

  @Field(() => String, { defaultValue: `` })
  @MinLength(5)
  @MaxLength(1_000)
  description: string;
}

@InputType()
class ContactInput {
  @Field()
  @MaxLength(1_000)
  @MinLength(1)
  initials: string;

  @Field(() => [String])
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @MaxLength(20, { each: true })
  @MinLength(10, { each: true })
  @ArrayUnique()
  phones: string[];

  @Field(() => String)
  @IsEmail()
  @MaxLength(1000)
  email: string;
}

@InputType()
class ContactsInput {
  @Field()
  @MaxLength(1000)
  description: string;

  @Field(() => [ContactInput])
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @ArrayUnique()
  contacts: ContactInput[];
}

@InputType()
class PriceAndTaskHistoryInput {
  @Field()
  @MinLength(1)
  @MaxLength(8)
  price: string;

  @Field(() => String, { defaultValue: null })
  @Optional()
  @MaxLength(1000)
  @MinLength(5)
  history: string;
}

@InputType()
class FloorPlanInput {
  @Field()
  title: string;

  @Field(() => [String])
  images: string[];

  @Field()
  @MinLength(5)
  @MaxLength(4000)
  description: string;
}

@InputType()
export class PropertyDescriptionInput {
  @Field()
  @MinLength(5)
  @MaxLength(4000)
  overall: string;

  @Field(() => [FeatureInput], { defaultValue: [] })
  @MaxLength(10)
  @IsOptional()
  features: FeatureInput[];

  @Field(() => LocationInput)
  location: LocationInput;

  @Field({ defaultValue: null })
  @IsOptional()
  videoTour: string;

  @Field(() => ContactsInput)
  contacts: ContactsInput;

  @Field(() => PriceAndTaskHistoryInput)
  priceAndTaskHistory: PriceAndTaskHistoryInput;

  @Field(() => [FloorPlanInput], { defaultValue: [] })
  @MaxLength(10)
  @IsOptional()
  floorPlans: FloorPlanInput[];
}
