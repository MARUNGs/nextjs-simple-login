"use server";

import db from "@/app/lib/db";

/**
 * [수정] 사용자 정보 수정
 * @param formData
 * @returns
 */
export async function edit(formData: FormData) {
  return null;
}

/**
 * [수정] DB에서 입력한 이메일을 보유한 유저를 찾는다.
 * @param email
 * @returns
 */
export async function fineUserPassword(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { user_no: true, password: true },
  });

  return user;
}
