import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from './property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyInput } from './inputs/property.input';
import { PropertyFilterInput } from './inputs/propertyFilterInput';
import { filterProperties } from '../../utils/functions/filterProperties';
import { UpdatePropertyRatingInput } from './inputs/update-property-rating.input';
import { showErrorMessage } from '../../utils/functions/showErrorMessage';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async getProperties(filter?: PropertyFilterInput): Promise<Property[] | []> {
    return await this.propertyRepository.find(filterProperties(filter));
  }

  async getProperty(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id, active: true },
    });
    if (!property) {
      throw new NotFoundException('Property not found.');
    }

    return property;
  }

  async createPropertyAdvert(propertyInput: PropertyInput): Promise<Property> {
    const newProperty = this.propertyRepository.create(propertyInput);
    return await this.propertyRepository.save(newProperty);
  }

  async updatePropertyRating(
    updatePropertyRatingInput: UpdatePropertyRatingInput,
    propertyId: string,
  ) {
    const property = await this.getProperty(propertyId);

    if (!property) {
      throw new NotFoundException(
        showErrorMessage(`Property with ${propertyId} not found.`),
      );
    }

    // contains numbers: e.g. location: 5, condition: 3
    const { location, condition, noiseLevel, amenities, security, ownership } =
      updatePropertyRatingInput;

    // overall: array of these rating numbers
    property.rating.location.push(location);
    property.rating.condition.push(condition);
    property.rating.noiseLevel.push(noiseLevel);
    property.rating.amenities.push(amenities);
    property.rating.security.push(security);
    property.rating.ownership.push(ownership);
    property.rating.count = property.rating.count + 1;

    const calculateAverage = (ratings: number[]) =>
      ratings.reduce((acc, num) => acc + num, 0) / ratings.length;

    const overallLocationRating = calculateAverage(property.rating.location);
    const overallConditionRating = calculateAverage(property.rating.condition);
    const overallNoiseLevelRating = calculateAverage(
      property.rating.noiseLevel,
    );
    const overallAmenitiesRating = calculateAverage(property.rating.amenities);
    const overallSecurityRating = calculateAverage(property.rating.security);
    const overallOwnershipRating = calculateAverage(property.rating.ownership);

    // calculating the average rating
    property.rating.overall = Number(
      (
        (overallLocationRating +
          overallConditionRating +
          overallNoiseLevelRating +
          overallAmenitiesRating +
          overallSecurityRating +
          overallOwnershipRating) /
        6
      ).toFixed(2),
    );

    return await this.propertyRepository.save(property);
  }
}
