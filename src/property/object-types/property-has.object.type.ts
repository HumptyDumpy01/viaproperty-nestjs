import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PropertyHas {
  @Field()
  beds: number;

  @Field()
  showers: number;

  @Field()
  baths: number;

  @Field()
  bedrooms: number;

  @Field()
  kitchens: number;

  @Field()
  parkingSpaces: number;
}
