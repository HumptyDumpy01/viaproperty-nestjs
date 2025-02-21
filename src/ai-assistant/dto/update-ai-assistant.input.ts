import { CreateAiAssistantInput } from './create-ai-assistant.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class UpdateRatingAiAssistantInput extends PartialType(
  CreateAiAssistantInput,
) {
  @IsUUID()
  @Field()
  id: string;

  @Field()
  @Min(1)
  @Max(5)
  @IsNumber()
  rated: number;
}
