import { forwardRef } from "react";
import { BioIcon, EmailIcon, PasswordIcon, UserIcon } from "../components/Icon";
import clsx from "clsx";
import { InputProps } from "../types/input";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, errors = [], ...props }, ref) => {
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
            ref={ref}
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
);

Input.displayName = "Input";

export default Input;
