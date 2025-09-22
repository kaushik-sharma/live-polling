import { Prisma, User } from "../generated/prisma";
import { CustomError } from "../middlewares/error-middlewares";
import { PrismaService } from "../services/prisma-service";

export const UserRepository = {
  createUser: async (
    user: Prisma.UserCreateInput,
    transaction: Prisma.TransactionClient
  ): Promise<string> => {
    try {
      const createdUser = await transaction.user.create({ data: user });
      return createdUser.id;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        throw new CustomError(409, "Email already exists!");
      } else {
        throw err;
      }
    }
  },

  getUserData: async (
    email: string
  ): Promise<Pick<User, "id" | "passwordHash"> | null> => {
    return await PrismaService.client.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });
  },
} as const;
