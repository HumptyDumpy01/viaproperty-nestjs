import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

@ObjectType()
class GeoLocation {
  @Field()
  type: string;

  @Field(() => [Number])
  coordinates: number[];
}

@ObjectType()
class Location {
  @Field()
  title: string;

  @Field(() => GeoLocation)
  location: GeoLocation;

  @Field((type) => String, { nullable: true, defaultValue: null })
  @IsOptional()
  description: string;
}

@ObjectType()
class Feature {
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

@ObjectType()
class Contact {
  @Field()
  initials: string;

  @Field(() => [String])
  phones: string[];
}

@ObjectType()
class Contacts {
  @Field()
  description: string;

  @Field(() => [Contact])
  contacts: Contact[];
}

@ObjectType()
class PriceAndTaskHistory {
  @Field()
  price: string;

  @Field()
  history: string;
}

@ObjectType()
class FloorPlan {
  @Field()
  title: string;

  @Field(() => [String])
  images: string[];

  @Field()
  description: string;
}

@ObjectType()
export class PropertyDescription {
  @Field()
  @MinLength(5)
  @MaxLength(400)
  overall: string;

  @Field(() => [Feature], { defaultValue: [] })
  @IsOptional()
  features: Feature[];

  @Field(() => Location)
  location: Location;

  @Field({ defaultValue: null })
  @IsOptional()
  videoTour: string;

  @Field(() => Contacts)
  contacts: Contacts;

  @Field(() => PriceAndTaskHistory)
  priceAndTaskHistory: PriceAndTaskHistory;

  @Field(() => [FloorPlan], { defaultValue: [] })
  @IsOptional()
  floorPlans: FloorPlan[];
}
