import Navigation from "@/app/components/navigation/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tweet Detail :: %s",
  description: "Tweet Detail",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
