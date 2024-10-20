import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { statusCode } from "../index";

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
      console.log(userVerify);
      res.locals.userId = userVerify.userId;
      next();
    } else {
      res.status(statusCode.notAuthorized).json({
        message: "you not authorized",
      });
    }
  } catch (error) {
    res.status(statusCode.notAuthorized).json({
      message: "session expired",
    });
  }
}

export default userAuthorization;
