import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { PropertyTags } from './enums/property-tags.enum';
import { PropertyFor } from './enums/property-for.enum';
import { PropertyDescriptionInterface } from './interfaces/property-description.interface';
import { PropertyOwnership } from './enums/property-ownership.enum';
import { PropertyHasInterface } from './interfaces/property-has.interface';
import { PropertyRatingInterface } from './interfaces/property-rating.interface';
import { PropertyOnSaleInterface } from './interfaces/property.onsale.interface';
import { PropertyAdditionalConveniences } from './enums/property-additional-conveniences.enum';

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
  tags: PropertyTags[];

  @Column()
  additionalConveniences: PropertyAdditionalConveniences[];

  @Column()
  propertyFor: PropertyFor;

  @Column()
  images: string[];

  @Column()
  ownership: PropertyOwnership | null;

  @Column()
  propertyArea: number;

  @Column()
  propertyHas: PropertyHasInterface;

  @Column()
  type: string;

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
