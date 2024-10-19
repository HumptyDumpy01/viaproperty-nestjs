import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PropertyHas {
  @Field()
  bedrooms: number;

  @Field()
  bathrooms: number;
  @Field()
  kitchens: number;

  @Field()
  livingRooms: number;

  @Field()
  parkingSpaces: number;
}
