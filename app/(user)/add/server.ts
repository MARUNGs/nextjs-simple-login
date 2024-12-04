"use server";
import { createTweet } from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { redirect } from "next/navigation";
import { formSchema, TweetSubmitProps } from "./schema";

export async function tweetSubmit(formData: FormData) {
  const data = { tweet: formData.get("tweet") };
  const result = formSchema.safeParse(data);
  let returnErrors: TweetSubmitProps;

  if (!result.success) {
    returnErrors = {
      success: false,
      errors: { tweets: [`${result.error.flatten().fieldErrors}`] },
    };

    return returnErrors;
  }

  // userId 호출
  const session = await getSession();
  if (!session.id) {
    returnErrors = {
      success: false,
      errors: { tweets: ["로그인이 필요합니다."] },
    };

    return returnErrors;
  }

  // tweet 저장 (+나중에 이미지 저장 기능 필요, prisma model 변경 필요함.)
  const tweetResult = await createTweet(result.data.tweet, session.id);
  redirect(`/tweet/${tweetResult.tweet_no}`);
}
