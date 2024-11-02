export const otpMail = {
  subject: "Confirm Your Joblytics Account with this Verification Code",
  mailBody: `<html>
        <p>Thank you for using Joblytics!</p>

        <p>
          To complete your verification process, please use the following
          One-Time Password <string>{{otp}}</string>:
        </p>

        <h2 style="background-color: #f3f4f6; padding: 10px; text-align: center; border-radius: 4px; color: #0073e6;">
          {{otp}}
        </h2>

        <p>
          This code is valid for the next 10 minutes. Please do not share this
          code with anyone for security purposes.
        </p>

        <p>If you didn’t request this code, please ignore this email.</p>

        <p>Best regards,</p>
        <p>
          <strong>The Joblytics Team</strong>
        </p>
      </body>
    </html>`,
};
