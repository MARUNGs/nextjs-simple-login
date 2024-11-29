/** 회원가입 */
"use client";
// import Alert from "@/app/components/Alert";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import clsx from "clsx";
import Link from "next/link";
import * as validation from "@/app/lib/constants";
import { Chat } from "@/app/components/Icon";
import { useFormState } from "react-dom";
import { createFormSubmit } from "./server";
import { IFormState } from "@/app/types/login";

export default function CreateAccount() {
  const initState: IFormState = {
    success: false,
    errors: {
      email: undefined,
      username: undefined,
      password: undefined,
    },
  };
  const [state, dispatch] = useFormState<IFormState, FormData>(
    createFormSubmit,
    initState
  );

  console.log(state);

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl m-14">
        <Chat />
      </div>

      <form action={dispatch} className="*:mb-2 *:w-96 *:rounded-full">
        <Input
          type="text"
          name="email"
          placeholder="이메일을 입력하세요."
          className="grow"
          required
          errors={state.errors?.email}
        />

        <Input
          type="text"
          name="username"
          placeholder="사용자를 입력하세요."
          className="grow"
          required
          minLength={validation.USERNAME_VALIDATION.min.value}
          errors={state.errors?.username}
        />

        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          className="grow"
          required
          minLength={validation.PASSWORD_VALIDATION.min.value}
          errors={state.errors?.password}
        />

        <Input
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력하세요."
          className="grow"
          required
          minLength={validation.PASSWORD_VALIDATION.min.value}
          errors={state.errors?.password}
        />

        <Button text="Join" />
      </form>

      {/* {state.prevState && <Alert />} */}

      <p className={`${clsx("mt-5 text-lg", "dark:text-white")}`}>
        로그인 계정이 있으신가요?{" "}
        <Link
          href={"/login"}
          className={`${clsx("text-blue-500 font-bold", "hover:underline")}`}
        >
          Login
        </Link>
      </p>
    </div>
  );
}
