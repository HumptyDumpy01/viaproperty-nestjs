import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsUUID } from 'class-validator';
import { UserTypeEnum } from '../enums/user-type.enum';

@ObjectType()
export class PropertyCommentRepliesObjectType {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => ID)
  @IsUUID()
  commentId: string;

  @Field(() => UserTypeEnum)
  userType: UserTypeEnum;

  @Field(() => String)
  comment: string;

  @Field(() => ID)
  @IsUUID()
  replierId: string;

  @Field(() => String)
  replierInitials: string;

  @Field(() => String)
  @IsDateString()
  createdAt: string;
}
