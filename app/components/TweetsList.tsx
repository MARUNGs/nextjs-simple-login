// 트윗 리스트 컴포넌트
"use client";
import clsx from "clsx";
import Tweets from "./Tweets";

import { useEffect, useRef, useState } from "react";
import { getTweetsPage } from "./TweetsListServer";
import Button from "./Button";
import AddTweet from "./AddTweet";

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

export default function TweetsList({ success, data }: IProps) {
  const [tweets, setTweets] = useState<ITweetType[]>(data);
  const trigger = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  // 무한스크롤 트리거 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const { isIntersecting } = entries[0];

        if (isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setLoading(true);
          const resultList = await getTweetsPage(page + 1);

          if (resultList.length !== 0) {
            setPage((prev) => prev + 1);
            setTweets((prev) => [...prev, ...resultList]);
            setLoading(false);
          } else {
            setLastPage(true);
          }
        }
      },
      {
        threshold: 1.0,
      }
    );

    // 트리거 감지 시작
    if (trigger.current) {
      observer.observe(trigger.current);
    }

    // cleanup 수행
    return () => {
      observer.disconnect();
    };
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
          {tweets.map((tweet) => (
            <Tweets key={tweet.tweet_no} {...tweet} />
          ))}
        </div>
      )}

      <AddTweet />

      {!lastPage ? (
        <Button
          ref={trigger}
          text={`${loading ? "Loading ..." : "Lead more"}`}
        />
      ) : null}
    </>
  );
}
