import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { AuthMethodEnum } from './enums/auth-method.enum';
import { RequestsInput } from './inputs/requests.input';

@InputType()
export class UserInput {
  @Field((_type) => ID, { defaultValue: uuid() })
  @IsUUID('4')
  id: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(2)
  @MaxLength(100)
  initials: string;

  @Field()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `The password should have at least 1 upper, 1 lower case letter, and 1 special character.`,
  })
  password: string;

  @Field(() => String, { defaultValue: AuthMethodEnum.PASSWORD })
  @IsIn([
    AuthMethodEnum.PASSWORD,
    AuthMethodEnum.TWO_FACTOR_AUTH,
    AuthMethodEnum.CODE,
  ])
  authMethod: AuthMethodEnum;

  @Field(() => String, {
    defaultValue: new Date().toISOString(),
  })
  createdAt: string;

  @Field(() => Boolean, { defaultValue: false })
  online: boolean;

  @Field(() => [String], { defaultValue: [] })
  @IsUUID('4', { each: true })
  @IsOptional()
  adverts: string[];

  @Field(() => [String], { defaultValue: [] })
  @IsUUID('4', { each: true })
  @IsOptional()
  wishlist: string[];

  @Field(() => [String], { defaultValue: [] })
  @IsUUID('4', { each: true })
  @IsOptional()
  purchases: string[];

  @Field(() => Boolean, { defaultValue: true })
  active: boolean;

  @Field(() => [RequestsInput], { defaultValue: [] })
  pendingRequests: { fromUser: string; status: 'pending'; orderId: string }[];

  @Field(() => [RequestsInput], { defaultValue: [] })
  rejectedRequests: { fromUser: string; status: 'rejected'; orderId: string }[];

  @Field(() => [RequestsInput], { defaultValue: [] })
  completedDeals: { fromUser: string; status: 'completed'; orderId: string }[];

  @Field(() => [String], { defaultValue: [] })
  @IsUUID('4', { each: true })
  @IsOptional()
  favoriteChats: string[];

  @Field(() => [String], { defaultValue: [] })
  @IsUUID('4', { each: true })
  @IsOptional()
  blockedUsers: string[];

  @Field(() => [String], { defaultValue: [] })
  activity: string[];
}
