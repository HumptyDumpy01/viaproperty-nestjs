import {
  Column,
  Entity,
  Index,
  ObjectIdColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity(`registrationTokens`)
@Unique([`email`])
@Index([`createdAt`], { expireAfterSeconds: 600 })
export class RegistrationTokens {
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
