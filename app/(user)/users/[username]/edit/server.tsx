"use server";
import bcrypt from "bcrypt";
import {
  editUser,
  findEmail,
  findUsername,
  fineUserPassword,
} from "@/app/lib/db";
import { editFormSchema } from "./schema";

/**
 * [수정] 사용자 정보 수정
 * @param formData
 * @returns
 */
export async function edit(formData: FormData) {
  const data = {
    user_no: Number(formData.get("userNo")),
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    bio: formData.get("bio") as string,
    password: formData.get("password") as string,
  };

  const schemaResult = editFormSchema.safeParse(data);
  if (!schemaResult.success) {
    return {
      success: false,
      errors: { comment: [`${schemaResult.error.flatten().fieldErrors}`] },
    };
  }

  const { user_no, email, username, bio, password } = data;

  // 1. 이메일 중복검사
  const emailResult = await findEmail(email);
  // 이메일이 존재하면서 유저번호가 동일하지 않으면 다른 유저와 이메일이 중복이므로 오류
  if (emailResult.success && emailResult.data.user_no !== user_no) {
    return {
      success: false,
      error: "해당 이메일은 이미 존재합니다.",
    };
  }

  // 2. 사용자명 중복검사
  const usernameResult = await findUsername(username);
  // 사용자명이 존재하면서 유저번호가 동일하지 않으면 다른 유저와 사용자명이 중복이므로 오류
  if (usernameResult.success && usernameResult.data.user_no !== user_no) {
    return {
      success: false,
      error: "해당 사용자명은 이미 존재합니다.",
    };
  }

  // 3. 현재 비밀번호와 입력한 '현재 비밀번호'와 동일한지 검토한다.
  const user = await fineUserPassword(email);
  const ok = await bcrypt.compare(user.password, password ?? "");

  if (!ok) {
    return {
      success: false,
      error: "현재 비밀번호가 올바르지 않습니다.",
    };
  }

  // 비밀번호 암호화 처리
  const hashPassword = await bcrypt.hash(password, 12);

  // 모두 성공적으로 마쳤다면 수정
  const result = await editUser({ ...data, password: hashPassword });

  // 여기선 어떻게 처리할지 생각 안함.
  return null;
}
