"use client";
import clsx from "clsx";
import { useFormStatus } from "react-dom";

export default function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
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
