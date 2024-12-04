import { z } from "zod";

export const formSchema = z.object({
  tweet: z
    .string({
      required_error: "tweet을 작성해주세요.",
    })
    .min(1, { message: "tweet은 1자 이상 작성해주세요." }),
});

// export const formSchema = z
//   .string({
//     required_error: "tweet을 작성해주세요.",
//   })
//   .min(1, { message: "tweet은 1자 이상 작성해주세요." });

export interface TweetSubmitProps {
  success: boolean;
  errors?: {
    tweets?: string[];
  };
}

export interface TweetFormProps {
  tweet: string;
}
