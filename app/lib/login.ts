import { redirect } from "next/navigation";
import getSession from "./session";

export async function loginUser({ user_no }: { user_no: number }) {
  const session = await getSession();
  session.id = user_no;
  await session.save();
  // 화면이동
  return redirect("/profile");
}
