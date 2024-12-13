import { notFound } from "next/navigation";
import { findSearchUser, getLoginUser } from "./server";
import UserDetailCard from "@/app/components/card/UserDetailCard";

interface ParamProps {
  params: {
    username: string;
  };
}

/**
 * 특정사용자의 정보 + 댓글리스트 조회 화면
 */
export default async function User({ params }: ParamProps) {
  const { username } = params;
  if (!username) return notFound();

  // url 디코딩 :: username 중 @가 포함되어 있어서 디코딩 수행
  const decodedUsername = decodeURIComponent(username);
  const searchUser = await findSearchUser(decodedUsername);
  if (!searchUser) return notFound();

  // 현재 로그인한 사용자 조회
  const sessionId = await getLoginUser();

  return <UserDetailCard user={searchUser} sessionId={sessionId} />;
}
