import Navigation from "../components/navigation/Navigation";
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
