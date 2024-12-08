// 좋아요 버튼
"use client";

import { useOptimistic } from "react";
import { likeActionToggle } from "../comment/server";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetNo: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetNo,
}: LikeButtonProps) {
  const [state, reducer] = useOptimistic(
    { isLiked, likeCount },
    ({ isLiked, likeCount }, _) => {
      console.log(_);
      return {
        isLiked: !isLiked,
        likeCount: isLiked ? --likeCount : ++likeCount,
      };
    }
  );

  // 좋아요 기능
  async function likeHandler() {
    reducer(undefined);

    try {
      await likeActionToggle(tweetNo);
    } catch (e) {
      console.error("like action failed:", e);
    }
  }

  return (
    <button onClick={likeHandler}>
      {state.isLiked ? "❤️" : "🤍"}{" "}
      <span className="ml-2">{state.likeCount}</span>
    </button>
  );
}
