"use server";
import zod from "zod";
import * as validation from "../../lib/constants";
import { IFormState } from "@/app/types/login";
import { findEmail, findUsername } from "@/app/lib/db";

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

const formSchema = zod
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

export async function createFormSubmit(
  prevState: IFormState,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = await formSchema.spa(data);

  // 첫 실행
  if (!prevState.success) {
    // 유효성 검사가 실패라면,
    if (!result.success) {
      const object = {
        success: false,
        errors: result.error.flatten().fieldErrors,
      };

      return object;
    } else {
      // 유효성 검사가 성공적이라면,
    }
  }

  return result;
}
