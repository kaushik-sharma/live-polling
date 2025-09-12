import { Router } from "express";

import { requireAuth } from "../middlewares/auth-middlewares.js";
import { PollController } from "../controllers/poll-controller.js";

export const getPollRouter = (): Router => {
  const router = Router();

  router.post(
    "/:pollId/options/:optionId/votes",
    requireAuth,
    PollController.castVote
  );

  router.post(
    "/",
    requireAuth,
    PollController.validateCreateRequest,
    PollController.createPoll
  );
  router.get("/", requireAuth, PollController.getPolls);

  return router;
};
