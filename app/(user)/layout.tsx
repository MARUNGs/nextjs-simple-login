import Navigation from "../components/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
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
