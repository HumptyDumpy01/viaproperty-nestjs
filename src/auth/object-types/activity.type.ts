import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class ActivityType {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  type: string;

  @Field()
  createdAt: string;
}
