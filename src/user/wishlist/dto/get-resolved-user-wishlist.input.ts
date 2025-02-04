import { Field, InputType } from '@nestjs/graphql';
import { IsPositive, Min } from 'class-validator';

@InputType()
export class GetResolvedUserWishlistInput {
  @IsPositive()
  @Field()
  take: number;

  @Min(0)
  @Field()
  skip: number;
}
