import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsUUID } from 'class-validator';

// the input type, regarding GraphQL, is all about DTO.
// still, to use any DTO's, remember to enable global validation pipes!
@InputType()
export class ChangePropertyRefundStatusInput {
  @IsUUID()
  @Field()
  id: string;

  @Field()
  @IsEnum([`pending`, `approved`, `rejected`])
  status: `pending` | `approved` | `rejected`;
}
