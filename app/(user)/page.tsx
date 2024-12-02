// 메인화면
import clsx from "clsx";
import { getTweets } from "../lib/db";
import TweetsList from "../components/TweetsList";
import { Prisma } from "@prisma/client";

export type PrismaType = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const tweets = await getTweets(); // 트윗 리스트 가져오기

  return (
    <>
      <div className={`${clsx("flex flex-col justify-center items-center")}`}>
        <TweetsList success={tweets.success} data={tweets.data} />
      </div>
    </>
  );
}
