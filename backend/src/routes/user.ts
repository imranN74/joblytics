import { Router, Request, Response } from "express";
import { statusCode } from "..";
import { PrismaClient } from "@prisma/client";
import {
  signupInput,
  signinInput,
  updateUserInput,
} from "@imrannazir/joblytics-zod";
import jwt from "jsonwebtoken";
import userAuthorization from "../middleware/user";
import bcrypt from "bcrypt";
import { sendOtp } from "../mails/mails";
import verifyOtp from "../middleware/otp";

const JWT_SECRETE = process.env.JWT_SECRETE_KEY;
const router = Router();
const prisma = new PrismaClient();

//user signup route
router.post("/signup", verifyOtp, async (req: Request, res: Response) => {
  const validateData = signupInput.safeParse(req.body);

  try {
    //zodValidation
    if (validateData.error) {
      const path = validateData.error.issues[0].path[0];
      if (path === "email") {
        res.status(statusCode.badRequest).json({
          message: "invalid email",
        });
        return;
      } else if (path === "password") {
        res.status(statusCode.badRequest).json({
          message: "password must be of atleast 6 characters",
        });
        return;
      } else {
        res.status(statusCode.badRequest).json({
          message: "invalid inputs",
        });
        return;
      }
    }

    //validation success
    if (validateData.success) {
      const { name, email, password, profile } = validateData.data;
      const isEmailExists = await prisma.user.findFirst({
        where: {
          email: email,
          isActive: true,
        },
      });
      if (isEmailExists) {
        res.status(statusCode.forbidden).json({
          message: "email already exists",
        });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          profile: profile,
        },
      });

      //jwt token genration
      if (JWT_SECRETE) {
        const token = jwt.sign({ userId: response.id }, JWT_SECRETE);
        res.status(statusCode.created).json({
          token,
        });
        return;
      } else {
        res.status(statusCode.notFound).json("jwt_secrete not found");
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "something went wrong while signing up",
    });
  }
});

//user signin route
router.post("/signin", async (req: Request, res: Response) => {
  const validateData = signinInput.safeParse(req.body);

  try {
    if (validateData.error) {
      const path = validateData.error.issues[0].path[0];
      if (path === "email") {
        res.status(statusCode.badRequest).json({
          message: "invalid email",
        });
        return;
      }
    }
    //validation success
    if (validateData.success) {
      const { email, password } = validateData.data;
      const response = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (response) {
        const isPasswordMatch = await bcrypt.compare(
          password,
          response.password
        );
        if (!isPasswordMatch) {
          res.status(statusCode.forbidden).json({
            message: "password is incorrect",
          });
          return;
        } else {
          if (JWT_SECRETE) {
            const token = jwt.sign({ userId: response.id }, JWT_SECRETE);
            res.status(statusCode.success).json({
              response,
              token,
            });
          } else {
            res
              .status(statusCode.serverError)
              .json("Jwt secrete key undefined");
          }
          return;
        }
      } else {
        res.status(statusCode.forbidden).json({
          message: "incorrect email, please signup first",
        });
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "something went wrong while signing in",
    });
  }
});

//update user userinfo
router.post(
  "/update",
  userAuthorization,
  async (req: Request, res: Response) => {
    const validatData = updateUserInput.safeParse(req.body);
    const userid = res.locals.userId;
    try {
      if (validatData.error) {
        res.status(statusCode.badRequest).json({
          message: "invalid input",
        });
        return;
      }
      if (validatData.success) {
        const { name, profile } = validatData.data;
        await prisma.user.update({
          data: {
            name: name,
            profile: profile,
          },
          where: {
            id: userid,
          },
        });
        res.status(statusCode.accepted).json({
          message: "data updated",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(statusCode.serverError).json({
        message: "something went wrong while updating data",
      });
    }
  }
);

//otp verification
router.post("/otp", async (req: Request, res: Response) => {
  const userEmail = req.body.email;
  try {
    const otp = await sendOtp(userEmail);
    const hashedOtp = await bcrypt.hash(otp, 10);
    await prisma.otp.create({
      data: {
        email: userEmail,
        otp: hashedOtp,
        expirationTime: new Date(Date.now() + 60 * 10 * 1000),
      },
    });
    res.status(statusCode.success).json("OTP sent successfully");
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "something went wrong,please check your email",
    });
  }
});

export default router;
