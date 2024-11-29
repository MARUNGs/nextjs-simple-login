/** 로그인 */
"use client";
import { useFormState } from "react-dom";
import Input from "../../components/Input";
import { formSubmit } from "./server";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import * as validation from "../../lib/constants";
import Link from "next/link";
import clsx from "clsx";
import { Chat } from "@/app/components/Icon";

export default function Home() {
  const flag = {
    prevState: false,
    errors: null,
  };
  const [state, dispatch] = useFormState(formSubmit, flag);

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
          errors={state.errors?.fieldErrors.email}
        />

        <Input
          type="text"
          name="username"
          placeholder="사용자를 입력하세요."
          className="grow"
          required
          minLength={validation.USERNAME_VALIDATION.min.value}
          errors={state.errors?.fieldErrors.username}
        />

        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          className="grow"
          required
          minLength={validation.PASSWORD_VALIDATION.min.value}
          errors={state.errors?.fieldErrors.password}
        />

        <Button text="Login" />
      </form>

      {state.prevState && <Alert />}

      <p className={`${clsx("mt-5 text-lg", "dark:text-white")}`}>
        아직 회원이 아니신가요?{" "}
        <Link
          href={"/create-account"}
          className={`${clsx("text-blue-500 font-bold", "hover:underline")}`}
        >
          Join
        </Link>
      </p>
    </div>
  );
}
