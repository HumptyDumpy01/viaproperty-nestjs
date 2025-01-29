import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';
import { AuthModule } from '../../auth/auth.module';

@Module({
  providers: [WishlistResolver, WishlistService],
  imports: [AuthModule],
})
export class WishlistModule {}
