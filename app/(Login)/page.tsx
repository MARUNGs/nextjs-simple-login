"use client";
import { useFormState } from "react-dom";
import Input from "../components/Input";
import { formSubmit } from "./server";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { MIN, PASSWORD_MIN, USERNAME_MIN } from "./constants";

export default function Home() {
  const flag = {
    prevState: false,
    errors: null,
  };
  const [state, dispatch] = useFormState(formSubmit, flag);
  console.log(state.errors?.fieldErrors.email);

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl m-14">🔥</div>

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
          minLength={USERNAME_MIN}
          errors={state.errors?.fieldErrors.username}
        />

        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          className="grow"
          required
          minLength={PASSWORD_MIN}
          errors={state.errors?.fieldErrors.password}
        />

        <Button text="Login" />
      </form>

      {state.prevState && <Alert />}
    </div>
  );
}
