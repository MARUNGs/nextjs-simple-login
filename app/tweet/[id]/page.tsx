// 트윗 상세 페이지
import { Chat } from "@/app/components/Icon";
import { findTweet } from "@/app/lib/db";
import { formatToTimeAgo } from "@/app/lib/format";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface IParams {
  params: {
    id: string;
  };
}

// 동적 타이틀
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `Tweet Detail :: ${params.id}`,
  };
}

interface ITweetType {
  tweet: string;
  tweet_no: number;
  created_at: Date;
  updated_at: Date;
  userNo: number;
  user: {
    email: string;
    username: string;
    bio: string;
  };
  Like: {
    user: {
      user_no: number;
      username: string;
    };
  }[];
}

export default async function Tweet({ params }: IParams) {
  const id = Number(params.id);
  const result = await findTweet(id);

  if (isNaN(id) || !result) return notFound();

  const {
    tweet_no,
    tweet,
    created_at,
    user: { username, email, bio },
    Like,
  } = result;

  return (
    <div
      className={`${clsx(
        "grid grid-cols-[1fr,100px] gap-4",
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
          <div>
            comment 💬 <span className="ml-2">0</span>
          </div>
          <div>
            Likes ❤️ <span className="ml-2">{Like.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
