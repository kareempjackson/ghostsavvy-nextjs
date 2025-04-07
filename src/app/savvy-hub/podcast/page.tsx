import { Metadata } from "next";
import PodcastPage from "@/sections/hub/PodcastPage";

export const metadata: Metadata = {
  title: "Beneath the Build Podcast | Ghost Savvy Studios",
  description:
    "Dive deep into the stories behind impactful products with industry insiders. Listen to conversations about product design, development, and innovation.",
};

export default function Page() {
  return <PodcastPage />;
}
