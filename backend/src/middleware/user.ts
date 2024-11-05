import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { statusCode } from "../index";
import { signupInput } from "@imrannazir/joblytics-zod";

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY;

function userAuthorization(req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.headers.authorization;
  try {
    const token = bearerToken?.split(" ")[1];

    if (!JWT_SECRETE_KEY) {
      res.status(statusCode.notFound).json({
        message: "jwt secrete not found",
      });
    }
    if (token && JWT_SECRETE_KEY) {
      const userVerify = jwt.verify(token, JWT_SECRETE_KEY) as {
        userId: string;
      };

      //setting userId to sccesss on different routes and middlewares
      res.locals.userId = userVerify.userId;
      next();
    } else {
      res.status(statusCode.notAuthorized).json({
        message: "you not authorized",
      });
    }
  } catch (error) {
    res.status(statusCode.notAuthorized).json({
      message: "session expired, try after login",
    });
  }
}

export function signUpValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validateData = signupInput.safeParse(req.body);

  //zodValidation
  try {
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
    if (validateData.success) {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(statusCode.badRequest).json({
      message: "something went wrong while signing up",
    });
  }
}

export default userAuthorization;
