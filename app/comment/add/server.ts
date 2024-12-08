"use server";

import { redirect } from "next/navigation";
import { commentSchema } from "./schema";
import getSession from "@/app/lib/session";
import db from "@/app/lib/db";

/**
 * 트윗 댓글 조회
 * @param id 트윗 번호
 * @returns 트윗 댓글 목록
 */
export async function findComments(id: number) {
  const comments = await db.comment.findMany({
    where: { tweetNo: id },
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

  return comments;
}

/**
 * session에 저장된 user_no 호출
 * @returns
 */
export async function getSessionId() {
  const session = await getSession();
  return session.id;
}

/**
 * 댓글 유효성 검사 + 댓글 저장
 * @param formData
 * @returns
 */
export async function commentSubmit(formData: FormData, tweet_no: number) {
  const data = {
    comment: formData.get("comment"),
    tweet_no: formData.get("tweet_no"),
  };
  const result = commentSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: { comment: [`${result.error.flatten().fieldErrors}`] },
    };
  }

  const userId = await getSessionId();
  if (!userId) {
    return {
      success: false,
      errors: { comment: ["로그인이 필요합니다."] },
    };
  }

  // 댓글 저장
  await db.comment.create({
    data: {
      payload: result.data.comment,
      userNo: userId,
      tweetNo: tweet_no,
    },
  });

  redirect(`/tweet/${tweet_no}`);
}
