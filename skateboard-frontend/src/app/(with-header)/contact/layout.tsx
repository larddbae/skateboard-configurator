import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Victus Skateboard team for support, inquiries, or collaborations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
