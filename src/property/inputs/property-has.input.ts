import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PropertyHasInput {
  @Field(() => Number, { defaultValue: 0 })
  beds: number;

  @Field(() => Number, { defaultValue: 0 })
  showers: number;

  @Field(() => Number, { defaultValue: 0 })
  bathrooms: number;

  @Field(() => Number, { defaultValue: 0 })
  bedrooms: number;

  @Field(() => Number, { defaultValue: 0 })
  parkingSlots: number;

  @Field(() => Number, { defaultValue: 0 })
  kitchens: number;
}
