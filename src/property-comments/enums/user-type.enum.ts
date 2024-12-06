import { registerEnumType } from '@nestjs/graphql';

export enum UserTypeEnum {
  LANDLORD = 'landlord',
  USER = 'user',
}

registerEnumType(UserTypeEnum, {
  name: 'UserTypeEnum',
});
