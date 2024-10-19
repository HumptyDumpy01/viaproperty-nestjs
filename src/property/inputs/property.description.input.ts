import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

@InputType()
class GeoLocationInput {
  @Field()
  type: string;

  @Field(() => [Number])
  coordinates: number[];
}

@InputType()
class LocationInput {
  @Field()
  title: string;

  @Field(() => GeoLocationInput)
  location: GeoLocationInput;

  @Field(() => String, { nullable: true, defaultValue: null })
  @IsOptional()
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
  @MaxLength(600)
  description: string;
}

@InputType()
class ContactInput {
  @Field()
  initials: string;

  @Field(() => [String])
  phones: string[];
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
  description: string;
}

@InputType()
export class PropertyDescriptionInput {
  @Field()
  @MinLength(5)
  @MaxLength(400)
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
