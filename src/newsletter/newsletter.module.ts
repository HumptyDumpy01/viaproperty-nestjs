import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Newsletter } from './newsletter.entity';
import { NewsletterResolver } from './newsletter.resolver';

@Module({
  providers: [NewsletterService, NewsletterResolver],
  imports: [TypeOrmModule.forFeature([Newsletter])],
})
export class NewsletterModule {}
