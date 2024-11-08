import { Request, Response, Router } from "express";
import userAuthorization from "../middleware/user";
import { createContacts } from "@imrannazir/joblytics-zod";
import { statusCode } from "..";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

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
        const { name, contact, jobID } = validateData.data;
        await prisma.contacts.create({
          data: {
            jobApplicationId: jobID,
            name: name,
            contact: contact,
          },
        });
        res.status(statusCode.created).json({
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

export default router;
