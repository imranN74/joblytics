import { Router, Request, Response } from "express";
import { statusCode } from "..";
import {
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
} from "@imrannazir/joblytics-zod";
import { PrismaClient } from "@prisma/client";
import userAuthorization from "../middleware/user";
import { stat } from "fs";

const prisma = new PrismaClient();
const router = Router();

//create new job application
router.post(
  "/create",
  userAuthorization,
  async (req: Request, res: Response) => {
    const userid = res.locals.userId;
    const validateData = createJobApplication.safeParse(req.body);
    try {
      if (validateData.error) {
        const path = validateData.error.issues[0].path[0];
        if (path === "appliedDate") {
          res.status(statusCode.badRequest).json({
            message: "invalid date format, Expected YYYY-MM-DD",
          });
          return;
        }
        res.status(statusCode.badRequest).json({
          message: "invalid input",
        });
      }

      if (validateData.success) {
        const { company, role, appliedDate, applicationStatus } =
          validateData.data;
        const response = await prisma.jobApplication.create({
          data: {
            company: company,
            role: role,
            appliedDate: new Date(appliedDate),
            appStatus: applicationStatus,
            userId: userid,
          },
        });
        // console.log(response);
        res.status(statusCode.created).json({
          data: response,
          message: "appliction added",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(statusCode.serverError).json({
        message: "something went wrong while adding application",
      });
    }
  }
);

//delete job application
router.post("/delete", (req: Request, res: Response) => {});

//update job application
router.post("/update", (req: Request, res: Response) => {});

export default router;
