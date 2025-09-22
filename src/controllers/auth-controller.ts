import { RequestHandler } from "express";

import { Prisma } from "@prisma/client";
import { asyncHandler } from "../helpers/async-handler.js";
import {
  signInSchema,
  SignInType,
  signUpSchema,
  SignUpType,
} from "../validation/auth-schema.js";
import { validateData } from "../helpers/validation-helper.js";
import { successResponseHandler } from "../helpers/success-handler.js";
import { CustomError } from "../middlewares/error-middlewares.js";
import { JwtService } from "../services/jwt-service.js";
import { BcryptService } from "../services/bcrypt-service.js";
import { PrismaService } from "../services/prisma-service.js";
import { UserRepository } from "../repositories/user-repository.js";

export const AuthController = {
  validateSignUpRequest: ((req, res, next) => {
    req.parsedData = validateData(signUpSchema, req.body);
    next();
  }) as RequestHandler,

  signUp: asyncHandler(async (req, res, next) => {
    const parsedData = req.parsedData! as SignUpType;

    const userData: Prisma.UserCreateInput = {
      name: parsedData.name,
      email: parsedData.email,
      passwordHash: await BcryptService.hash(parsedData.password),
    };

    const authToken = await PrismaService.client.$transaction<string>(
      async (tx) => {
        const userId = await UserRepository.createUser(userData, tx);
        return await JwtService.createAuthToken(userId, tx);
      }
    );

    successResponseHandler({
      res: res,
      status: 200,
      metadata: { message: "User creation successful." },
      data: { authToken },
    });
  }),

  validateSignInRequest: ((req, res, next) => {
    req.parsedData = validateData(signInSchema, req.body);
    next();
  }) as RequestHandler,

  signIn: asyncHandler(async (req, res, next) => {
    const parsedData = req.parsedData! as SignInType;

    const userData = await UserRepository.getUserData(parsedData.email);

    if (!userData) {
      throw new CustomError(404, "Email not found!");
    }

    const isEqual = await BcryptService.compare(
      parsedData.password,
      userData.passwordHash
    );
    if (!isEqual) {
      throw new CustomError(401, "Incorrect password.");
    }

    const authToken = await PrismaService.client.$transaction<string>(
      async (tx) => {
        return await JwtService.createAuthToken(userData.id, tx);
      }
    );

    successResponseHandler({
      res: res,
      status: 200,
      metadata: { message: "Sign-in successful." },
      data: { authToken },
    });
  }),

  refreshAuthToken: asyncHandler(async (req, res, next) => {
    const refreshToken = JwtService.getRefreshToken(req.user!);

    successResponseHandler({
      res: res,
      status: 200,
      metadata: { message: "Refresh token generation successful." },
      data: { refreshToken },
    });
  }),
} as const;
