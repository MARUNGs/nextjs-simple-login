"use server";
import zod from "zod";
import * as validation from "../../lib/constants";
import { IPrevStateProps } from "@/app/types/login";
import { findEmail } from "@/app/lib/db";
import bcrypt from "bcrypt";
import { loginUser } from "@/app/lib/login";

const {
  invalid: emailInvalid,
  email,
  regex: emailRegex,
  required: emailRequired,
} = validation.EMAIL_VALIDATION;

const {
  min: pwMin,
  regex: pwRegex,
  required: pwRequired,
} = validation.PASSWORD_VALIDATION;

// validation
const formSchema = zod
  .object({
    email: zod
      .string({
        invalid_type_error: emailInvalid.message,
        required_error: emailRequired.message,
      })
      .email({
        message: email.message,
      })
      .regex(emailRegex.value, emailRegex.message)
      .toLowerCase(),
    password: zod
      .string({
        required_error: pwRequired.message,
      })
      .min(pwMin.value, pwMin.message)
      .regex(pwRegex.value, pwRegex.message),
  })
  .superRefine(async ({ email }, ctx) => {
    // 사용자가 로그인할 email 조회
    const result = await findEmail(email);

    if (!result.success) {
      // 사용자가 로그인할 email이 존재하지 않으면 이슈 생성
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "email이 존재하지 않습니다.",
        path: ["email"],
        fatal: true,
      });

      return zod.NEVER;
    }
  });

// main action
export async function formSubmit(_: IPrevStateProps, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);
  let prev;

  if (!result.success) {
    prev = {
      prevState: false,
      errors: result.error.flatten().fieldErrors,
    };

    return prev;
  } else {
    // 사용자가 입력한 이메일의 패스워드가 동일한지 체크 - email이 있다는 전제
    const user = await findEmail(result.data.email);
    const ok = await bcrypt.compare(user.data.password, result.data.password);

    // 비밀번호가 같으면 사용자 로그인 처리
    if (ok) {
      loginUser(user.data);
    } else {
      const result = {
        prevState: false,
        errors: { email: [], password: ["잘못된 비밀번호입니다."] },
      };

      return result;
    }
  }
}
