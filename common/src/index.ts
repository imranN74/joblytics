import z from "zod";

export const signupInput = z.object({
  name: z.string(),
  email: z.string().email(),
  profile: z.string(),
  password: z.string().min(6),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserInput = z.object({
  name: z.string(),
  profile: z.string().optional(),
});

export const updateUserPassword = z.object({
  password: z.string().min(6),
});

export const createJobApplication = z.object({
  company: z.string(),
  role: z.string().optional(),
  appliedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  applicationStatus: z.string(),
  appStatus: z.string().optional(),
});

export const deleteJobApplication = z.object({
  jobId: z.string(),
});

export const updateJobApplication = z.object({
  company: z.string(),
  role: z.string().optional(),
  appliedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  applicationStatus: z.string(),
});

//user
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type UpdateUser = z.infer<typeof updateUserInput>;
export type UpdatePassword = z.infer<typeof updateUserPassword>;

//jobAplication
export type UpdateApplication = z.infer<typeof updateJobApplication>;
export type DeleteApplication = z.infer<typeof deleteJobApplication>;
export type CreateApplication = z.infer<typeof createJobApplication>;
