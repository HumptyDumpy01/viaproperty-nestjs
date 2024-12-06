import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class PropertyReplyInput {
  @Field(() => ID)
  @IsUUID()
  commentId: string;

  @Field(() => ID)
  @IsUUID()
  replierId: string;

  @Field()
  @MinLength(1, { message: 'Replier initials are too short(< 1 character)' })
  replierInitials: string;

  @Field()
  @MinLength(2, { message: 'Comment is too short(< 2 characters)' })
  @MaxLength(600, { message: 'Comment is too long(> 600 characters)' })
  comment: string;
}
