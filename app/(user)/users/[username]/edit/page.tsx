/**
 * 사용자 정보수정 화면
 */
import UserCardContent from "@/app/components/card/UserCardContent";
import { ProfileIcon } from "@/app/components/Icon";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { findUserInfo } from "@/app/lib/db";
import clsx from "clsx";
import { notFound } from "next/navigation";

export default async function UserEdit({
  params,
}: {
  params: { username: string };
}) {
  if (!params) return notFound();

  const { username } = params;
  const decodedUsername = decodeURIComponent(username); // url 디코딩 :: username 중 @가 포함되어 있어서 디코딩 수행
  const user = await findUserInfo(decodedUsername);

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className={`${clsx(
            "w-4/5 h-1/2",
            "*:text-center",
            "dark:*:text-white"
          )}`}
        >
          <h1 className={`${clsx("dark:text-white", "text-5xl my-5")}`}>
            Edit
          </h1>
          <h3 className="text-xl">{user.username}님 수정 페이지입니다.</h3>
        </div>
        <div className="flex flex-col items-center my-10 ">
          <form className="*:mb-2 *:w-96 *:rounded-full">
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="사용자명을 입력하세요."
              required
              defaultValue={user.username}
            />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 입력하세요."
              required
              defaultValue={user.email}
            />
            <Input
              type="password"
              id="password"
              name="password"
              required
              placeholder="현재 비밀번호를 입력하세요."
            />

            <Button type="submit" text="Edit" />
          </form>
        </div>
      </div>
    </>
  );
}
