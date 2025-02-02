import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as process from 'node:process';

export type SendMailType = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

@Injectable()
export class SendgridMailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendMail(sendMailData: SendMailType) {
    const { to, subject, text, html } = sendMailData;
    const message = {
      from: process.env.SENDGRID_FROM,
      to,
      subject,
      text,
      html,
    };

    try {
      const response = await sgMail.send(message);
      return response[0].statusCode === 202;
    } catch (e) {
      return false;
    }
  }
}
