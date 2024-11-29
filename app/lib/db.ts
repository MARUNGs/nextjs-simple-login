import { PrismaClient } from "@prisma/client/extension";

const db = new PrismaClient(); // client 생성

/**
 * [회원가입] 이메일 중복 체크
 * @param email
 */
export async function findEmail(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  const result = {
    // 결과 생성
    success: Boolean(user),
    data: user,
  };

  return result;
}

/**
 * [회원가입] 사용자명 중복 체크
 * @param username
 * @returns
 */
export async function findUsername(username: string) {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });

  const result = {
    success: Boolean(user),
    data: user,
  };

  return result;
}

export default db;
