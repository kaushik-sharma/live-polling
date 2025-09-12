import { z } from "zod";

const nameValidation = z
  .string({ error: "First name is required." })
  .trim()
  .nonempty({ message: "First name must not be empty." })
  .max(50);

const emailValidation = z
  .email({ error: "Email is invalid." })
  .trim()
  .nonempty({ message: "Email must not be empty." })
  .transform((value) => value.toLowerCase());

const passwordValidation = z
  .string({ error: "Password is required." })
  .trim()
  .nonempty({ message: "Password must not be empty." })
  .min(8, { message: "Password must be at least 8 characters." })
  .max(12, { message: "Password must be at most 12 characters." });

export const signUpSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export type SignUpType = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export type SignInType = z.infer<typeof signInSchema>;
