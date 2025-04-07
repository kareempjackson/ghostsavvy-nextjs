import { Metadata } from "next";
import SavvyVenturesPage from "@/sections/ventures/SavvyVenturesPage";

export const metadata: Metadata = {
  title: "Savvy Ventures | Ghost Savvy Studios",
  description:
    "Ghost Savvy Ventures partners with early-stage startups as a technical co-founder, providing engineering expertise in exchange for equity.",
};

export default function Page() {
  return <SavvyVenturesPage />;
}
