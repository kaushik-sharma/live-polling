import { Duration } from "luxon";
import { $enum } from "ts-enum-util";

import { Env } from "./enums.js";

export const Constants = {
  get env(): Env {
    return $enum(Env).asValueOrThrow(process.env.ENV!);
  },

  // BCrypt
  saltRounds: 12,

  // Auth Tokens
  authTokenExpiryDurationInSec: Duration.fromObject({
    days: 30,
  }).as("seconds"),
  sessionCacheExpiryDurationInSec: Duration.fromObject({
    days: 7,
  }).as("seconds"),

  // Polls
  pollOptionsCount: 4,

  // Rate Limiter
  defaultRateLimiterWindowMs: Duration.fromObject({
    minutes: 5,
  }).as("milliseconds"),
  defaultRateLimiterMax: 100,
} as const;
