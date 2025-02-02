import { SendMailType } from '../../../sendgrid-mail/sendgrid-mail.service';
import { sendGridHtml } from '../../../../utils/functions/send-grid-html';

export function getChangePasswordTokenMailConfig(token: string) {
  const mailConfig: SendMailType = {
    to: 'tuznikolas@gmail.com',
    subject: `Viaproperty: Request to change your Viaproperty password`,
    text: `If you did not send this request, you can just ignore the message.`,
    html: sendGridHtml(
      `Your verification code to change password`,
      'Please enter the token below to confirm your identity.',
      `
        <p style="font-size: 14px; margin-bottom: 17px;">If you did not request to change your Viaproperty password, please change your password immediately.</p>
        <h2 style="font-size: 20px; margin-bottom: 10px">Your verification token: <span style="font-weight: 600" ">${token}</span></h2>
        <p style="font-size: 13px">The token would expire in 10 minutes. Be hasty to enter the token and submit your new password.</p>
        `,
    ),
  };
  return mailConfig;
}
