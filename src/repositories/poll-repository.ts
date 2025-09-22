import { Prisma } from "../generated/prisma";
import { PrismaService } from "../services/prisma-service";

export const PollRepository = {
  createPoll: async (
    pollData: Prisma.PollCreateInput,
    transaction: Prisma.TransactionClient
  ) => {
    const poll = await transaction.poll.create({ data: pollData });
    return poll.id;
  },

  getPollIdByOptionId: async (optionId: string) => {
    const poll = await PrismaService.client.option.findUnique({
      where: { id: optionId },
      select: { pollId: true },
    });
    return poll!.pollId;
  },

  castVote: async (userId: string, pollId: string, optionId: string) => {
    const voteData: Prisma.VoteCreateInput = {
      user: { connect: { id: userId } },
      poll: { connect: { id: pollId } },
      option: { connect: { id: optionId } },
    };

    try {
      await PrismaService.client.vote.create({ data: voteData });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        const existingVote = await PrismaService.client.vote.findUnique({
          where: {
            userId_pollId: { userId, pollId },
          },
          select: { optionId: true },
        });

        // Delete existing vote for that poll
        await PrismaService.client.vote.delete({
          where: {
            userId_pollId: { userId, pollId },
          },
        });

        // Create new poll only if different option selected compared to previous
        if (existingVote!.optionId !== optionId) {
          await PrismaService.client.vote.create({ data: voteData });
        }
      } else {
        throw err;
      }
    }
  },

  getPolls: async (userId: string) => {
    return await PrismaService.client.poll.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        text: true,
        options: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            text: true,
            _count: {
              select: { votes: true },
            },
          },
        },
        createdAt: true,
      },
    });
  },

  getVoteCount: (optionId: string) => {
    return PrismaService.client.vote.count({ where: { optionId } });
  },
} as const;
