import { InputHTMLAttributes } from "react";
import { IInputProps } from "../types/input";
import { EmailIcon, PasswordIcon, UserIcon } from "../components/Icon";

export default function Input({
  name,
  errors = [],
  ...props
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        {name === "email" ? (
          <EmailIcon />
        ) : name === "user" ? (
          <UserIcon />
        ) : (
          <PasswordIcon />
        )}

        <input {...props} name={name} className="grow" />
      </label>

      {errors?.map((error, i) => (
        <div key={i} className="pl-5 -mt-2 text-red-500 font-medium">
          {error}
        </div>
      ))}
    </>
  );
}
