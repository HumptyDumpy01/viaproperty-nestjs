import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChangePasswordToken {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
