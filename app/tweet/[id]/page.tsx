// 트윗 상세 페이지 :: 서버
import { findTweet, findTweetLikeStatus } from "@/app/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CommentList from "@/app/comment/page";
import TweetContent from "@/app/components/TweetContent";
import { getSessionId } from "@/app/comment/server";
import { unstable_cache as nextCache } from "next/cache";

// 동적 타이틀
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `Tweet Detail :: ${params.id}`,
  };
}

export default async function Tweet({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const result = await findTweet(id);
  const userId = await getSessionId();

  if (isNaN(id) || !result) return notFound();

  const { tweet } = result;

  // 캐시관리 :: 좋아요 조회
  function getCachedLikeStatus(tweetNo: number, userId: number) {
    const cachedOperation = nextCache(
      async (tweetNo: number, userId: number) =>
        findTweetLikeStatus(tweetNo, userId),
      [`like`],
      {
        tags: [`like-status-${tweetNo}`],
      }
    );

    return cachedOperation(tweetNo, userId);
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id, userId);

  return (
    <>
      <TweetContent
        tweetNo={id}
        tweet={tweet}
        result={result}
        likeCount={likeCount}
        isLiked={isLiked}
      />

      {/* 해당 트윗의 댓글 목록 */}
      <CommentList tweetNo={id} />
    </>
  );
}
