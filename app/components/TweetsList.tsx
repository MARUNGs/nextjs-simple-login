// 트윗 리스트 컴포넌트
"use client";
import clsx from "clsx";
import Tweets from "./Tweets";
import Button from "./Button";
import { getTweets } from "../lib/db";
import { useEffect, useRef, useState } from "react";
import { getTweetsPage } from "./TweetsListServer";

export interface ITweetType {
  tweet: string;
  tweet_no: number;
  created_at: Date;
  user: {
    username: string;
    email: string;
    bio: string;
  };
  Like: {
    user: {
      username: string;
    };
  }[];
}

interface IProps {
  success: boolean;
  data: ITweetType[];
}

export default async function TweetsList({ success, data }: IProps) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(0);
  const tweets = await getTweetsPage(0);

  // 무한스크롤 트리거 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {}
    );
  }, [page]);

  return (
    <>
      {success && (
        <div
          className={`${clsx(
            "sm:w-[620px]",
            "md:w-[768px]",
            "lg:w-[1024px]",
            "xl:w-[1024px]",
            "dark:text-white",
            "w-screen"
          )}`}
        >
          {data.map((tweet) => (
            <Tweets key={tweet.tweet_no} {...tweet} />
          ))}
        </div>
      )}

      <Button ref={trigger} text="Load more" />
    </>
  );
}
