const verifyEmailTemplate = ({ name, url }) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <!-- Header -->
      <tr>
        <td style="padding: 30px 20px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: #333333;">Welcome to Binkeyit!</h1>
        </td>
      </tr>
      <!-- Content -->
      <tr>
        <td style="padding: 20px 30px; font-size: 16px; line-height: 1.6; color: #555555;">
          <p style="margin: 0 0 15px;">Dear ${name},</p>
          <p style="margin: 0 0 15px;">Thank you for registering with Binkeyit! We're excited to have you on board.</p>
          <p style="margin: 0 0 25px;">To get started, please verify your email address by clicking the button below:</p>
          <!-- Button -->
          <p style="text-align: center; margin: 0 0 25px;">
            <a href="${url}" style="display: inline-block; padding: 12px 24px; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #ff6200; text-decoration: none; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Verify Email</a>
          </p>
          <p style="margin: 0 0 15px;">If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="margin: 0; word-break: break-all;"><a href="${url}" style="color: #ff6200; text-decoration: underline;">${url}</a></p>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="padding: 20px 30px; font-size: 14px; color: #777777; text-align: center; border-top: 1px solid #eeeeee;">
          <p style="margin: 0 0 10px;">This email was sent by Binkeyit. If you didn't register, please ignore this email.</p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Binkeyit. All rights reserved.</p>
        </td>
      </tr>
    </table>
    <!-- Mobile Styles -->
    <style>
      @media only screen and (max-width: 600px) {
        table {
          width: 100% !important;
          margin: 20px auto !important;
        }
        td {
          padding: 15px !important;
        }
        h1 {
          font-size: 20px !important;
        }
        a[href] {
          padding: 10px 20px !important;
          font-size: 14px !important;
        }
      }
    </style>
  </body>
  </html>
    `;
  };
  
  export default verifyEmailTemplate;