"use client";
import clsx from "clsx";
import { RefObject } from "react";
import { useFormStatus } from "react-dom";

export default function Button({
  ref,
  text,
}: {
  ref: RefObject<HTMLButtonElement>;
  text: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      ref={ref}
      disabled={pending}
      className={clsx(
        "bg-stone-300 pt-2 pb-2 font-semibold text-black",
        "active:scale-90 transition-transform",
        "mb-2 w-96 rounded-full"
      )}
    >
      {pending ? "loading ..." : text}
    </button>
  );
}
