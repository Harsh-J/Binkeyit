const forgotPasswordTemplate = ({ name, otp }) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <!-- Header -->
      <tr>
        <td style="padding: 30px 20px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: #333333;">Binkeyit Password Reset</h1>
        </td>
      </tr>
      <!-- Content -->
      <tr>
        <td style="padding: 20px 30px; font-size: 16px; line-height: 1.6; color: #555555;">
          <p style="margin: 0 0 15px;">Dear ${name},</p>
          <p style="margin: 0 0 15px;">You have requested a password reset for your Binkeyit account. Please use the following OTP code to reset your password:</p>
          <!-- OTP Box -->
          <div style="background-color: #fff3e0; border: 1px solid #ff6200; border-radius: 5px; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; color: #ff6200; margin: 20px 0;">
            ${otp}
          </div>
          <p style="margin: 0 0 15px;">This OTP is valid for <strong>1 hour</strong>. Please enter it on the Binkeyit website to proceed with resetting your password.</p>
          <p style="margin: 0 0 15px;">If you did not request a password reset, please ignore this email or contact our support team.</p>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="padding: 20px 30px; font-size: 14px; color: #777777; text-align: center; border-top: 1px solid #eeeeee;">
          <p style="margin: 0 0 10px;">Thank you,<br>The Binkeyit Team</p>
          <p style="margin: 0 0 10px;">If you need assistance, contact us at <a href="mailto:support@binkeyit.com" style="color: #ff6200; text-decoration: none;">support@binkeyit.com</a>.</p>
          <p style="margin: 0;">© ${new Date().getFullYear()} Binkeyit. All rights reserved.</p>
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
        div[style*="font-size: 24px"] {
          font-size: 20px !important;
          padding: 10px !important;
        }
      }
    </style>
  </body>
  </html>
    `;
  };
  
  export default forgotPasswordTemplate;