import type { Metadata } from "next";
import AIServicesPage from "@/sections/ai-services/AIServicesPage";

export const metadata: Metadata = {
  title: "AI Services | Ghost Savvy Studios",
  description:
    "Ghost Savvy helps forward-thinking teams design, build, and integrate tailored AI agents that streamline operations, enhance product experiences, and accelerate scale.",
};

export default function AIServices() {
  return <AIServicesPage />;
}
