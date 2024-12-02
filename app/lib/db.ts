import { PrismaClient } from "@prisma/client";
import { ILoginForm } from "../types/login";
import { ITweetType } from "../components/TweetsList";

const db = new PrismaClient(); // client 생성

/**
 * [회원가입] 이메일 중복 체크
 * @param email
 */
export async function findEmail(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { user_no: true, email: true, password: true },
  });

  const result = {
    // 결과 생성
    success: Boolean(user) ? true : false,
    data: Boolean(user) ? user : undefined,
  };

  return result;
}

/**
 * [회원가입] 사용자명 중복 체크
 * @param username
 * @returns
 */
export async function findUsername(username: string) {
  const user = await db.user.findUnique({
    where: { username },
    select: { user_no: true },
  });

  const result = {
    success: Boolean(user),
    data: user,
  };

  return result;
}

/**
 * [회원가입] 유저 정보 저장
 * @param data
 * @returns
 */
export async function createUser({ email, username, password }: ILoginForm) {
  const data = {
    email,
    username,
    password,
    bio: "",
  };

  const user = await db.user.create({
    data,
    select: { user_no: true },
  });

  const result = {
    success: Boolean(user),
    data: user,
  };

  return result;
}

/**
 * [로그인] 비밀번호 조회
 * @param email
 * @returns
 */
export async function findPassword(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { password: true },
  });

  const result = {
    success: true,
    data: user.password,
  };

  return result;
}

/**
 * 사용자 조회
 * @param id
 * @returns
 */
export async function findUser(id: number) {
  const user = await db.user.findUnique({
    where: { user_no: id },
    select: { user_no: true, username: true, email: true },
  });

  const result = {
    success: Boolean(user),
    data: user,
  };

  return result;
}

/**
 * 트윗 리스트 조회 (초기 조회)
 */
export async function getTweetsInit() {
  const tweets = await db.tweet.findMany({
    select: {
      tweet_no: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
          email: true,
          bio: true,
        },
      },
      Like: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });

  const result = {
    success: Boolean(tweets),
    data: tweets,
  };

  return result;
}

/**
 * 트윗 리스트 조회 (페이지네이션)
 * @param page
 * @returns
 */
export async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet_no: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
          email: true,
          bio: true,
        },
      },
      Like: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    skip: page * 3,
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

/**
 * 트윗 조회
 * @param id
 * @returns
 */
export async function findTweet(id: number): Promise<ITweetType> {
  const tweet = await db.tweet.findUnique({
    where: { tweet_no: id },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          bio: true,
        },
      },
      Like: {
        select: {
          user: {
            select: {
              username: true,
              user_no: true,
            },
          },
        },
      },
    },
  });

  return tweet;
}

export default db;
