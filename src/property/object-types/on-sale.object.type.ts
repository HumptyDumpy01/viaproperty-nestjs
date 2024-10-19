import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OnSale {
  @Field()
  isOnSale: boolean;

  @Field(() => String, { nullable: true, defaultValue: null })
  discount: string | null;

  @Field(() => Number, { nullable: true, defaultValue: null })
  newPrice: number | null;
}
