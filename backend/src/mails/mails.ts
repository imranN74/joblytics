import { PrismaClient } from "@prisma/client";
import { generateOTP } from "otp-agent";
import nodemailer from "nodemailer";
import { otpMail } from "./mailContent";
const prisma = new PrismaClient();

const SENDER_EMAIL = process.env.MAIL_ID;
const MAIL_PASSWORD = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_EMAIL,
    pass: MAIL_PASSWORD,
  },
});

type MailType = {
  userEmail: string;
  subject: string;
  body: string;
};

//reminder emails
async function sendReminderMails({ userEmail, subject, body }: MailType) {
  try {
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: userEmail,
      subject,
      text: body,
    });
    console.log("reminder mail sent successfully");
  } catch (error) {
    console.log("something went wrong while sending reminder mail", error);
  }
}

//OTP verification emails

async function sendOtp(userEmail: string) {
  const OTP = generateOTP({ length: 4, numbers: true });
  const subject = otpMail.subject;
  const mailBody = otpMail.mailBody.replace(/{{otp}}/g, OTP);
  try {
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: userEmail,
      subject,
      html: mailBody,
    });
    console.log("OTP sent successfully");
    return "OTP sent successfully";
  } catch (error) {
    console.log(error);
    return "error while sending OTP,try again";
  }
}

sendOtp("imrannaziransari48@gmail.com");
