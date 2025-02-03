import { SendMailType } from '../../sendgrid-mail/sendgrid-mail.service';
import { sendGridHtml } from '../../../utils/functions/send-grid-html';

export function sendGridSuccessfulPasswordResetConfig() {
  const mailConfig: SendMailType = {
    to: 'tuznikolas@gmail.com',
    subject: `Viaproperty: The password was successfully changed!`,
    text: `If you did not send this request, please contact our support team.`,
    html: sendGridHtml(
      `Viaproperty Password Reset`,
      'The password to your Viaproperty Account was updated.',
      `
        <p style="font-size: 14px; margin-bottom: 17px;">If you did not request to change your Viaproperty password, please contact us immediately.</p>
        <p style="font-size: 13px">Thanks for participating in my demo Viaproperty project!</p>
        `,
    ),
  };
  return mailConfig;
}
