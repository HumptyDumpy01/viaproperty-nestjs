import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { PropertyRepliesInterface } from '../property-comments/interfaces/property-replies.interface';

@Entity(`propertyQuestions`)
export class PropertyQuestions {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column({ type: `uuid` })
  propertyId: string;

  @Column()
  comment: string;

  @Column()
  likes: string[];

  @Column()
  createdAt: string;

  @Column({ type: `uuid` })
  userId: string;

  @Column()
  replies: PropertyRepliesInterface[];
}
