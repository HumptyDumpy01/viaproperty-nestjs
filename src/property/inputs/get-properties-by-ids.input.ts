import { Field, ID, InputType } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class GetPropertiesByIdsInput {
  @Field(() => [ID])
  propIds: string[];

  @IsPositive()
  @Field()
  take: number;

  @IsPositive()
  @Field()
  skip: number;
}
