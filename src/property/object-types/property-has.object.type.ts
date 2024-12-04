import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PropertyHas {
  @Field()
  beds: number;

  @Field()
  livingRooms: number;

  @Field()
  bathrooms: number;

  @Field()
  bedrooms: number;

  @Field()
  kitchens: number;

  @Field({ defaultValue: 0 })
  parkingSpaces: number;
}
