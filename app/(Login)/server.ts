"use server";
import zod from "zod";
import { ILoginForm } from "../types/login";
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
    .email()
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
  return !result.success ? result.error.flatten() : result.data;
}
