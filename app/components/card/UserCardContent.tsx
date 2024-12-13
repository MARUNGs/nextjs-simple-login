"use client";
import clsx from "clsx";
import { useState } from "react";
import { MoreButton, ProfileIcon } from "../Icon";
import Link from "next/link";
import { UserCardContentProps } from "@/app/types/UserCardType";

export default function UserCardContent({
  username,
  same,
}: UserCardContentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownBtn = () => {
    if (same) {
      setIsOpen(true);
    } else {
      alert("나의 정보가 아니므로 부가정보를 확인할 수 없습니다.");
      setIsOpen(false);
    }
  };

  function removeUser() {
    if (confirm("정말 회원탈퇴하겠습니까?")) {
      alert("준비중입니다.");
    }
  }

  function showCommentList() {}

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4 relative">
        <button
          onClick={dropDownBtn}
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <MoreButton />
        </button>
        <div
          id="dropdown"
          className={`${clsx(
            "z-10 absolute right-0 top-full mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700",
            isOpen ? "block" : "hidden"
          )}`}
        >
          <ul
            className="py-2 *:hover:cursor-pointer"
            aria-labelledby="dropdownButton"
          >
            <li>
              <Link
                href={`/users/${username}/edit`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </Link>
            </li>
            <li>
              <a
                onClick={removeUser}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center pb-10">
        <ProfileIcon />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {username.split("@")[0]}
        </span>

        <div className="flex mt-4 md:mt-6 hover:cursor-pointer">
          <button
            onClick={showCommentList}
            className={`${clsx(
              "py-2 px-4 ms-2 text-sm font-medium text-gray-900 bg-white",
              "rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700",
              "focus:outline-none focus:z-10 focus:ring-2 focus:ring-gray-100",
              "dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            )}`}
          >
            <span>댓글닫기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
