interface User {
  username: string;
  email: string;
  bio: string | null;
}

interface TweetResult {
  user: User;
  created_at: Date | string;
  _count: {
    Comment: number;
  };
  tweet_no: number;
}

export interface TweetContentProps {
  tweetNo: number;
  tweet: string;
  result: TweetResult;
  likeCount: number;
  isLiked: boolean;
}
