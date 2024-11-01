import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();

const SENDER_EMAIL = process.env.MAIL_ID;
const MAIL_PASSWORD = process.env.PASSWORD;
console.log(SENDER_EMAIL, "/", MAIL_PASSWORD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_EMAIL,
    pass: MAIL_PASSWORD,
  },
});

async function sendReminderMails(
  userEmail: string,
  subject: string,
  body: string
) {
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
