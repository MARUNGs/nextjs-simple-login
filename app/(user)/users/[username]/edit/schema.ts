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
