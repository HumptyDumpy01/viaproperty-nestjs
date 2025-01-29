import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './entities/wishlist.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';

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

  @Query(() => [Wishlist], { name: 'wishlist' })
  findAll() {
    return this.wishlistService.findAll();
  }

  @Query(() => Wishlist, { name: 'wishlist' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.wishlistService.findOne(id);
  }

  @Mutation(() => Wishlist)
  removeWishlist(@Args('id', { type: () => Int }) id: number) {
    return this.wishlistService.remove(id);
  }
}
