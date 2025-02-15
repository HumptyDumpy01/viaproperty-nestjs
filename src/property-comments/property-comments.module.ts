import { forwardRef, Module } from '@nestjs/common';
import { PropertyCommentsService } from './property-comments.service';
import { PropertyCommentsResolver } from './property-comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyComments } from './property-comments.entity';
import { PropertyModule } from '../property/property.module';
import { AuthModule } from '../auth/auth.module';
import { PropertyCommentsGateway } from './property-comments.gateway';

@Module({
  providers: [
    PropertyCommentsService,
    PropertyCommentsResolver,
    PropertyCommentsGateway,
  ],
  imports: [
    TypeOrmModule.forFeature([PropertyComments]),
    forwardRef(() => PropertyModule),
    AuthModule,
  ],
  exports: [PropertyCommentsService],
})
export class PropertyCommentsModule {}
