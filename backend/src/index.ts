import express, { Application, Request, Response } from "express";
import userRouter from "./routes/user";
import jobRouter from "./routes/jobapp";
import contactrouter from "./routes/contact";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(express.json());
app.use(cors());

export const statusCode = {
  notFound: 404,
  notAuthorized: 401,
  forbidden: 403,
  badRequest: 400,
  serverError: 500,
  success: 200,
  created: 201,
  accepted: 202,
} as const;

app.get("/", (req: Request, res: Response) => {
  res.send("server started");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/contact", contactrouter);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
