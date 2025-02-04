import { Field, ObjectType } from '@nestjs/graphql';
import { PropertyType } from '../../../property/property.type';

@ObjectType()
export class ResolvedWishlist {
  @Field(() => [PropertyType], { nullable: true })
  resolvedWishlist: PropertyType[];

  @Field()
  total: number;
}
