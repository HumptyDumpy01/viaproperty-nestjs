import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as process from 'node:process';

@Injectable()
export class SendgridMailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendMail(to: string, subject: string, text: string, html: string) {
    const message = {
      from: process.env.SENDGRID_FROM,
      to,
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(message);
    } catch (e) {
      if (e.response) {
        console.log(e.response.body);
      }
    }
  }
}
