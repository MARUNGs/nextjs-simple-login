"use client";
import clsx from "clsx";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ text }, ref) => {
  const { pending } = useFormStatus();

  return (
    <button
      ref={ref}
      disabled={pending}
      className={clsx(
        "bg-stone-300 pt-2 pb-2 font-semibold text-black",
        "active:scale-90 transition-transform",
        "mb-2 w-96 rounded-full"
      )}
    >
      {pending ? "loading ..." : text}
    </button>
  );
});

// 버튼 컴포넌트 이름 설정 :: forwardRef 사용 시 필요
Button.displayName = "Button";

export default Button;
