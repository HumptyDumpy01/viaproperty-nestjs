import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsUUID, Max, Min } from 'class-validator';

@ObjectType()
export class PropertyCommentRepliesObjectType {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String)
  @Min(2)
  @Max(600)
  comment: string;

  @Field(() => ID)
  @IsUUID()
  replierId: string;

  @Field(() => String)
  @IsDateString()
  createdAt: string;
}
