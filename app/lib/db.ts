import { PrismaClient } from "@prisma/client";
import { ILoginForm } from "../types/login";

const db = new PrismaClient(); // client 생성

/**
 * [회원가입] 이메일 중복 체크
 * @param email
 */
export async function findEmail(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { user_no: true, email: true, password: true },
  });

  const result = {
    // 결과 생성
    success: Boolean(user) ? true : false,
    data: Boolean(user) ? user : undefined,
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
    select: { user_no: true },
  });

  const result = {
    success: Boolean(user),
    data: user,
  };

  return result;
}

/**
 * [회원가입] 유저 정보 저장
 * @param data
 * @returns
 */
export async function createUser({ email, username, password }: ILoginForm) {
  const data = {
    email,
    username,
    password,
    bio: "",
  };

  const user = await db.user.create({
    data,
    select: { user_no: true },
  });

  const result = {
    success: Boolean(user),
    data: user,
  };

  return result;
}

/**
 * [로그인] 비밀번호 조회
 * @param email
 * @returns
 */
export async function findPassword(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { password: true },
  });

  const result = {
    success: true,
    data: user.password,
  };

  return result;
}

export default db;
