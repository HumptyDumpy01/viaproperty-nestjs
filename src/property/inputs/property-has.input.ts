import { Field, InputType } from '@nestjs/graphql';
import { Max } from 'class-validator';

@InputType()
export class PropertyHasInput {
  @Field(() => Number, { defaultValue: 0 })
  @Max(100)
  beds: number;

  @Field(() => Number, { defaultValue: 0 })
  @Max(100)
  livingRooms: number;

  @Max(100)
  @Field(() => Number, { defaultValue: 0 })
  bathrooms: number;

  @Field(() => Number, { defaultValue: 0 })
  @Max(100)
  bedrooms: number;

  @Field(() => Number, { defaultValue: 0 })
  @Max(100)
  parkingSpaces: number;

  @Field(() => Number, { defaultValue: 0 })
  @Max(100)
  kitchens: number;
}
