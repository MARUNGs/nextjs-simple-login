"use client";
import { usePathname, useRouter } from "next/navigation";
import { BackIcon, Chat } from "../Icon";
import { logout } from "./NavigationServer";
import Link from "next/link";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-10 my-5 pb-5 gap-5 lg:mx-32 xl:mx-80">
      {pathname !== "/" ? (
        <>
          <button onClick={() => router.back()} className="flex-1">
            <BackIcon width="40" height="40" />
          </button>

          <div className="flex-1 flex justify-center">
            <Chat width="40" height="40" />
          </div>

          <form action={logout} className="flex-1 flex justify-end">
            <button type="submit" className="dark:text-white hover:underline">
              로그아웃
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="invisible flex-1">
            <BackIcon width="40" height="40" />
          </div>

          <div className="flex-1 flex justify-center">
            <Chat width="40" height="40" />
          </div>

          <div className="flex-1 flex justify-end">
            <Link href="/profile">프로필</Link>

            <form action={logout} className="flex-1 flex justify-end">
              <button type="submit" className="dark:text-white hover:underline">
                로그아웃
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
