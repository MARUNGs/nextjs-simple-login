import clsx from "clsx";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/app/lib/format";

// Comment 인터페이스를 가져옵니다.
interface Comment {
  created_at: Date;
  updated_at: Date;
  userNo: number;
  tweetNo: number;
  payload: string;
  user: {
    username: string;
    email: string;
    bio: string;
  };
}

interface UserCommentListProps {
  comments: Comment[]; // comments의 타입을 설정합니다.
}

export default async function UserCommentList({
  comments,
}: UserCommentListProps) {
  return (
    <div
      className={`${clsx(
        "grid grid-cols-[1fr 100px] gap-4",
        "my-5 ml-14",
        "group",
        "dark:text-white",
        "last:pb-0 last:border-b-0 border-neutral-500"
      )}`}
    >
      {comments.map((comment, i) => (
        <div className="flex flex-col *:ml-3 *:mb-5" key={i}>
          <div className="flex items-center ml-3 my-5">
            <div className="size-10 mr-3 relative aspect-square">
              {comment.user.bio && comment.user.bio !== "" ? (
                <Image
                  className="object-cover"
                  src={comment.user.bio}
                  alt="user"
                  fill
                />
              ) : (
                <UserCircleIcon className="size-10" />
              )}
            </div>

            <span className="font-semibold">{comment.user.username}</span>
            <span className="text-stone-500 text-sm ml-2">
              {comment.user.email.split("@")[0]}
            </span>
            <span className="text-stone-500 text-sm ml-2">
              {formatToTimeAgo(comment.created_at.toString())}
            </span>
          </div>
          <div className="text-stone-700 text-base dark:text-stone-100">
            {comment.payload}
          </div>
          <div className="flex items-center justify-center h-full" />
        </div>
      ))}
    </div>
  );
}
