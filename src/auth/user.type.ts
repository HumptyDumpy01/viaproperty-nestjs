import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Any, Unique } from 'typeorm';
import { AuthMethodEnum } from './enums/auth-method.enum';
import { BalanceType } from './object-types/balance.type';
import { RequestsType } from './object-types/requests.type';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';

// give the actual type a name that would
// be used to query data in GraphQL sandbox
@ObjectType(`User`)
@Unique(['email'])
export class UserType {
  // specify the type ID manually
  @Field((_type) => ID, { defaultValue: uuid() })
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  initials: string;

  @Field(() => String)
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
