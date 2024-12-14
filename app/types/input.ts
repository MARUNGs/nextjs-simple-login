import { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  errors?: string[]; // errors를 문자열 배열로 정의
};
