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
      },
      orderBy: [{ createdAt: "desc" }],
    });
    if (response) {
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

        //create mail reminder if application status is applied
        if (applicationStatus === "applied") {
          await prisma.mail.create({
            data: {
              jobApplicationId: response.id,
              userId: userid,
              lastRemindedDate: new Date(appliedDate),
            },
          });
        } else {
          await prisma.mail.create({
            data: {
              jobApplicationId: response.id,
              userId: userid,
              isActive: false,
              lastRemindedDate: new Date(appliedDate),
            },
          });
        }

        //response
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

        //mail status update based on application status... send reminder mail if applied otherwise dont send
        if (applicationStatus === "applied") {
          await prisma.mail.updateMany({
            data: {
              isActive: true,
            },
            where: {
              jobApplicationId: appId,
            },
          });
        } else {
          await prisma.mail.updateMany({
            data: {
              isActive: false,
            },
            where: {
              jobApplicationId: appId,
            },
          });
        }

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
router.post(
  "/delete/:id",
  userAuthorization,
  async (req: Request, res: Response) => {
    const validateData = deleteJobApplication.safeParse(req.params.id);

    try {
      if (validateData.error) {
        console.log(validateData.error);
        res.status(statusCode.notFound).json({
          message: "error while deleting the application, try again",
        });
        return;
      }
      if (validateData.success) {
        const jobId = validateData.data;
        await prisma.jobApplication.update({
          data: {
            isActive: false,
          },
          where: {
            id: jobId,
          },
        });

        //making reminder mail inactive on application delete
        await prisma.mail.updateMany({
          data: {
            isActive: false,
          },
          where: {
            jobApplicationId: jobId,
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
  }
);

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
        message: "appliction updated successfully",
      });
      return;
    }
  }
);

router.get(
  "/application/:id",
  userAuthorization,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const response = await prisma.jobApplication.findFirst({
        where: {
          id: id,
          isActive: true,
        },
        select: {
          id: true,
          company: true,
          role: true,
          location: true,
          appliedDate: true,
          appStatus: true,
          appNote: true,
        },
      });

      res.status(statusCode.accepted).json({
        response,
      });
    } catch (error) {
      console.log(error);
      res.status(statusCode.serverError).json({
        message: "something went wrong",
      });
    }
  }
);

export default router;
