export type CommentListProps = {
  tweetNo: number;
};

export interface IUserProps {
  username: string;
  user_no: number;
  email: string;
  bio: string;
}

export interface ICommentProps {
  created_at: Date;
  updated_at: Date;
  userNo: number;
  tweetNo: number;
  payload: string;
  user: {
    username: string;
    email: string;
    bio: string;
  };
}

export interface UserDetailCardProps {
  user: IUserProps;
  sessionId: number;
  userCommentList: ICommentProps[];
}

export interface UserCommentListProps {
  comments: ICommentProps[]; // comments의 타입을 설정합니다.
}
