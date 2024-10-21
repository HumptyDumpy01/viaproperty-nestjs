import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

// INJECT EACH ENTITY ONTO "entities" ARRAY IN APP.MODULE MONGODB CONNECTION
@Entity(`reportedErrors404`)
export class ReportedErrors404 {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column()
  userMessage: string;

  @Column()
  createdAt: string;
}
