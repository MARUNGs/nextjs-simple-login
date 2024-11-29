import Button from "./Button";
import { Chat } from "./Icon";
import getSession from "../lib/session";
import { redirect } from "next/navigation";

export default function Navigation() {
  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Chat width="60" height="60" />
      </div>

      <form action={logout}>
        <Button text="Logout" />
      </form>
    </>
  );
}
