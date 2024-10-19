import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { AuthMethodEnum } from './enums/auth-method.enum';

// INJECT EACH ENTITY ONTO "entities" ARRAY IN APP.MODULE MONGODB CONNECTION
@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column()
  email: string;

  @Column()
  initials: string;

  @Column()
  password: string;

  @Column()
  authMethod: AuthMethodEnum;

  @Column()
  createdAt: string;

  @Column()
  online: boolean;

  @Column()
  adverts: string[];

  @Column()
  wishlist: string[];

  @Column()
  purchases: string[];

  @Column()
  active: boolean;

  @Column()
  balance: { total: number };

  @Column()
  pendingRequests: { fromUser: string; status: `pending`; orderId: string }[];

  @Column()
  rejectedRequests: { fromUser: string; status: `rejected`; orderId: string }[];

  @Column()
  completedDeals: { fromUser: string; status: `completed`; orderId: string }[];

  @Column()
  favoriteChats: string[];

  @Column()
  blockedUsers: string[];

  @Column()
  activity: any[];

  @Column()
  status: UserStatusEnum;

  @Column()
  personalRating: number[];
}
