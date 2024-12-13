"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import UserCardContent from "./UserCardContent";
import UserCommentList from "../comment/UserCommentList";
import { UserDetailCardProps } from "@/app/types/CommentListType";

export default function UserDetailCard({
  user,
  sessionId,
  userCommentList,
}: UserDetailCardProps) {
  const [same, setSame] = useState(false);

  // 로그인한 유저와 현재 보고있는 유저의 id가 동일하면 true
  useEffect(() => {
    if (sessionId === user.user_no) setSame(true);
    else setSame(false);
  }, [user.user_no, sessionId]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className={`${clsx(
            "w-4/5 h-1/2",
            "*:text-center",
            "dark:*:text-white"
          )}`}
        >
          <h1 className={`${clsx("dark:text-white", "text-5xl my-5")}`}>
            User Info
          </h1>
          <h3 className="text-xl">{user.username}님 페이지입니다.</h3>
        </div>
        <div className="flex flex-col items-center my-10 w-4/5 ">
          <UserCardContent username={user.username} same={same} />
        </div>
      </div>

      <div>
        <UserCommentList comments={userCommentList} />
      </div>
    </>
  );
}
