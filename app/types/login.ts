import zod from "zod";

interface ILoginForm {
  email: string;
  username: string;
  password: string;
}

export interface IPrevStateProps {
  success: boolean;
  errors?: zod.ZodFormattedError<ILoginForm> | null;
}
