"use client";
import Button from "@/app/components/Button";
import { useFormState } from "react-dom";
import { tweetSubmit } from "./server";

export default function AddTweetContent() {
  const [state, dispatch] = useFormState(tweetSubmit, null);

  return (
    <>
      <div className="dark:text-white gap-5">
        <form action={dispatch} className="flex flex-col m-5">
          <textarea
            name="tweet"
            placeholder="무슨 일이 일어나고 있나요?"
            className="w-full h-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          {state?.errors && <div>{state.errors.tweets}</div>}
          <input type="text" name="userNo" className="hidden" />

          <Button custom="w-20 h-10 self-end my-3" text="작성" />
        </form>
      </div>
    </>
  );
}
