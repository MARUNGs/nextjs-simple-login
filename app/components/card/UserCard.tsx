import clsx from "clsx";
import { ProfileIcon } from "../Icon";
import Link from "next/link";

interface UserCardProps {
  user: any;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-5 mt-5">
        <ProfileIcon />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user.username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.email.split("@")[0]}
        </span>

        {/* 버튼 :: 정보보기 */}
        <div className="flex mt-6 hover:cursor-pointer">
          <Link
            href={`/users/{user.username}`}
            className={`$(clsx("dark:text-white"))`}
          >
            <span
              className={`${clsx(
                "py-2 px-4 ms-2 text-sm font-medium text-gray-900 bg-white",
                "rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700",
                "focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-100",
                "dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              )}`}
            >
              정보보기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
