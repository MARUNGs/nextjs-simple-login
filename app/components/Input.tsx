import { InputHTMLAttributes } from "react";
import { IInputProps } from "../types/input";
import { EmailIcon, PasswordIcon, UserIcon } from "../components/Icon";
import clsx from "clsx";

export default function Input({
  name,
  errors = [],
  ...props
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
  console.log(errors.length > 0);
  return (
    <>
      <label className="flex items-center relative">
        <span className="absolute ml-5">
          {name === "email" ? (
            <EmailIcon />
          ) : name === "user" ? (
            <UserIcon />
          ) : (
            <PasswordIcon />
          )}
        </span>
        <input
          {...props}
          name={name}
          className={clsx(
            "w-full rounded-full pl-12",
            "ring ring-transparent transition-shadow placeholder:drop-shadow peer",
            "focus:ring-green-500 focus:ring-offset-2",
            "invalid:focus:ring-red-500",
            errors.length > 0 && "ring-red-500"
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
