/**
 * 검색 페이지
  1. 검색 input을 보여준다.
  2. 검색 버튼을 눌렀을 때 filter되어 조회된 트윗리스트를 보여준다.
 */

"use client";
import Button from "@/app/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { InputSchema, inputSchema } from "./schema";
import { searchTweets } from "./server";
import { useState } from "react";
import TweetsList from "@/app/components/Tweet/TweetsList";

export default function Search() {
  const [search, setSearch] = useState([]);
  const [resultFlag, setResultFlag] = useState(false);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
  });

  // form action
  async function onValid() {
    setSearch([]);
    setResultFlag(false);

    // 검증 이후 서버호출
    const onSubmit = handleSubmit(async (data: InputSchema) => {
      const formData = new FormData();
      formData.append("keyword", data.keyword);

      const result = await searchTweets(formData);

      setSearch(result);
      setResultFlag(result.length > 0);
    });

    await onSubmit();
  }

  return (
    <>
      <div className={`${clsx("flex flex-row justify-center items-center")}`}>
        <form action={onValid}>
          <input
            className={`${clsx(
              "border border-stone-600 rounded-md",
              "focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-200",
              "mx-3"
            )}`}
            type="text"
            {...register("keyword")}
            placeholder="Search keyword ..."
          />
          <Button custom="w-20 text-sm" type="submit" text="Search" />
        </form>
      </div>

      <div className={`${clsx("flex flex-col justify-center items-center")}`}>
        {resultFlag && search.length > 0 && (
          <TweetsList success={resultFlag} data={search} />
        )}
      </div>
    </>
  );
}
