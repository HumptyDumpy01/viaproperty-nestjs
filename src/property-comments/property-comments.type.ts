import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PropertyCommentRatedObjectType } from './object-types/property-comment-rated.object.type';

@ObjectType(`PropertyComments`)
export class PropertyCommentsType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  propertyId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => String)
  comment: string;

  @Field(() => PropertyCommentRatedObjectType)
  rated: PropertyCommentRatedObjectType;

  @Field(() => [String])
  likes: string[];

  @Field(() => String)
  createdAt: string;
}
