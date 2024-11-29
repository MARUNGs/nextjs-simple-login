import clsx from "clsx";
import { Chat } from "../components/Icon";
import Button from "../components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className={`${clsx(
        "flex flex-col items-center justify-between min-h-screen",
        "*:dark:text-white [&_div_h1]:text-2xl *:pb-2"
      )}`}
    >
      <div className="my-auto flex flex-col items-center gap-5">
        <Chat />
        <h1 className="">어서오세요! Tweet입니다.</h1>

        <Link href="/login">
          <Button text="시작하기" />
        </Link>
      </div>
    </div>
  );
}
