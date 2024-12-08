import { z } from "zod";

export const commentSchema = z.object({
  comment: z
    .string({
      required_error: "댓글은 필수입력입니다.",
    })
    .min(1, { message: "댓글은 1글자 이상이어야 합니다." }),
});

export interface CommentFormProps {
  comment: string;
}
