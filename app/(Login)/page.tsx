"use client";
import { useFormState } from "react-dom";
import Input from "../components/Input";
import { formSubmit } from "./server";

export default function Home() {
  const [state, dispatch] = useFormState(formSubmit, null);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-5xl m-14">🔥</div>

        <form action={dispatch} className="*:mb-2 *:w-96 *:rounded-full">
          <Input
            type="text"
            name="email"
            placeholder="이메일을 입력하세요."
            className="grow"
            required
          />

          <Input
            type="text"
            name="username"
            placeholder="사용자를 입력하세요."
            className="grow"
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요."
            className="grow"
            required
          />

          <button className="btn btn-accent">Login</button>
        </form>
      </div>
    </>
  );
}
