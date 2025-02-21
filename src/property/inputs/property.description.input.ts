import { Field, InputType } from '@nestjs/graphql';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @Field(() => [String], { defaultValue: [] })
  @IsOptional()
  images: string[];

  @Field()
  @MinLength(5)
  @MaxLength(4_000)
  description: string;
}

@InputType()
class ContactInput {
  @Field()
  initials: string;

  @Field(() => [String])
  phones: string[];

  @Field(() => String)
  email: string;
}

@InputType()
class ContactsInput {
  @Field()
  description: string;

  @Field(() => [ContactInput])
  contacts: ContactInput[];
}

@InputType()
class PriceAndTaskHistoryInput {
  @Field()
  @MinLength(1)
  @MaxLength(8)
  price: string;

  @Field()
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
  @IsOptional()
  floorPlans: FloorPlanInput[];
}
