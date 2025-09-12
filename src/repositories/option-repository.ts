import { Prisma } from "../generated/prisma";

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
};
