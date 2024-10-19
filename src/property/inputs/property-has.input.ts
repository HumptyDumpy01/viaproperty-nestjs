import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PropertyHasInput {
  @Field(() => Number, { defaultValue: 0 })
  bedrooms: number;

  @Field(() => Number, { defaultValue: 0 })
  bathrooms: number;
  @Field(() => Number, { defaultValue: 0 })
  kitchens: number;

  @Field(() => Number, { defaultValue: 0 })
  livingRooms: number;

  @Field(() => Number, { defaultValue: 0 })
  parkingSpaces: number;
}
