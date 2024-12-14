import { PrismaClient } from "@prisma/client";
import { ILoginForm } from "../types/login";
import { boolean } from "zod";

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
export async function findTweet(id: number) {
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
      _count: {
        select: {
          Like: true,
          Comment: true,
        },
      },
    },
  });

  return tweet;
}

/**
 * Tweet 저장
 * @param tweet
 * @param user_no
 * @returns
 */
export async function createTweet(tweet: string, user_no: number) {
  const result = await db.tweet.create({
    data: {
      tweet: tweet,
      user: { connect: { user_no } },
    },
    select: {
      tweet_no: true,
    },
  });

  return result;
}

/**
 * 트윗의 좋아요 조회
 * @param tweetNo
 * @param userId
 * @returns
 */
export async function findTweetLikeStatus(tweetNo: number, userId: number) {
  const like = await db.like.findUnique({
    where: {
      id: {
        userNo: userId,
        tweetNo,
      },
    },
  });

  const likeCount = await db.like.count({
    where: { tweetNo },
  });

  return {
    likeCount,
    isLiked: Boolean(like),
  };
}

/**
 * 트윗의 좋아요 삭제
 * @param tweetNo
 * @param userId
 */
export async function removeLikeTweet(tweetNo: number, userId: number) {
  try {
    await db.like.delete({
      where: {
        id: {
          tweetNo,
          userNo: userId,
        },
      },
    });
  } catch (e) {
    console.log("-- 좋아요 삭제 오류 --", e);
  }
}

/**
 * 트윗의 좋아요 추가
 * @param tweetNo
 * @param userId
 */
export async function addLikeTweet(tweetNo: number, userId: number) {
  try {
    await db.like.create({
      data: {
        tweetNo,
        userNo: userId,
      },
    });
  } catch (e) {
    console.log("-- 좋아요 추가 오류 --", e);
  }
}

/**
 * [수정] 사용자 조회
 * @param id
 * @returns
 */
export async function findUserInfo(username: string) {
  const user = await db.user.findUnique({
    where: { username },
    select: { user_no: true, username: true, email: true, bio: true },
  });

  return user;
}

/**
 * [수정] 이메일이 유니크한지 찾기
 */
export async function findEmailUnique(email: string, user_no: number) {
  const user = await db.user.findUnique({
    where: { user_no, email },
  });

  return {
    success: Boolean(user),
    data: user,
  };
}

/**
 * [수정] 사용자명이 유니크한지 찾기
 * @param username
 * @param user_no
 */
export async function findUsernameUnique(username: string, user_no: number) {
  const user = await db.user.findUnique({
    where: { user_no, username },
  });

  return {
    success: Boolean(user),
    data: user,
  };
}

/**
 * [수정] DB에서 입력한 이메일을 보유한 유저를 찾는다.
 * @param email
 * @returns
 */
export async function fineUserPassword(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { user_no: true, password: true },
  });

  return user;
}

interface IProps {
  user_no: number;
  email: string;
  username: string;
  bio: string;
  password: string;
}
export async function editUser({
  user_no,
  email,
  username,
  bio,
  password,
}: IProps) {
  try {
    const updateUser = await db.user.update({
      where: { user_no },
      data: {
        email,
        username,
        bio,
        password,
      },
    });

    return {
      success: Boolean(updateUser),
      data: updateUser,
    };
  } catch (e) {
    console.log(`edit error :: ${e}`);
    return {
      success: false,
      data: null,
    };
  }
}

export default db;
