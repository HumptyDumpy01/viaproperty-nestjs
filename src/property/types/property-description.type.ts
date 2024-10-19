import { Field, ObjectType } from '@nestjs/graphql';

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

  @Field()
  description: string;
}

@ObjectType()
class Feature {
  @Field()
  title: string;

  @Field(() => [String])
  images: string[];

  @Field()
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
  overall: string;

  @Field(() => [Feature])
  features: Feature[];

  @Field(() => Location)
  location: Location;

  @Field()
  videoTour: string;

  @Field(() => Contacts)
  contacts: Contacts;

  @Field(() => PriceAndTaskHistory)
  priceAndTaskHistory: PriceAndTaskHistory;

  @Field(() => [FloorPlan])
  floorPlans: FloorPlan[];
}
