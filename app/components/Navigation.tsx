"use client";
import { useRouter } from "next/navigation";
import { BackIcon, Chat } from "./Icon";
import { logout } from "./NavigationServer";
import { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(true);
  }, []);

  /** 뒤로가기 */
  const backPage = () => {
    if (flag) router.back();
  };

  return (
    <>
      <div className="flex items-center justify-center gap-48 mt-5 mb-5">
        <div onClick={backPage} className="cursor-pointer">
          <BackIcon width="40" height="40" />
        </div>

        <Chat width="40" height="40" />

        <form action={logout}>
          <button type="submit" className="dark:text-white hover:underline">
            로그아웃
          </button>
        </form>
      </div>
    </>
  );
}
