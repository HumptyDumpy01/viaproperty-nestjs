import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RatingInput {
  @Field({ nullable: true, defaultValue: 0 })
  count: number;

  @Field({ nullable: true, defaultValue: 0 })
  overall: number;

  @Field(() => [Number], { nullable: true, defaultValue: [] })
  location: number[] | [];

  @Field(() => [Number], { nullable: true, defaultValue: [] })
  condition: number[] | [];

  @Field(() => [Number], { nullable: true, defaultValue: [] })
  ownership: number[] | [];

  @Field(() => [Number], { nullable: true, defaultValue: [] })
  amenities: number[] | [];

  @Field(() => [Number], { nullable: true, defaultValue: [] })
  noiseLevel: number[] | [];

  @Field(() => [Number], { nullable: true, defaultValue: [] })
  security: number[] | [];
}
