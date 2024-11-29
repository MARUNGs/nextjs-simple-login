import zod from "zod";

export interface ILoginForm {
  email: string;
  username: string;
  password: string;
}

export interface IPrevStateProps {
  prevState: boolean;
  errors?: zod.ZodFormattedError<ILoginForm> | null;
}

export interface IFormState {
  success: boolean;
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
}
