"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function Card({
  userNo,
  username,
}: {
  userNo: number;
  username: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownBtn = () => {
    setIsOpen(!isOpen);
  };

  function removeUser() {
    if (confirm("정말 회원탈퇴하겠습니까?")) {
      alert("준비중입니다.");
    }
  }

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
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
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
                href={`/users/${username}/edit?userNo=${userNo}`}
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
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width={60}
          height={60}
          className={`${clsx(
            "mb-3 rounded-full shadow-lg",
            "dark:text-white"
          )}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          ></path>
        </svg>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {username.split("@")[0]}
        </span>

        <div className="flex mt-4 md:mt-6 hover:cursor-pointer">
          <a
            onClick={() => alert("준비중입니다.")}
            className={`${clsx(
              "py-2 px-4 ms-2 text-sm font-medium text-gray-900 bg-white",
              "rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700",
              "focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-100",
              "dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            )}`}
          >
            댓글보기
          </a>
        </div>
      </div>
    </div>
  );
}
