import { z } from "zod";

export const formSchema = z
  .string({
    required_error: "tweet을 작성해주세요.",
  })
  .min(1);

export interface TweetSubmitProps {
  success: boolean;
  errors?: {
    tweets?: string[];
  };
}

export interface TweetFormProps {
  tweet: string;
  file: File;
}
