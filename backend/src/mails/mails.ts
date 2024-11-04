import { PrismaClient } from "@prisma/client";
import { generateOTP } from "otp-agent";
import nodemailer from "nodemailer";
import { otpMail } from "./mailContent";
const prisma = new PrismaClient();
import cron from "node-cron";
import { reminderMail } from "./mailContent";

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
export async function sendReminderMails({
  userEmail,
  subject,
  body,
}: MailType) {
  try {
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: userEmail,
      subject,
      html: body,
    });
    console.log("reminder mail sent successfully");
  } catch (error) {
    console.log("something went wrong while sending reminder mail", error);
  }
}

cron.schedule("0 8 * * *", async () => {
  const response = await prisma.mail.findMany({
    where: {
      isActive: true,
    },
    include: {
      User: {
        select: {
          name: true,
          email: true,
        },
      },
      JobApplication: {
        select: {
          company: true,
          role: true,
        },
      },
    },
  });

  response.forEach((element) => {
    const currDate = new Date(Date.now());
    const reminderDate = new Date(element.lastRemindedDate);
    const daysPassed = Math.floor(
      (+currDate - +reminderDate) / (1000 * 60 * 60 * 24)
    );
    const bodyContent = reminderMail.mailBody
      .replace("{{userName}}", element.User.name)
      .replace("{{company}}", element.JobApplication?.company ?? "{****}")
      .replace("{{role}}", element.JobApplication?.role ?? "{****}")
      .replace("{{Joblytics}}", "http://localhost:5173/applications");
    if (daysPassed >= 5) {
      sendReminderMails({
        userEmail: element.User.email,
        subject: reminderMail.subject,
        body: bodyContent,
      });
    }
  });
});

//OTP verification emails
export async function sendOtp(userEmail: string) {
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

    return OTP;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
