import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OnSaleInput {
  @Field((_type) => Boolean, { defaultValue: false })
  isOnSale: boolean;

  @Field(() => String, { nullable: true, defaultValue: null })
  discount: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  newPrice: string;
}
