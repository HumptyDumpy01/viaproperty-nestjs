import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class PropertyCommentsRatedInput {
  @Min(1)
  @Max(5)
  @Field()
  @IsNumber()
  overall: number;

  @Min(1)
  @Max(5)
  @Field()
  @IsNumber()
  location: number;

  @Min(1)
  @Max(5)
  @Field()
  @IsNumber()
  condition: number;

  @Min(1)
  @Max(5)
  @Field()
  @IsNumber()
  ownership: number;

  @Min(1)
  @Max(5)
  @Field()
  @IsNumber()
  noiseLevel: number;

  @Min(1)
  @Max(5)
  @Field()
  @IsNumber()
  amenities: number;

  @Min(1)
  @Max(5)
  @Field()
  @IsNumber()
  security: number;
}
