"use server";

import db from "@/app/lib/db";
import getSession from "@/app/lib/session";

/**
 * 검색한 사용자 조회
 */
export async function findSearchUser(username: string) {
  const user = await db.user.findUnique({
    where: { username },
  });

  return user;
}

/**
 * 현재 로그인한 유저 조회
 */
export async function getLoginUser() {
  const session = await getSession();
  return session.id;
}
