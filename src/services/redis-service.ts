import Redis from "ioredis";
import RedisStore from "rate-limit-redis";

import logger from "../utils/logger.js";

let _client: Redis;

export const RedisService = {
  get client(): Redis {
    if (!_client) {
      throw new Error("Redis client not initialized. Call initClient() first.");
    }
    return _client;
  },
  initClient: async (): Promise<void> => {
    if (_client) return;

    _client = new Redis({
      host: process.env.REDIS_HOST!,
      port: Number(process.env.REDIS_PORT!),
      username: process.env.REDIS_USERNAME!,
      password: process.env.REDIS_PASSWORD!,
      lazyConnect: true,
      enableReadyCheck: false,
    });
    await _client.connect();
    logger.info("Connected to Redis successfully.");
  },
  hitCountStore: (): RedisStore => {
    return new RedisStore({
      // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
      sendCommand: (...args: string[]) => _client.call(...args),
    });
  },
} as const;
