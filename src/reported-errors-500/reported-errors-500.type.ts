import { Field, ID, ObjectType } from '@nestjs/graphql';

// give the actual type a name that would
// be used to query data in GraphQL sandbox
@ObjectType(`ReportedErrors500`)
export class ReportedErrors500Type {
  // specify the type ID manually
  @Field((_type) => ID)
  id: string;

  @Field()
  userMessage: string;

  @Field()
  createdAt: Date;

  @Field()
  errorStack: string;
}
