import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class UpdatePropertyRatingInput {
  @Field()
  @IsNumber()
  @Min(1)
  @Max(5)
  location: number;

  @Field()
  @IsNumber()
  @Min(1)
  @Max(5)
  security: number;

  @Field()
  @IsNumber()
  @Min(1)
  @Max(5)
  condition: number;

  @Field()
  @IsNumber()
  @Min(1)
  @Max(5)
  noiseLevel: number;

  @Field()
  @IsNumber()
  @Min(1)
  @Max(5)
  ownership: number;

  @Field()
  @IsNumber()
  @Min(1)
  @Max(5)
  amenities: number;
}
