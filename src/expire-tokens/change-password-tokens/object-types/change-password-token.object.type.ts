import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChangePasswordToken {
  @Field()
  createdAt: Date;
}
