import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveRegistrationTokenObjectType {
  @Field()
  removed: boolean;
}
