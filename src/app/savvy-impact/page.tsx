import type { Metadata } from "next";
import SavvyImpactPage from "@/sections/impact/SavvyImpactPage";

export const metadata: Metadata = {
  title: "Savvy Impact | Ghost Savvy Studios",
  description:
    "Explore how Ghost Savvy Studios creates solutions that combine user-centric vision with engineered solutions to drive exceptional results.",
};

export default function SavvyImpact() {
  return <SavvyImpactPage />;
}
