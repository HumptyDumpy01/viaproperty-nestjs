import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { PropertyDescriptionInterface } from './interfaces/property-description.interface';
import { PropertyHasInterface } from './interfaces/property-has.interface';
import { PropertyRatingInterface } from './interfaces/property-rating.interface';
import { PropertyOnSaleInterface } from './interfaces/property.onsale.interface';

// INJECT EACH ENTITY ONTO "entities" ARRAY IN APP.MODULE MONGODB CONNECTION
@Entity()
export class Property {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn(`uuid`)
  id: string;

  @Column()
  title: string;

  @Column()
  description: PropertyDescriptionInterface;

  @Column()
  tags: string[];

  @Column()
  additionalConveniences: string[];

  @Column()
  propertyFor: `rent` | `sell`;

  @Column()
  images: string[];

  @Column()
  ownership: `freehold` | `leasehold` | null;

  @Column()
  propertyArea: number;

  @Column()
  propertyHas: PropertyHasInterface;

  @Column()
  type: 'apartment' | 'home' | 'cottage' | 'commercial';

  @Column()
  extraPricing: { title: string; price: number }[] | null;

  @Column()
  onSale: PropertyOnSaleInterface;

  @Column()
  rating: PropertyRatingInterface;

  @Column()
  landlord: string;

  @Column()
  createdAt: string;
}
