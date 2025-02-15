import { SendMailType } from 'src/sendgrid-mail/sendgrid-mail.service';
import { sendGridHtml } from 'utils/functions/send-grid-html';

export function sendGridSuccessfulRegistrationConfig(
  email = `tuznikolas@gmail.com`,
) {
  const mailConfig: SendMailType = {
    to: email,
    subject: `Viaproperty: Your account has been created. Thank you!`,
    text: `Registration is complete. Fantastic!`,
    html: sendGridHtml(
      `Viaproperty registration is complete`,
      '',
      `
        <h2 style="font-size: 20px; margin-bottom: 10px">Thanks a lot for participation!</h2>
        <p style="font-size: 13px">Feel free to test the app in depth! Create a new property advert, like them, add to the wishlist, visit the account settings, try to register multiple accounts, then open multiple clients and reply on property reviews to see web sockets at work! You
         can try to change your advert description, change your user data and a lot more!</p>
        `,
    ),
  };
  return mailConfig;
}
