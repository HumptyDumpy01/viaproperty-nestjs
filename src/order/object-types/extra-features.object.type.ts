import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExtraFeaturesType {
  @Field()
  title: string;

  @Field()
  price: number;

  @Field()
  label: string;
}
