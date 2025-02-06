import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetPropertiesByIdsInput {
  @Field(() => [ID])
  propIds: string[];
}
