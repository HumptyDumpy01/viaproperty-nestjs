import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateRegistrationTokenObjectType {
  @Field()
  sent: boolean;
}
