import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

// INJECT EACH ENTITY ONTO "entities" ARRAY IN APP.MODULE MONGODB CONNECTION
@Entity(`reportedErrors500`)
export class ReportedErrors500 {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column()
  userMessage: string;

  @Column()
  errorStack: string;

  @Column()
  createdAt: Date;
}
