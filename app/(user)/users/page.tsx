/**
 * 사용자 리스트 검색 화면
 */
"use client";
import Button from "@/app/components/Button";
import SelectSearch from "@/app/components/SelectSearch";
import clsx from "clsx";
import { useState } from "react";
import { searchUsers } from "../search/server";
import { inputSchema, InputSchema } from "../search/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserCard from "@/app/components/card/UserCard";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [resultFlag, setResultFlag] = useState(false);
  const [searchType, setSearchType] = useState("users");
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
  });

  // form action
  async function onValid() {
    setUsers([]);
    setResultFlag(false);

    // 검증 이후 서버호출
    const onSubmit = handleSubmit(async (data: InputSchema) => {
      const formData = new FormData();
      formData.append("keyword", data.keyword);

      const result = await searchUsers(formData);

      setUsers(result);
      setResultFlag(result.length > 0);
    });

    await onSubmit();
  }

  return (
    <>
      <div className={`${clsx("flex flex-row justify-center items-center")}`}>
        <SelectSearch
          customSize={"w-20"}
          selected={searchType}
          onSelectChange={setSearchType}
        />

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

      {
        // users 정보 호출 :: CardList
        resultFlag && (
          <div
            className={`${clsx(
              "grid grid-cols-1 gap-4 mt-4",
              "sm:grid-cols-2 md:grid-cols-3",
              "mx-5 mt-10"
            )}`}
          >
            {users.map((user, i) => (
              <UserCard key={i} user={user} />
            ))}
          </div>
        )
      }
    </>
  );
}
