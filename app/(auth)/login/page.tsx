/** 로그인 */
"use client";
import { useFormState } from "react-dom";
import Input from "../../components/Input";
import { formSubmit } from "./server";
import Button from "../../components/Button";
import * as validation from "../../lib/constants";
import Link from "next/link";
import clsx from "clsx";
import { Chat } from "@/app/components/Icon";

export default function Home() {
  const flag = {
    prevState: false,
    errors: {
      email: [],
      password: [],
    },
  };
  const [state, dispatch] = useFormState(formSubmit, flag);

  return (
    <div
      className={`${clsx(
        "m-14",
        "flex flex-col items-center justify-between",
        "[&_div_h1]:dark:text-white [&_div_h1]:text-2xl *:pb-2"
      )}`}
    >
      <div className="text-5xl m-12 flex flex-col items-center">
        <Chat />
        <h1>어서오세요! Home Tweet Home입니다.</h1>
      </div>

      <form action={dispatch} className="*:mb-2 *:w-96 *:rounded-full">
        <Input
          type="text"
          name="email"
          placeholder="이메일을 입력하세요."
          className="grow"
          required
          errors={state?.errors.email}
        />

        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          className="grow"
          required
          minLength={validation.PASSWORD_VALIDATION.min.value}
          errors={state?.errors.password}
        />

        <Button text="Login" />
      </form>

      {/* {state.prevState && <Alert />} */}

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
