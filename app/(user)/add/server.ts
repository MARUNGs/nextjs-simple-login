"use server";
import { createTweet } from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z
  .string({
    required_error: "tweet을 작성해주세요.",
  })
  .min(1);

interface TweetSubmitProps {
  success: boolean;
  errors?: {
    tweets?: string[];
  };
}

export async function tweetSubmit(_: TweetSubmitProps, formData: FormData) {
  const tweet = formData.get("tweet");

  const result = formSchema.safeParse(tweet);
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

  // tweet 저장
  const tweetResult = await createTweet(result.data, session.id);
  redirect(`/tweet/${tweetResult.tweet_no}`);
}
