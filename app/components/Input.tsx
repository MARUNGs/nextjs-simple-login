import { InputHTMLAttributes } from "react";
import { IInputProps } from "../types/input";
import { BioIcon, EmailIcon, PasswordIcon, UserIcon } from "../components/Icon";
import clsx from "clsx";

export default function Input({
  name,
  errors = [],
  ...props
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label className="flex items-center relative">
        <span className="absolute ml-5">
          {name === "email" ? (
            <EmailIcon />
          ) : name === "username" ? (
            <UserIcon />
          ) : name === "bio" ? (
            <BioIcon />
          ) : (
            <PasswordIcon />
          )}
        </span>
        <input
          {...props}
          name={name}
          className={clsx(
            "w-full rounded-full pl-12",
            "ring ring-transparent transition-shadow",
            "invalid:focus:ring-red-500",
            errors.length > 0
              ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-2"
              : "border-stone-500 focus:border-stone-500 focus:ring-stone-100 focus:ring-offset-2"
          )}
        />
      </label>

      {errors?.map((error, i) => (
        <div key={i} className="pl-5 -mt-2 text-red-500 font-medium">
          {error}
        </div>
      ))}
    </>
  );
}
