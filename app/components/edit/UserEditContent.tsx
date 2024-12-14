"use client";
import Button from "../Button";
import clsx from "clsx";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema } from "@/app/(user)/users/[username]/edit/schema";
import { edit } from "@/app/(user)/users/[username]/edit/server";
import { useEffect, useOptimistic, useState } from "react";

interface IEditProps {
  username: string;
  email: string;
  bio: string;
  user_no: number;
  password?: string;
  newPassword?: string;
  passwordConfirm?: string;
}

export default function UserEditContent({ user }: { user: IEditProps }) {
  const [userNo, setUserNo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IEditProps>({
    resolver: zodResolver(editFormSchema),
  });

  // 화면 진입하면 유저번호를 바로 세팅한다.
  useEffect(() => setUserNo(user.user_no), [user.user_no]);

  //------------------------------------------------------------------------------------
  const [state, reducer] = useOptimistic(
    { username: user.username, email: user.email, bio: user.bio },
    (prevState, _) => {
      console.log(_);
      return {
        ...prevState,
        password: null,
        newPassword: null,
        passwordConfirm: null,
      };
    }
  );

  // 검증 이후 처리
  async function onValid() {
    const onSubmit = handleSubmit(
      async ({
        username,
        email,
        bio,
        password,
        newPassword,
        passwordConfirm,
      }: IEditProps) => {
        reducer({ username, email, bio });

        const formData = new FormData();
        formData.append("userNo", userNo + "");
        formData.append("username", username);
        formData.append("email", email);
        formData.append("bio", bio);
        formData.append("password", password);
        formData.append("newPassword", newPassword);
        formData.append("passwordConfirm", passwordConfirm);

        const result = await edit(formData);
        if (!result.success) {
          result.username && setError("username", result.username); // 사용자명 오류
          result.email && setError("email", result.email); // 이메일 오류
          result.password && setError("password", result.password); // 비밀번호 오류
        }
      }
    );

    await onSubmit(); // onSubmit 호출
  }

  //------------------------------------------------------------------------------------

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className={`${clsx(
            "w-4/5 h-1/2",
            "*:text-center",
            "dark:*:text-white"
          )}`}
        >
          <h1 className={`${clsx("dark:text-white", "text-5xl my-5")}`}>
            Edit
          </h1>
          <h3 className="text-xl">{user.username}님 수정 페이지입니다.</h3>
        </div>
        <div className="flex flex-col items-center my-10 ">
          <form action={onValid} className="*:mb-2 *:w-96 *:rounded-full">
            <input
              type="number"
              name="user_no"
              className="hidden"
              defaultValue={user.user_no}
            />
            <Input
              type="text"
              id="username"
              placeholder="사용자명을 입력하세요."
              {...register("username")}
              required
              defaultValue={state.username ?? user.username}
              errors={errors.username && [errors.username?.message]}
            />
            <Input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요."
              required
              {...register("email")}
              defaultValue={state.email ?? user.email}
              errors={errors.email && [errors.email?.message]}
            />
            <Input
              type="text"
              id="bio"
              placeholder="소개를 입력하세요."
              required
              {...register("bio")}
              defaultValue={state.bio ?? user.bio}
              errors={errors.bio && [errors.bio?.message]}
            />
            <Input
              type="password"
              id="password"
              required
              {...register("password")}
              placeholder="현재 비밀번호를 입력하세요."
              autoComplete="true"
              errors={errors.password && [errors.password?.message]}
            />
            <Input
              type="password"
              id="newPassword"
              required
              {...register("newPassword")}
              placeholder="새로운 비밀번호를 입력하세요."
              autoComplete="true"
              errors={errors.newPassword && [errors.newPassword?.message]}
            />

            <Input
              type="password"
              id="passwordConfirm"
              required
              {...register("passwordConfirm")}
              placeholder="새로운 비밀번호 확인을 입력하세요."
              autoComplete="true"
              errors={
                errors.passwordConfirm && [errors.passwordConfirm?.message]
              }
            />

            <Button type="submit" text="Edit" />
          </form>
        </div>
      </div>
    </>
  );
}
