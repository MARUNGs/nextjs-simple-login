import Card from "@/app/components/Card";
import { findUser } from "@/app/lib/db";
import getSession from "@/app/lib/session";
import clsx from "clsx";
import { notFound } from "next/navigation";

async function getUser() {
  const session = await getSession();
  const { id } = session;
  const { success, data } = await findUser(id);

  if (success) {
    return data;
  }

  notFound();
}

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${clsx(
          "w-4/5 h-1/2",
          "*:text-center",
          "dark:*:text-white"
        )}`}
      >
        <h1 className={`${clsx("dark:text-white", "text-5xl my-5")}`}>
          Profile
        </h1>
        <h3 className="text-xl">환영합니다! {user.username}님!</h3>
      </div>
      <div className="flex flex-col items-center my-10 w-4/5 ">
        <Card userNo={user.user_no} username={user.username} />
      </div>
    </div>
  );
}
