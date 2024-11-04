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

export const reminderMail = {
  subject: "Reminder: It's Time to Follow Up on Your Application",
  mailBody: `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Follow Up Reminder</title>
</head>
<body>
    <h1>Reminder: Follow Up on Your Job Application</h1>
    <p>Hi {{userName}},</p>
    <p>We hope you're doing well! It’s been 5 days since you applied for the <strong>{{role}}</strong> position at <strong>{{company}}</strong>.</p>
    <p>This is a friendly reminder to consider following up with HR or management regarding your application status. A simple follow-up can show your enthusiasm for the role.</p>
    <p>Best of luck!</p>
    <p>Best regards,<br>
    The Joblytics Team</p>
    <p style="font-size: 12px; color: #888;">You are receiving this email because you signed up for Joblytics. If you would like to disable these reminder emails, please go to {{Joblytics}} and adjust your settings.</p>
</body>
</html>`,
};
