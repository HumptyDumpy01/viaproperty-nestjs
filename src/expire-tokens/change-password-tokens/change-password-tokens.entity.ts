import {
  Column,
  Entity,
  Index,
  ObjectIdColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity(`changePasswordTokens`)
@Unique([`email`])
@Index(['createdAt'], { expireAfterSeconds: 300 }) // each document expires after 5 minutes.
export class ChangePasswordTokens {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column()
  email: string;

  @Column()
  data: string;

  @Column()
  createdAt: Date;
}
