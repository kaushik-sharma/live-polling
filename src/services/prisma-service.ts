import { PrismaClient } from "../generated/prisma/index.js";
import logger from "../utils/logger.js";

let _client: PrismaClient;

export const PrismaService = {
  get client(): PrismaClient {
    if (!_client) {
      throw new Error("Supabase not connected. Call connect() first.");
    }
    return _client;
  },
  connect: async () => {
    if (_client) return;

    _client = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL!,
        },
      },
    });
    await _client.$connect();
    logger.info("Connected to Supabase successfully.");
  },
} as const;
