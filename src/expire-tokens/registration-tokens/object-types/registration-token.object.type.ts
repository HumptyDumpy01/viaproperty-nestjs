import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegistrationToken {
  @Field()
  id: string;
}
