import { Field, ID, ObjectType } from '@nestjs/graphql';

// give the actual type a name that would
// be used to query data in GraphQL sandbox
@ObjectType(`Newsletter`)
export class NewsletterType {
  // specify the type ID manually
  @Field((_type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  createdAt: string;
}
