import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './entities/wishlist.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { UserWishlisted } from './entities/user-wishlisted.entity';
import { ResolvedWishlist } from './entities/resolved-wishlist';
import { GetResolvedUserWishlistInput } from './dto/get-resolved-user-wishlist.input';

@Resolver(() => Wishlist)
@UseGuards(AuthGuard)
export class WishlistResolver {
  constructor(private readonly wishlistService: WishlistService) {}

  /**
   * adds property to the user wishlist.
   */
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

  /**
   *
   * returns true or false based on whether user added property to wishlist or not.
   */
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

  /**
   * simply removes property id from the user wishlist.
   */
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

  /**
   * fetches user wishlisted properties, where each property is represented
   * as an entire object, not just prop id.
   */
  @Query(() => ResolvedWishlist)
  async getResolvedUserWishlist(
    @Context() context: any,
    @Args(`getResolvedUserWishlistInput`)
    getResolvedUserWishlistInput: GetResolvedUserWishlistInput,
  ) {
    const { take, skip } = getResolvedUserWishlistInput;

    const { result, total } = await this.wishlistService.getUserWishlist(
      context.req.user.id,
      take,
      skip,
    );
    return { resolvedWishlist: result, total };
  }
}
