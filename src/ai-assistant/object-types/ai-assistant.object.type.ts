import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AiAssistant {
  @Field()
  response: string;

  @Field()
  id: string;
}
