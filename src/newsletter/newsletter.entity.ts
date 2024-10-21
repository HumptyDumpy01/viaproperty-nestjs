import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

// INJECT EACH ENTITY ONTO "entities" ARRAY IN APP.MODULE MONGODB CONNECTION
@Entity(`newsletter`)
@Unique(['email'])
export class Newsletter {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;
}
