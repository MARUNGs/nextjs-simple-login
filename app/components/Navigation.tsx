"use client";
import { BackIcon, Chat } from "./Icon";
import { logout } from "./NavigationServer";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-16 md:gap-48 my-5 pb-5">
      <Link href="/">
        <BackIcon width="40" height="40" />
      </Link>

      <Chat width="40" height="40" />

      <form action={logout}>
        <button type="submit" className="dark:text-white hover:underline">
          로그아웃
        </button>
      </form>
    </div>
  );
}
