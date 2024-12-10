"use client";
// 댓글 작성
import Button from "@/app/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommentFormProps, commentSchema } from "./comment/schema";
import { commentSubmit } from "./comment/server";

export default function AddComment({ tweetNo }: { tweetNo: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormProps>({
    resolver: zodResolver(commentSchema),
  });

  // form action
  async function onValid() {
    const onSubmit = handleSubmit(async (data: CommentFormProps) => {
      if (!tweetNo) return;

      const formData = new FormData();
      formData.append("comment", data.comment);
      formData.append("tweet_no", tweetNo.toString());

      await commentSubmit(formData, tweetNo);
    });

    await onSubmit();
  }

  return (
    <div className="dark:text-white gap-5">
      <form action={onValid} className="flex flex-col m-5">
        <textarea
          {...register("comment")}
          placeholder="참신한 댓글이 필요해 보이네요."
          className="w-full h-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        {errors && <div>{errors.comment?.message}</div>}
        <input type="text" name="userNo" className="hidden" />

        <Button custom="w-20 h-10 self-end my-3" text="작성" />
      </form>
    </div>
  );
}
