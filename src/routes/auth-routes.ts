import { Router } from "express";

import { AuthController } from "../controllers/auth-controller.js";
import { requireAuth } from "../middlewares/auth-middlewares.js";

export const getAuthRouter = (): Router => {
  const router = Router();

  router.post(
    "/signup",
    AuthController.validateSignUpRequest,
    AuthController.signUp
  );
  router.post(
    "/signin",
    AuthController.validateSignInRequest,
    AuthController.signIn
  );
  router.post(
    "/token/refresh",
    requireAuth,
    AuthController.refreshAuthToken
  );

  return router;
};
