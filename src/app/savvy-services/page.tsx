import ServicesPage from "./ServicesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savvy Services | Ghost Savvy",
  description:
    "Explore our lineup of AI-powered services and products designed to elevate your digital presence.",
};

export default function Page() {
  return <ServicesPage />;
}
