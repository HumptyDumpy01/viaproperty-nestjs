import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from '../auth/user.type';
import { PropertyCommentRepliesObjectType } from '../property-comments/object-types/property-comment-replies.object.type';

@ObjectType(`PropertyQuestionsType`)
export class PropertyQuestionsType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  propertyId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => UserType)
  user: UserType;

  @Field(() => String)
  comment: string;

  @Field(() => [String])
  likes: string[];

  @Field(() => [PropertyCommentRepliesObjectType])
  replies: PropertyCommentRepliesObjectType[];

  @Field(() => String)
  createdAt: string;
}
