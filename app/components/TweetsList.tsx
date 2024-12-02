// 트윗 리스트 컴포넌트
import clsx from "clsx";
import Tweets from "./Tweets";

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
    </>
  );
}
