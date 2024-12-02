import clsx from "clsx";
import Link from "next/link";
import { ITweetType } from "./TweetsList";
import {
  ArrowTurnDownLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { formatToTimeAgo } from "../lib/format";

export default function Tweets({ ...props }: ITweetType) {
  return (
    <>
      <Link key={props.tweet_no} href={`/tweet/${props.user.username}`}>
        <div
          className={`${clsx(
            "grid grid-cols-[1fr,100px] gap-4",
            "border border-stone-600 rounded-md",
            "my-5 mx-5",
            "group"
          )}`}
        >
          <div className="flex flex-col *:ml-3 *:mb-5">
            <div className="flex items-center ml-3 my-5">
              {/* 이미지 */}
              <div className="size-10 mr-3 relative aspect-square">
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

              {/* 유저 정보 */}
              <span className="font-semibold">{props.user.username}</span>
              <span className="text-stone-500 text-sm ml-2">
                {props.user.email.split("@")[0]}
              </span>
            </div>
            <div>{props.tweet}</div>
            <div className="text-stone-500 text-sm">
              {formatToTimeAgo(props.created_at.toString())}
            </div>
          </div>

          {/* 들어가기 아이콘 */}
          <div className="flex items-center justify-center h-full">
            <ArrowTurnDownLeftIcon
              className={`${clsx(
                "group-hover:opacity-100",
                "size-8 opacity-0 transition-opacity duration-300"
              )}`}
            />
          </div>
        </div>
      </Link>
    </>
  );
}
