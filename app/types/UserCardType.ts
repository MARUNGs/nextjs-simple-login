export interface UserCardContentProps {
  same: boolean;
  user: {
    user_no: number;
    username: string;
    email: string;
    bio: string;
  };
}

export interface ParamProps {
  params: {
    username: string;
  };
}
