import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  status: z.enum(["Planning", "Active", "Completed"]),
});

export const authSchema = z.object({
  mode: z.enum(["signIn", "signUp"]),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type Project = z.infer<typeof projectSchema>;
export type AuthValues = z.infer<typeof authSchema>;