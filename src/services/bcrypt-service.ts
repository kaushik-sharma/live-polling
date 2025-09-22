import bcrypt from "bcrypt";

import { Constants } from "../constants/constants.js";

export const BcryptService = {
  hash: (plain: string): Promise<string> =>
    bcrypt.hash(plain, Constants.saltRounds),

  compare: (plain: string, hashed: string): Promise<boolean> =>
    bcrypt.compare(plain, hashed),
} as const;
