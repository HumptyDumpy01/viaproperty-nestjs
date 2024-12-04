import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OnSale {
  @Field()
  isOnSale: boolean;

  @Field(() => String, { nullable: true, defaultValue: null })
  discount: string | null;

  @Field(() => String, { nullable: true, defaultValue: null })
  newPrice: string | null;
}
