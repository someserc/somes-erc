import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://someserc.ioepc.edu.np"),
  title: {
    default: "SOMES ERC | Society of Mechanical Engineering Students",
    template: "%s | SOMES ERC",
  },
  description:
    "Official website of the Society of Mechanical Engineering Students at IOE Purwanchal Campus, ERC. Explore events, notes, notices, projects, and student-led engineering initiatives.",
  keywords: [
    "SOMES",
    "SOMES ERC",
    "someserc.ioepc.edu.np",
    "IOE Purwanchal Campus",
    "IOEPC",
    "Purwanchal Campus",
    "Eastern Regional Campus",
    "Mechanical Engineering",
    "Society of Mechanical Engineering Students",
    "Engineering Notes",
    "ERC Dharan",
    "Mechanical Engineering Students Nepal",
    "Engineering Resources Nepal",
  ],
  applicationName: "SOMES ERC",
  authors: [{ name: "SOMES ERC", url: "https://someserc.ioepc.edu.np" }],
  creator: "SOMES ERC",
  publisher: "SOMES ERC",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://someserc.ioepc.edu.np",
    siteName: "SOMES ERC",
    title: "SOMES ERC | Society of Mechanical Engineering Students",
    description:
      "Official SOMES platform for IOE Purwanchal Campus ERC with events, academic notes, notices, projects, and student innovation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SOMES ERC at IOE Purwanchal Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOMES ERC | Society of Mechanical Engineering Students",
    description:
      "Official SOMES platform for IOE Purwanchal Campus ERC with events, academic notes, notices, projects, and student innovation.",
    images: ["/og-image.png"],
  },
  icons: {
    // icon: [
    //   { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    //   { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    // ],
    // shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
