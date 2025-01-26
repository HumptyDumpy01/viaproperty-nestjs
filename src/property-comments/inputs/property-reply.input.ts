import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class PropertyReplyInput {
  @Field(() => ID)
  @IsUUID()
  propertyId: string;

  @Field(() => ID)
  @IsUUID()
  commentId: string;

  @Field()
  @MinLength(2, { message: 'Comment is too short(< 2 characters)' })
  @MaxLength(1000, { message: 'Comment is too long(> 600 characters)' })
  comment: string;
}
