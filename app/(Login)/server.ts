"use server";
import zod from "zod";
import {
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  PASSWORD_MIN,
  PASSWORD_MIN_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN,
  USERNAME_MIN_ERROR,
  invalid_type_error,
  required_error,
} from "./constants";

// validation
const formSchema = zod.object({
  email: zod
    .string({
      invalid_type_error,
      required_error,
    })
    .email({
      message: "이메일 형식으로 작성하세요.",
    })
    .regex(EMAIL_REGEX, EMAIL_REGEX_ERROR)
    .toLowerCase(),
  username: zod
    .string({
      invalid_type_error,
      required_error,
    })
    .min(USERNAME_MIN, USERNAME_MIN_ERROR),
  password: zod
    .string({
      required_error: "비밀번호를 입력하세요.",
    })
    .min(PASSWORD_MIN, PASSWORD_MIN_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

// main action
export async function formSubmit(
  prevState: {
    prevState: boolean;
    errors?: zod.ZodFormattedError<any> | null;
  },
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  let prev;

  if (!result.success) {
    prev = {
      prevState: false,
      errors: result.error.flatten(),
    };
  } else {
    prev = {
      prevState: true,
      errors: undefined,
    };
  }

  return prev;
}
