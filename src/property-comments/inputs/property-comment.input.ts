import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class PropertyCommentInput {
  @Field(() => ID)
  @IsUUID()
  propertyId: string;

  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field()
  @MinLength(5, { message: 'Comment is too short(< 5 characters)' })
  @MaxLength(1000, { message: 'Comment is too long(> 1000 characters)' })
  comment: string;
}
