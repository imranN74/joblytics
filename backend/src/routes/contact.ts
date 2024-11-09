import { Request, Response, Router } from "express";
import userAuthorization from "../middleware/user";
import { createContacts } from "@imrannazir/joblytics-zod";
import { statusCode } from "..";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//to create contact
router.post(
  "/create",
  userAuthorization,
  async (req: Request, res: Response) => {
    const validateData = createContacts.safeParse(req.body);

    try {
      if (validateData.error) {
        res.status(statusCode.badRequest).json({
          message: "invalid data",
        });
      }
      if (validateData.success) {
        const { name, contact, jobId } = validateData.data;
        const response = await prisma.contacts.create({
          data: {
            jobApplicationId: jobId,
            name: name,
            contact: contact,
          },
        });
        res.status(statusCode.created).json({
          response,
          message: "contact added successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(statusCode.serverError).json({
        message: "error while adding contact",
      });
    }
  }
);

//to delete contact
router.post(
  "/delete/:id",
  userAuthorization,
  async (req: Request, res: Response) => {
    const contactId = req.params.id;
    try {
      await prisma.contacts.update({
        where: {
          id: contactId,
        },
        data: {
          isActive: false,
        },
      });
      res.status(statusCode.accepted).json({
        message: "contact deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(statusCode.serverError).json({
        message: "error while deleting contact",
      });
    }
  }
);

//to get all contacts of a job application
router.get("/:id", userAuthorization, async (req: Request, res: Response) => {
  const jobId = req.params.id;
  try {
    const response = await prisma.contacts.findMany({
      where: {
        jobApplicationId: jobId,
        isActive: true,
      },
    });

    res.status(statusCode.accepted).json({
      message: "contacts fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "error while fetching contacts",
    });
  }
});

export default router;
