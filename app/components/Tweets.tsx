import clsx from "clsx";
import Link from "next/link";
import { ITweetType } from "./TweetsList";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { formatToTimeAgo } from "../lib/format";

export default function Tweets({ ...props }: ITweetType) {
  return (
    <>
      <Link key={props.tweet_no} href={`/tweet/${props.user.username}`}>
        <div
          className={`${clsx(
            "mx-10 my-5 px-5 py-2",
            "flex flex-row items-start gap-3",
            "border rounded-md",
            "hover:border-2 hover:border-neutral-500"
          )}`}
        >
          {/* 이미지 */}
          <div className="size-10 relative aspect-square">
            {props.user.bio ? (
              <Image
                className="object-cover"
                src={props.user.bio}
                alt="user"
                fill
              />
            ) : (
              <UserCircleIcon className="size-10" />
            )}
          </div>

          {/* 트윗 */}
          <div>
            <div>
              <span>{props.user.username}</span>
              <span className="text-stone-500 text-sm ml-2">
                {props.user.email.split("@")[0]}
              </span>
              <span className="text-stone-500 text-sm ml-2">
                {formatToTimeAgo(props.created_at.toString())}
              </span>
            </div>
            <div>{props.tweet}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
