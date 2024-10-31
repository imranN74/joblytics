import { Router, Request, Response } from "express";
import { statusCode } from "..";
import {
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
} from "@imrannazir/joblytics-zod";
import { PrismaClient } from "@prisma/client";
import userAuthorization from "../middleware/user";
import { updateAppStatus } from "@imrannazir/joblytics-zod";

const prisma = new PrismaClient();
const router = Router();

//get all job application
router.get("/", userAuthorization, async (req: Request, res: Response) => {
  const userid = res.locals.userId;
  try {
    const response = await prisma.jobApplication.findMany({
      where: {
        isActive: true,
        userId: userid,
      },
      select: {
        id: true,
        company: true,
        role: true,
        location: true,
        appliedDate: true,
        appStatus: true,
        appNote: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
    });
    if (response) {
      console.log(response);
      res.status(statusCode.accepted).json({
        response,
        message: "applications fetched",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "error while fetching applications!",
    });
  }
});

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
        return;
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

//update application status
router.post(
  "/status/:id",
  userAuthorization,
  async (req: Request, res: Response) => {
    const appId = req.params.id;
    const validateData = updateAppStatus.safeParse(req.body);
    try {
      if (validateData.error) {
        console.log(validateData.error);
        res.status(statusCode.badRequest).json({
          message: "Error while updating status,Invalid Input",
        });
        return;
      }

      if (validateData.success) {
        const { applicationStatus } = validateData.data;
        await prisma.jobApplication.update({
          data: {
            appStatus: applicationStatus,
          },
          where: {
            id: appId,
          },
        });
        res.status(statusCode.created).json({
          message: "Status updated successfully",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(statusCode.serverError).json({
        message: "Error while updating application status",
      });
    }
  }
);

//delete job application
router.post("/delete/:id", async (req: Request, res: Response) => {
  const validateData = deleteJobApplication.safeParse(req.params.id);

  try {
    if (validateData.error) {
      res.status(statusCode.notFound).json({
        message: "job application doesn't exists",
      });
      return;
    }
    if (validateData.success) {
      const { jobId } = validateData.data;
      await prisma.jobApplication.update({
        data: {
          isActive: false,
        },
        where: {
          id: jobId,
        },
      });
      res.status(statusCode.accepted).json({
        message: "application deleted",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "errro while deleting,try again",
    });
  }
});

//update job application
router.post(
  "/update/:id",
  userAuthorization,
  async (req: Request, res: Response) => {
    const validateData = updateJobApplication.safeParse(req.body);
    const jobId = req.params.id;

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
      return;
    }

    if (validateData.success) {
      const { company, role, appliedDate, applicationStatus } =
        validateData.data;
      const response = await prisma.jobApplication.update({
        data: {
          company: company,
          role: role,
          appliedDate: new Date(appliedDate),
          appStatus: applicationStatus,
        },
        where: {
          id: jobId,
        },
      });
      // console.log(response);
      res.status(statusCode.created).json({
        data: response,
        message: "appliction added",
      });
      return;
    }
  }
);

export default router;
