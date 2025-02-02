import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChangePasswordTokenInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
