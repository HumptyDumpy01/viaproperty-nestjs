import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';
import { AuthMethodEnum } from './enums/auth-method.enum';
import { UserStatusEnum } from './enums/user-status.enum';

// INJECT EACH ENTITY ONTO "entities" ARRAY IN APP.MODULE MONGODB CONNECTION
@Entity()
@Unique([`email`])
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

  @Column({ default: `USER` })
  status: UserStatusEnum;

  @Column()
  personalRating: number[];
}
