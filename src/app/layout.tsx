import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import MouseFollower from "@/components/MouseFollower";
import { GhostLoader } from "@/components/ui";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

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

// Site URL for canonical links
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ghostsavvy.com";

export const metadata: Metadata = {
  title: {
    default: "Ghost Savvy Studios | Premium Digital Product Studio",
    template: "%s | Ghost Savvy Studios",
  },
  description:
    "Premium digital product studio building exceptional experiences as ghost partners for agencies and startups. Focused on UI/UX design and development with discretion and quality.",
  generator: "Next.js",
  applicationName: "Ghost Savvy Studios",
  keywords: [
    "digital product studio",
    "UI/UX design",
    "web development",
    "mobile app development",
    "ghost development",
    "premium design",
    "agency partner",
  ],
  authors: [{ name: "Ghost Savvy Studios", url: siteUrl }],
  creator: "Ghost Savvy Studios",
  publisher: "Ghost Savvy Studios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "Ghost Savvy Studios | Premium Digital Product Studio",
    description:
      "Premium digital product studio building exceptional experiences as ghost partners for agencies and startups.",
    url: siteUrl,
    siteName: "Ghost Savvy Studios",
    images: [
      {
        url: `${siteUrl}/images/ghost savvy-01.png`,
        width: 1200,
        height: 630,
        alt: "Ghost Savvy Studios - Premium Digital Product Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghost Savvy Studios | Premium Digital Product Studio",
    description:
      "Premium digital product studio building exceptional experiences as ghost partners for agencies and startups.",
    creator: "@ghostsavvy",
    images: [`${siteUrl}/images/ghost savvy-01.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/images/ghost_savvy_icon.svg", type: "image/svg+xml" }],
    shortcut: "/images/ghost_savvy_icon.svg",
    apple: [
      { url: "/images/ghost_savvy_icon.svg" },
      { url: "/images/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/images/ghost_savvy_icon.svg",
      },
    ],
  },
  manifest: `${siteUrl}/manifest.json`,
  verification: {
    // Add your verification tokens here when available
    google: "google-site-verification=YOUR_VERIFICATION_ID",
  },
  category: "technology",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${aloeveraDisplay.variable}`}>
      <body className='font-display antialiased text-rendering-optimizeLegibility'>
        <GhostLoader />
        <MouseFollower />
        <Header />
        <main className='min-h-screen'>{children}</main>
        <Footer />

        {/* JSON-LD structured data for the organization */}
        <Script
          id='organization-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ghost Savvy Studios",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description:
                "Premium digital product studio building exceptional experiences as ghost partners for agencies and startups.",
              sameAs: [
                "https://twitter.com/ghostsavvy",
                "https://www.linkedin.com/company/ghostsavvy",
                "https://dribbble.com/ghostsavvy",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@ghostsavvy.com",
                contactType: "customer support",
              },
            }),
          }}
        />

        {/* Fast click for mobile devices */}
        <Script
          id='fast-click'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              if ('ontouchstart' in window) {
                document.documentElement.classList.add('touch-device');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
