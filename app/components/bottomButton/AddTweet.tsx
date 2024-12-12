import { PlusIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Link from "next/link";

export default function AddTweet() {
  return (
    <Link
      href={`/add`}
      className={`${clsx(
        "rounded-full bg-neutral-100 size-16 flex justify-center items-center",
        "fixed bottom-16 right-8 dark:text-black",
        "hover:bg-neutral-400 active:scale-95 transition-transform"
      )}`}
    >
      <PlusIcon className="size-10" />
    </Link>
  );
}
