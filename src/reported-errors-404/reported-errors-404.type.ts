import { Field, ID, ObjectType } from '@nestjs/graphql';

// give the actual type a name that would
// be used to query data in GraphQL sandbox
@ObjectType(`ReportedErrors404`)
export class ReportedErrors404Type {
  // specify the type ID manually
  @Field((_type) => ID)
  id: string;

  @Field()
  userMessage: string;

  @Field()
  createdAt: string;
}
