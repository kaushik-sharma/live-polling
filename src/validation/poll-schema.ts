import { z } from "zod";
import { Constants } from "../constants/constants";

export const pollSchema = z.object({
  text: z
    .string({ error: "Text is required." })
    .trim()
    .nonempty({ message: "Text must not be empty." })
    .max(500),
  options: z
    .array(
      z
        .string()
        .trim()
        .nonempty({ message: "Option must not be empty." })
        .max(100, { message: "Option must be at most 100 characters." })
    )
    .min(Constants.pollOptionsCount, {
      message: `${Constants.pollOptionsCount} options are required.`,
    })
    .max(Constants.pollOptionsCount, {
      message: `${Constants.pollOptionsCount} options are required.`,
    }),
});

export type PollType = z.infer<typeof pollSchema>;
