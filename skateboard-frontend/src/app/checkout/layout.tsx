import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Securely checkout and finalize your custom Victus Skateboard order.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
