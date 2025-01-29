import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { PropertyService } from '../../property/property.service';

@Injectable()
export class WishlistService {
  constructor(
    private authService: AuthService,
    private propertyService: PropertyService,
  ) {}

  async addPropertyIdToUserWishlist(propertyId: string, userId: string) {
    const userWishlist = await this.authService.addPropertyIdToUserWishlist(
      propertyId,
      userId,
    );
    return { wishlist: userWishlist };
  }

  async getUserWishlist(userId: string) {
    const propIds = await this.authService.getUserWishlist(userId);
    return await this.propertyService.getPropertiesByIds(propIds);
  }

  async userAddedPropertyToWishlist(propertyId: string, userId: string) {
    await this.propertyService.getProperty(propertyId);
    const user = await this.authService.getUserData(userId);
    return user.wishlist.includes(propertyId);
  }

  removePropertyIdFromUserWishlist(propertyId: string, userId: string) {
    return this.authService.removePropertyIdFromUserWishlist(
      propertyId,
      userId,
    );
  }
}
