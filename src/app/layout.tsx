import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import MouseFollower from "@/components/MouseFollower";
import { GhostLoader } from "@/components/ui";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";

// Load Aloevera Display as our main font
const aloeveraDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/AloeveraDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AloeveraDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/AloeveraDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/AloeveraDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/AloeveraDisplay-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/AloeveraDisplay-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/AloeveraDisplay-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-aloevera",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ghost Savvy Studios | Premium Digital Product Studio",
  description:
    "We build exceptional digital products as ghost partners for agencies and startups, prioritizing discretion and quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${aloeveraDisplay.variable} antialiased scroll-smooth`}
    >
      <body className='font-sans'>
        {/* Initial page loader */}
        <GhostLoader />

        <Header />
        <main>{children}</main>
        <Footer />
        <MouseFollower />
      </body>
    </html>
  );
}
