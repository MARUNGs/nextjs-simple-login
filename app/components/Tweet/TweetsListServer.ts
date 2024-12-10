"use server";

import { getTweets } from "../../lib/db";

export async function getTweetsPage(page: number) {
  const tweets = await getTweets(page);
  return tweets;
}
