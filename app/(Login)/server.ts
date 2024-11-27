"use server";
import zod from "zod";
import * as validation from "./constants";

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

// validation
const formSchema = zod.object({
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
    .min(pwMin.value, pwMin.message)
    .regex(pwRegex.value, pwRegex.message),
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
