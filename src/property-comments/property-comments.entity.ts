import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { PropertyRepliesInterface } from './interfaces/property-replies';

@Entity(`propertyComments`)
export class PropertyComments {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column({ type: `uuid` })
  propertyId: string;

  @Column()
  rated: RatedCommentInterface;

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
