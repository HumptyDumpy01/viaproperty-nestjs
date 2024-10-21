import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

// INJECT EACH ENTITY ONTO "entities" ARRAY IN APP.MODULE MONGODB CONNECTION
@Entity(`propertyRefund`)
@Unique([`orderId`])
export class PropertyRefund {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column()
  orderId: string;

  @Column()
  createdAt: Date;

  @Column()
  status: `pending` | `approved` | `rejected`;
}
