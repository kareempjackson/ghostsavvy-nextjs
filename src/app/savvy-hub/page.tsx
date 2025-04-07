import { Metadata } from "next";
import SavvyHubPage from "@/sections/hub/SavvyHubPage";

export const metadata: Metadata = {
  title: "Savvy Hub | Ghost Savvy Studios",
  description:
    "Explore Ghost Savvy's latest insights, articles, and podcast episodes on design, development, and innovation.",
};

export default function Page() {
  return <SavvyHubPage />;
}
