import bcrypt from "bcrypt";

export const BcryptService = {
  hash: (plain: string): Promise<string> => {
    const saltRounds = 12;
    return bcrypt.hash(plain, saltRounds);
  },
  compare: (plain: string, hashed: string): Promise<boolean> =>
    bcrypt.compare(plain, hashed),
} as const;
