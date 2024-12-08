// 트윗 상세 페이지
import { findTweet } from "@/app/lib/db";
import { formatToTimeAgo } from "@/app/lib/format";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CommentList from "@/app/comment/page";
import Link from "next/link";

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
              {bio && bio !== "" ? (
                <Image className="object-cover" src={bio} alt="user" fill />
              ) : (
                <UserCircleIcon className="size-10" />
              )}
            </div>

            <span className="font-semibold">{username}</span>
            <span className="text-stone-500 text-sm ml-2">
              {email.split("@")[0]}
            </span>
          </div>
          <div>{tweet}</div>
          <div className="text-stone-500 text-sm">
            {formatToTimeAgo(created_at.toString())}
          </div>

          <div className="flex gap-10 hover:*:cursor-pointer hover:*:underline">
            <Link href={`/comment/add?tweet_no=${id}`}>
              <div>
                comment 💬 <span className="ml-2">{result._count.Comment}</span>
              </div>
            </Link>
            <div>
              Likes ❤️ <span className="ml-2">{result._count.Like}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 해당 트윗의 댓글 목록 */}
      <CommentList tweetNo={id} />
    </>
  );
}
