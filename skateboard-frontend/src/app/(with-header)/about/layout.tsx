import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Victus Skateboard, our mission, and our passion for streetwear and skate culture.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
