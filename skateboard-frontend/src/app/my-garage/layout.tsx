import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Garage",
  description: "View and manage your saved custom skateboard builds in your personal Victus Garage.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
