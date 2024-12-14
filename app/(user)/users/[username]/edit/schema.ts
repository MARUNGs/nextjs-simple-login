import { z as zod } from "zod";
import * as validation from "@/app/lib/constants";

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
    // 유효성검증할 만한 것이 없다해도, RHF + Zod를 구현한 상태라면 무조건 zod.object에 포함시켜야한다.
    // 아무거나 유효성검증을 넣자.
    bio: zod.string({
      description: "소개글",
    }),
    password: zod
      .string({
        required_error: pwRequired.message,
      })
      .regex(pwRegex.value, pwRegex.message)
      .min(pwMin.value, pwMin.message),
    newPassword: zod
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
  .superRefine(({ newPassword, passwordConfirm }, ctx) => {
    // 비밀번호 확인
    if (newPassword !== passwordConfirm) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });
