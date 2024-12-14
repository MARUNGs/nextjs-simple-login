"use client";
import Button from "../Button";
import clsx from "clsx";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema } from "@/app/(user)/users/[username]/edit/schema";
import { edit } from "@/app/(user)/users/[username]/edit/server";

interface IEditProps {
  username: string;
  email: string;
  bio: string;
  user_no: number;
  password?: string;
  passwordConfirm?: string;
}

export default function UserEditContent({ user }: { user: IEditProps }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditProps>({
    resolver: zodResolver(editFormSchema),
  });

  async function onValid() {
    // 검증 이후 처리
    const onSubmit = handleSubmit(
      async ({ username, email, bio, password }: IEditProps) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("bio", bio);
        formData.append("password", password);

        await edit(formData);
      }
    );

    await onSubmit();
  }

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
            <Input
              type="text"
              id="username"
              placeholder="사용자명을 입력하세요."
              {...register("username")}
              required
              defaultValue={user.username}
              errors={[errors.username?.message]}
            />
            <Input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요."
              required
              {...register("email")}
              defaultValue={user.email}
              errors={[errors.email?.message]}
            />
            <Input
              type="text"
              id="bio"
              placeholder="소개를 입력하세요."
              required
              {...register("bio")}
              defaultValue={user.bio}
              errors={[errors.bio?.message]}
            />
            <Input
              type="password"
              id="password"
              required
              {...register("password")}
              placeholder="현재 비밀번호를 입력하세요."
              errors={[errors.password?.message]}
            />
            <Input
              type="password"
              id="passwordConfirm"
              required
              {...register("passwordConfirm")}
              placeholder="비밀번호 확인을 입력하세요."
              errors={[errors.passwordConfirm?.message]}
            />

            <Button type="submit" text="Edit" />
          </form>
        </div>
      </div>
    </>
  );
}
