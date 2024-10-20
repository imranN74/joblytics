import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { statusCode } from "../index";

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY;

function userAuthorization(req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.headers.authorization;
  try {
    const token = bearerToken?.split(" ")[1];
    if (!token) {
      return res.status(statusCode.notAuthorized).json({
        message: "you not authorized",
      });
    }

    if (!JWT_SECRETE_KEY) {
      throw new Error("JWT secrete key not defined");
    }
    const userVerify = jwt.verify(token, JWT_SECRETE_KEY) as JwtPayload;
    req.userId = userVerify.id;
    next();
  } catch (error) {
    return res.status(statusCode.notAuthorized).json({
      message: "session expired",
    });
  }
}

export default userAuthorization;
