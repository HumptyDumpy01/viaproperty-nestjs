import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity(`viapropertyAssistantResponses`)
export class AiAssistant {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column(`uuid`)
  userId: string;

  @Column()
  generationFor: string;

  @Column()
  tags: string;

  @Column()
  tone: string;

  @Column()
  type: string;

  @Column({ default: null })
  rated: number;

  @Column()
  assistantResponse: string;

  @Column({ default: false })
  pasted: boolean;

  @Column({ default: null })
  pastedText: string;

  @Column()
  createdAt: string;
}
