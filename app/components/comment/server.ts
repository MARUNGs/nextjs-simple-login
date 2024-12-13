"use server";

import { redirect } from "next/navigation";
import { commentSchema } from "./schema";
import getSession from "@/app/lib/session";
import db, {
  addLikeTweet,
  findTweetLikeStatus,
  removeLikeTweet,
} from "@/app/lib/db";
import { revalidateTag } from "next/cache";

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
 * 트윗 좋아요 조회
 * @param tweetNo 트윗 번호
 * @returns 좋아요 조회 결과
 */
export async function findTweetLike(tweetNo: number) {
  const userId = await getSessionId();
  const result = await findTweetLikeStatus(tweetNo, userId);
  return result;
}

/**
 * 댓글 좋아요 기능
 * @param commentNo 댓글 번호
 * @param userId 유저 번호(session에서 조회)
 */
export async function likeActionToggle(tweetNo: number) {
  // session에 저장된 userId 조회
  const userId = await getSessionId();
  // 현재 session에 저장된 userId의 tweet 좋아요 조회
  const result = await findTweetLikeStatus(tweetNo, userId);

  if (!result.isLiked) await addLikeTweet(tweetNo, userId);
  else await removeLikeTweet(tweetNo, userId);

  revalidateTag(`like-status-${tweetNo}`); // 특정 트윗의 캐시관리
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

/**
 * 사용자의 댓글리스트 조회
 * @param userNo
 * @returns
 */
export async function findUserCommentList(userNo: number) {
  const comments = await db.comment.findMany({
    where: { userNo },
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
