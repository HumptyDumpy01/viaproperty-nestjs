import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChangeUserInitialsObjectType {
  @Field()
  updatedInitials: string;

  @Field()
  accessToken: string;
}
