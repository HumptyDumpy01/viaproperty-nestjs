import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './entities/wishlist.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { UserWishlisted } from './entities/user-wishlisted.entity';
import { PropertyService } from '../../property/property.service';
import { ResolvedWishlist } from './entities/resolved-wishlist';

@Resolver(() => Wishlist)
@UseGuards(AuthGuard)
export class WishlistResolver {
  constructor(
    private readonly wishlistService: WishlistService,
    private propertyService: PropertyService,
  ) {}

  @Mutation(() => Wishlist)
  addPropertyIdToUserWishlist(
    @Args('propertyId') propertyId: string,
    @Context() context: any,
  ) {
    return this.wishlistService.addPropertyIdToUserWishlist(
      propertyId,
      context.req.user.id,
    );
  }

  @Query(() => Wishlist)
  isAddedPropertyToWishlist(
    @Args('propertyId') propertyId: string,
    @Context() context: any,
  ) {
    return this.wishlistService.userAddedPropertyToWishlist(
      propertyId,
      context.req.user.id,
    );
  }

  @Query(() => UserWishlisted)
  userAddedPropertyToWishlist(
    @Args(`propertyId`) propertyId: string,
    @Context() context: any,
  ) {
    const wishlisted = this.wishlistService.userAddedPropertyToWishlist(
      propertyId,
      context.req.user.id,
    );
    return { wishlisted: wishlisted };
  }

  @Mutation(() => Wishlist)
  removePropertyIdFromUserWishlist(
    @Args('propertyId') propertyId: string,
    @Context() context: any,
  ) {
    const remainingWishlist =
      this.wishlistService.removePropertyIdFromUserWishlist(
        propertyId,
        context.req.user.id,
      );
    return { wishlist: remainingWishlist };
  }

  @Query(() => ResolvedWishlist)
  async getUserWishlist(@Context() context: any) {
    const result = await this.wishlistService.getUserWishlist(
      context.req.user.id,
    );
    return { resolvedWishlist: result };
  }
}
