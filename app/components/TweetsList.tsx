// 트윗 리스트 컴포넌트
import clsx from "clsx";

interface ITweetType {
  tweet: string;
  tweet_no: number;
  created_at: Date;
  user: {
    username: string;
  };
  Like: {
    user: {
      username: string;
    };
  }[];
}

export default function Tweets({ tweets }: { tweets: ITweetType[] }) {
  return (
    <div className={`${clsx("dark:text-white")}`}>
      {tweets.map((tweet) => (
        <div key={tweet.tweet_no}>
          {tweet.user.username} {tweet.tweet}
        </div>
      ))}
    </div>
  );
}
