import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class WishlistService {
  constructor(private authService: AuthService) {}

  async addPropertyIdToUserWishlist(propertyId: string, userId: string) {
    const userWishlist = await this.authService.addPropertyIdToUserWishlist(
      propertyId,
      userId,
    );
    return { wishlist: userWishlist };
  }

  findAll() {
    return `This action returns all wishlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
