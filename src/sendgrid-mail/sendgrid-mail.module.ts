import { Module } from '@nestjs/common';
import { SendgridMailService } from './sendgrid-mail.service';

@Module({
  providers: [SendgridMailService],
  exports: [SendgridMailService],
})
export class SendgridMailModule {}
