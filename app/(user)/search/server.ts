"use server";

import db from "@/app/lib/db";

/**
 * 트윗의 키워드 검색
 * @param keyword
 * @returns
 */
export async function searchTweets(formData: FormData) {
  const keyword = formData.get("keyword") as string;

  const result = await db.tweet.findMany({
    where: {
      tweet: {
        contains: keyword,
      },
    },
    include: {
      user: {
        select: {
          username: true,
          bio: true,
          email: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return result;
}

/**
 * 사용자 리스트 조회
 * @param formData
 * @returns
 */
export async function searchUsers(formData: FormData) {
  const keyword = formData.get("keyword") as string;

  const users = await db.user.findMany({
    where: {
      username: {
        contains: keyword,
      },
    },
  });

  console.log(users);
  return users;
}
