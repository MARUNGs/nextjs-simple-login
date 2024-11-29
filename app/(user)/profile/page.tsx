import { Chat } from "@/app/components/Icon";

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Chat width="60" height="60" />
      <h1 className="dark:text-white text-2xl">Profile</h1>
    </div>
  );
}
