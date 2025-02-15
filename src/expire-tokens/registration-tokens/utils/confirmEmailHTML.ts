import { SendMailType } from '../../../sendgrid-mail/sendgrid-mail.service';
import { sendGridHtml } from '../../../../utils/functions/send-grid-html';

export function confirmRegistrationHTML(token: string, email: string) {
  const mailConfig: SendMailType = {
    to: email,
    subject: `Viaproperty: Registration Confirmation`,
    text: `If you did not send this request, you can just ignore the message.`,
    html: sendGridHtml(
      `Your verification code to register a Viaproperty Account`,
      'Please enter the token below to confirm your identity.',
      `
        <p style="font-size: 14px; margin-bottom: 17px;">If you did not request to create a Viaproperty Account, seems that someone
         entered your email trying to test my PET project :D</p>
        <h2 style="font-size: 20px; margin-bottom: 10px">Your verification token: <span style="font-weight: 600" ">${token}</span></h2>
        <p style="font-size: 13px">The token would expire in 10 minutes. Be hasty to enter the token and submit your new password.</p>
        `,
    ),
  };
  return mailConfig;
}
