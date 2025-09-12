import { RequestHandler } from "express";

import { Prisma } from "../generated/prisma/index.js";
import { asyncHandler } from "../helpers/async-handler.js";
import { validateData } from "../helpers/validation-helper.js";
import { successResponseHandler } from "../helpers/success-handler.js";
import { PrismaService } from "../services/prisma-service.js";
import { pollSchema, PollType } from "../validation/poll-schema.js";
import { PollRepository } from "../repositories/poll-repository.js";
import { OptionRepository } from "../repositories/option-repository.js";
import { CustomError } from "../middlewares/error-middlewares.js";
import { PollDto } from "../dtos/poll-dto.js";
import { SocketManager } from "../realtime/socket.js";

export const PollController = {
  validateCreateRequest: ((req, res, next) => {
    req.parsedData = validateData(pollSchema, req.body);
    next();
  }) as RequestHandler,

  createPoll: asyncHandler(async (req, res, next) => {
    const userId = req.user!.userId;
    const parsedData = req.parsedData! as PollType;

    const pollData: Prisma.PollCreateInput = {
      user: { connect: { id: userId } },
      text: parsedData.text,
    };

    const pollId = await PrismaService.client.$transaction<string>(
      async (tx) => {
        const pollId = await PollRepository.createPoll(pollData, tx);
        await OptionRepository.createOptions(parsedData.options, pollId, tx);
        return pollId;
      }
    );

    successResponseHandler({
      res: res,
      status: 200,
      metadata: { message: "Poll creation successful." },
    });
  }),

  getPolls: asyncHandler(async (req, res, next) => {
    const userId = req.user!.userId;

    const polls = await PollRepository.getPolls(userId);

    const pollDtos = polls.map(
      (poll) =>
        new PollDto({
          id: poll.id,
          text: poll.text,
          options: poll.options.map((option) => ({
            id: option.id,
            text: option.text,
            votes: option._count.votes,
          })),
          createdAt: poll.createdAt.toISOString(),
        })
    );

    successResponseHandler({
      res: res,
      status: 200,
      metadata: { message: "Polls retrieval successful." },
      data: pollDtos,
    });
  }),

  castVote: asyncHandler(async (req, res, next) => {
    const userId = req.user!.userId;
    const pollId = req.params.pollId;
    const optionId = req.params.optionId;

    const expectedPollId = await PollRepository.getPollIdByOptionId(optionId);
    if (expectedPollId !== pollId) {
      throw new CustomError(
        400,
        "Option does not belong to the specified poll!"
      );
    }

    await PollRepository.castVote(userId, pollId, optionId);

    const voteCount = await PollRepository.getVoteCount(optionId);

    const payload = {
      pollId,
      optionId,
      voteCount,
    };
    SocketManager.io.to(`poll:${pollId}`).emit("poll_updated", payload);

    successResponseHandler({
      res: res,
      status: 200,
      metadata: { message: "Vote cast successful." },
    });
  }),
};
