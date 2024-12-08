// 트윗 상세 페이지 :: 서버
import { findTweet } from "@/app/lib/db";
// import { formatToTimeAgo } from "@/app/lib/format";
// import { UserCircleIcon } from "@heroicons/react/16/solid";
// import clsx from "clsx";
import { Metadata } from "next";
// import Image from "next/image";
import { notFound } from "next/navigation";
import CommentList from "@/app/comment/page";
// import Link from "next/link";
import TweetContent from "@/app/components/TweetContent";

// 동적 타이틀
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `Tweet Detail :: ${params.id}`,
  };
}

export default async function Tweet({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const result = await findTweet(id);

  if (isNaN(id) || !result) return notFound();

  const {
    tweet,
    created_at,
    user: { username, email, bio },
  } = result;

  return (
    <>
      <TweetContent tweet={tweet} result={result} />

      {/* 해당 트윗의 댓글 목록 */}
      <CommentList tweetNo={id} />
    </>
  );
}
