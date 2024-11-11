import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OnSaleInput {
  @Field((type) => Boolean, { defaultValue: false })
  isOnSale: boolean;

  @Field(() => String, { nullable: true, defaultValue: null })
  discount: string | null;

  @Field(() => Number, { nullable: true, defaultValue: null })
  newPrice: string | null;
}
