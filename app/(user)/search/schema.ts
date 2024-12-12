import { z } from "zod";

export const inputSchema = z.object({
  keyword: z.string().min(1, { message: "검색어를 입력해주세요." }),
});

export type InputSchema = z.infer<typeof inputSchema>;
