import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdditionalConvenience {
  @Field()
  airConditioning: boolean;

  @Field()
  balcony: boolean;

  // Add other fields as needed
}
