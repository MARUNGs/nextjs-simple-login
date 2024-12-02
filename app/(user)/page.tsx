// 메인화면
import clsx from "clsx";
import { getTweets } from "../lib/db";
import Tweets from "../components/TweetsList";
import { Prisma } from "@prisma/client";

export type PrismaType = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  // 트윗 리스트 가져오기
  const tweets = await getTweets();

  return (
    <>
      <div
        className={`${clsx(
          "flex justify-center items-center",
          "w-screen h-screen",
          "border-solid border-x-4"
        )}`}
      >
        {tweets.success ? (
          <Tweets tweets={tweets.data} />
        ) : (
          <div>데이터 조회 과정에서 오류가 발생했습니다.</div>
        )}
      </div>
    </>
  );
}
