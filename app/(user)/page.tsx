// 메인화면
import clsx from "clsx";
import { getTweetsInit } from "../lib/db";
import TweetsList from "../components/Tweet/TweetsList";
import { Prisma } from "@prisma/client";

export type PrismaType = Prisma.PromiseReturnType<typeof getTweetsInit>;

// loading 화면 주석처리
// async function TweetsLoading() {
//   return new Promise((resolve) => setTimeout(resolve, 10000));
// }

export default async function Home() {
  // await TweetsLoading();
  const tweets = await getTweetsInit(); // 트윗 리스트 가져오기

  return (
    <>
      <div className={`${clsx("flex flex-col justify-center items-center")}`}>
        <TweetsList success={tweets.success} data={tweets.data} />
      </div>
    </>
  );
}
