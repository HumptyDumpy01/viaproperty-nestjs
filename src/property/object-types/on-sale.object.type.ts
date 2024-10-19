import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OnSale {
  @Field()
  isOnSale: boolean;

  @Field(() => String, { nullable: true })
  discount: string | null;

  @Field(() => Number, { nullable: true })
  newPrice: number | null;
}
