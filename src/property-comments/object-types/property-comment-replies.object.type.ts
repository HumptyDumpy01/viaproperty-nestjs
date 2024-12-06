import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsUUID } from 'class-validator';

@ObjectType()
export class PropertyCommentRepliesObjectType {
  @Field(() => ID)
  @IsUUID()
  id: string;

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
