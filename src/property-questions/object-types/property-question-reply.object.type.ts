import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsUUID } from 'class-validator';
import { UserTypeEnum } from '../../property-comments/enums/user-type.enum';

@ObjectType()
export class PropertyQuestionRepliesObjectType {
  @Field(() => ID)
  @IsUUID()
  id: string;

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
