import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';
import { AuthModule } from '../../auth/auth.module';
import { PropertyModule } from '../../property/property.module';

@Module({
  providers: [WishlistResolver, WishlistService],
  imports: [AuthModule, PropertyModule],
})
export class WishlistModule {}
