import { Prisma } from "@prisma/client";

export const OptionRepository = {
  createOptions: async (
    options: string[],
    pollId: string,
    transaction: Prisma.TransactionClient
  ) => {
    await transaction.option.createMany({
      data: options.map((text) => ({
        text,
        pollId,
      })),
    });
  },
} as const;
