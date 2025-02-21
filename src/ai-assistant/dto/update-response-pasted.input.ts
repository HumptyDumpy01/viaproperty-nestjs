import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateResponsePastedInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  pastedText: string;
}
