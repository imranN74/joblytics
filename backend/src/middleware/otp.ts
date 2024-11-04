import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { statusCode } from "..";

const prisma = new PrismaClient();

async function verifyOtp(req: Request, res: Response, next: NextFunction) {
  const { otp, email } = req.body;
  try {
    const response = await prisma.otp.findFirst({
      where: {
        email: email,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (response) {
      const isOtpMatch = await bcrypt.compare(otp, response.otp);
      if (!isOtpMatch) {
        res.status(statusCode.forbidden).json({
          message: "invalid OTP",
        });
      } else {
        next();
      }
    } else {
      res.status(statusCode.badRequest).json({
        message: "invalid OTP",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "something went wrong",
    });
  }
}

export default verifyOtp;
