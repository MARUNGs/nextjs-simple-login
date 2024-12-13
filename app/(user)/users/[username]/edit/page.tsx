/**
 * 사용자 정보수정 화면
 */
import { findUserInfo } from "@/app/lib/db";
import { notFound } from "next/navigation";
import UserEditContent from "@/app/components/edit/UserEditContent";

export default async function UserEdit({
  params,
}: {
  params: {
    username: string;
  };
}) {
  if (!params) return notFound();
  const { username } = params;
  const decodedUsername = decodeURIComponent(username); // url 디코딩 :: username 중 @가 포함되어 있어서 디코딩 수행
  const user = await findUserInfo(decodedUsername);

  return <UserEditContent user={user} />;
}
