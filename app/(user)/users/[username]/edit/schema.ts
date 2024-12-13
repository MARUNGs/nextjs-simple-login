import { z as zod } from "zod";
import * as validation from "@/app/lib/constants";
import { findEmail, findUsername } from "@/app/lib/db";
import bcrypt from "bcryptjs"; // bcrypt -> bcryptjs 대체사용
import { fineUserPassword } from "./server";

const {
  invalid: emailInvalid,
  email,
  regex: emailRegex,
  required: emailRequired,
} = validation.EMAIL_VALIDATION;

const {
  min: usernameMin,
  required: usernameRequired,
  invalid: usernameInvalid,
} = validation.USERNAME_VALIDATION;

const {
  min: pwMin,
  regex: pwRegex,
  required: pwRequired,
} = validation.PASSWORD_VALIDATION;

// edit 화면 유효성 검사
export const editFormSchema = zod
  .object({
    email: zod
      .string({
        invalid_type_error: emailInvalid.message,
        required_error: emailRequired.message,
      })
      .email({ message: email.message })
      .regex(emailRegex.value, emailRegex.message),
    username: zod
      .string({
        invalid_type_error: usernameInvalid.message,
        required_error: usernameRequired.message,
      })
      .min(usernameMin.value, usernameMin.message),
    password: zod
      .string({
        required_error: pwRequired.message,
      })
      .regex(pwRegex.value, pwRegex.message)
      .min(pwMin.value, pwMin.message),
    passwordConfirm: zod
      .string({
        required_error: pwRequired.message,
      })
      .regex(pwRegex.value, pwRegex.message)
      .min(pwMin.value, pwMin.message),
  })
  .superRefine(async ({ email }, ctx) => {
    // 이메일 중복검사
    const result = await findEmail(email);

    if (result.success) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["email"],
        message: "이미 사용중인 이메일입니다.",
        fatal: true,
      });

      return zod.NEVER;
    }
  })
  .superRefine(async ({ username }, ctx) => {
    // 사용자명 중복검사
    const result = await findUsername(username);

    if (result.success) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["username"],
        message: "이미 사용중인 사용자명입니다.",
        fatal: true,
      });

      return zod.NEVER;
    }
  })
  .superRefine(async ({ email, password }, ctx) => {
    // 현재 비밀번호와 입력한 '현재 비밀번호'와 동일한지 검토한다.
    const user = await fineUserPassword(email);
    const ok = await bcrypt.compare(user.password, password ?? "");

    if (!ok) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["password"],
        message: "현재 비밀번호가 올바르지 않습니다.",
      });
    }
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    // 비밀번호 확인
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });
