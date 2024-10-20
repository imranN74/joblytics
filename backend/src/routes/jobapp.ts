import { Router, Request, Response } from "express";
import { statusCode } from "..";

const router = Router();

//create new job application
router.post("/create", (req: Request, res: Response) => {
  res.send("job create route");
});

//delete job application
router.post("/delete", (req: Request, res: Response) => {});

//update job application
router.post("/update", (req: Request, res: Response) => {});

export default router;
