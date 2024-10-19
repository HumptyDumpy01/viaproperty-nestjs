import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsUUID, Matches } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { AuthMethodEnum } from './enums/auth-method.enum';
import { BalanceType } from './object-types/balance.type';
import { RequestsType } from './object-types/requests.type';
import { Any } from 'typeorm';

// the input type, regarding GraphQL, is all about DTO.
// still, to use any DTO's, remember to enable global validation pipes!
@InputType()
export class UserInput {
  @Field((_type) => ID, { defaultValue: uuid() })
  @IsUUID('4')
  id: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  initials: string;

  @Field(() => String)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password should contain at least 8 characters, one letter and one number',
  })
  password: string;

  @Field(() => String, { defaultValue: AuthMethodEnum.PASSWORD })
  authMethod: string;

  @Field(() => String, {
    defaultValue: new Date().toISOString(),
  })
  createdAt: string;

  @Field(() => Boolean)
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

  @Field(() => Boolean)
  active: boolean;

  @Field(() => BalanceType)
  balance: BalanceType;

  @Field(() => [RequestsType], { defaultValue: [] })
  pendingRequests: RequestsType[];

  @Field(() => [RequestsType], { defaultValue: [] })
  rejectedRequests: RequestsType[];

  @Field(() => [RequestsType], { defaultValue: [] })
  completedDeals: RequestsType[];

  @Field(() => [String], { defaultValue: [] })
  @IsUUID('4', { each: true })
  @IsOptional()
  favoriteChats: string[];

  @Field(() => [String], { defaultValue: [] })
  // consist UUIDs
  @IsUUID('4', { each: true })
  @IsOptional()
  blockedUsers: string[];

  @Field(() => [Any], { defaultValue: [] })
  activity: any[];

  @Field(() => String, { defaultValue: UserStatusEnum.USER })
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;
}
