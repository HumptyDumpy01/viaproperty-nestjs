import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { AuthMethodEnum } from './enums/auth-method.enum';
import { BalanceType } from './object-types/balance.type';
import { RequestsType } from './object-types/requests.type';
import { Any } from 'typeorm';

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

  @Field(() => String)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password should contain at least 8 characters, one letter and one number',
  })
  password: string;

  @Field(() => AuthMethodEnum, { defaultValue: AuthMethodEnum.PASSWORD })
  @IsEnum(AuthMethodEnum)
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

  @Field(() => BalanceType, { defaultValue: { total: 0 } })
  balance: BalanceType;

  @Field(() => [RequestsType], { defaultValue: [] })
  pendingRequests: { fromUser: string; status: 'pending'; orderId: string }[];

  @Field(() => [RequestsType], { defaultValue: [] })
  rejectedRequests: { fromUser: string; status: 'rejected'; orderId: string }[];

  @Field(() => [RequestsType], { defaultValue: [] })
  completedDeals: { fromUser: string; status: 'completed'; orderId: string }[];

  @Field(() => [String], { defaultValue: [] })
  @IsUUID('4', { each: true })
  @IsOptional()
  favoriteChats: string[];

  @Field(() => [String], { defaultValue: [] })
  @IsUUID('4', { each: true })
  @IsOptional()
  blockedUsers: string[];

  @Field(() => [Any], { defaultValue: [] })
  activity: any[];
}
