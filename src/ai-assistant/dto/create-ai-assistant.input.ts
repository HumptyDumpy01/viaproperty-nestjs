import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateAiAssistantInput {
  @Field()
  @IsEnum([
    'Property Title',
    'Property Description',
    'Property Location Description',
  ])
  generationFor: string;

  @Field()
  @MinLength(4)
  @MaxLength(1_000)
  @IsString()
  tags: string;

  @Field()
  @IsEnum(['Professional', 'Trendy', 'Inviting', 'Minimalist'])
  tone: string;

  @Field()
  @IsEnum(['propertyAdvert', `biography`])
  type: string;
}
