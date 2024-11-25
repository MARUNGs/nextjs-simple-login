"use server";
import zod from "zod";
import {
  MIN,
  MIN_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
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
    .toLowerCase(),
  username: zod
    .string({
      invalid_type_error,
      required_error,
    })
    .min(MIN, MIN_ERROR),
  password: zod
    .string({
      required_error: "비밀번호를 입력하세요.",
    })
    .min(MIN, MIN_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

// main action
export async function formSubmit(prevState: any, formData: FormData) {
  console.log(formData);

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  console.log(result.error?.flatten());
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else console.log(result.data);
}
