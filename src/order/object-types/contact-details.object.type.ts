import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactDetailsType {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;
}
