// 트윗 상세 페이지 :: 클라이언트
"use client";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import { formatToTimeAgo } from "../lib/format";
import { useState } from "react";
import AddComment from "./AddComment";
import { unstable_cache as nextCache } from "next/cache";
import LikeButton from "./LikeButton";

export default function TweetContent({
  tweet,
  result,
}: {
  tweet: string;
  result;
}) {
  const [showComment, setShowComment] = useState(false);

  // 댓글 등록 컴포넌트 보여주기 하는 버튼
  function commentShowToggle() {
    setShowComment((prev) => !prev);
  }

  return (
    <>
      <div
        className={`${clsx(
          "grid grid-cols-[1fr 100px] gap-4",
          "border border-stone-600 rounded-md",
          "my-5 mx-5",
          "group",
          "dark:text-white"
        )}`}
      >
        <div className="flex flex-col *:ml-3 *:mb-5">
          <div className="flex items-center ml-3 my-5">
            <div className="size-10 mr-3 relative aspect-square">
              {result.user.bio && result.user.bio !== "" ? (
                <Image
                  className="object-cover"
                  src={result.user.bio}
                  alt="user"
                  fill
                />
              ) : (
                <UserCircleIcon className="size-10" />
              )}
            </div>

            <span className="font-semibold">{result.user.username}</span>
            <span className="text-stone-500 text-sm ml-2">
              {result.user.email.split("@")[0]}
            </span>
          </div>
          <div>{tweet}</div>
          <div className="text-stone-500 text-sm">
            {formatToTimeAgo(result.created_at.toString())}
          </div>

          <div className="flex gap-10 hover:*:cursor-pointer hover:*:underline">
            <div>
              comment 💬 <span className="ml-2">{result._count.Comment}</span>
            </div>
            <LikeButton likeCount={result._count.Like} />
          </div>
        </div>
      </div>

      {/* 댓글작성 버튼 */}
      {showComment && <AddComment tweetNo={result.tweet_no} />}
    </>
  );
}
