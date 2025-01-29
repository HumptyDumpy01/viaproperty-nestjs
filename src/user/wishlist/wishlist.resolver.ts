import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './entities/wishlist.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { UserWishlisted } from './entities/user-wishlisted.entity';

@Resolver(() => Wishlist)
export class WishlistResolver {
  constructor(private readonly wishlistService: WishlistService) {}

  @UseGuards(AuthGuard)
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

  @Query(() => [Wishlist])
  findAll() {
    return this.wishlistService.findAll();
  }

  @Query(() => Wishlist)
  @UseGuards(AuthGuard)
  isAddedPropertyToWishlist(
    @Args('propertyId') propertyId: string,
    @Context() context: any,
  ) {
    return this.wishlistService.userAddedPropertyToWishlist(
      propertyId,
      context.req.user.id,
    );
  }

  @UseGuards(AuthGuard)
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
  removeWishlist(@Args('id', { type: () => Int }) id: number) {
    return this.wishlistService.remove(id);
  }
}
