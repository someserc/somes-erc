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
  metadataBase: new URL("https://somes-erc.edu.np"),
  title: {
    default: "SOMES | Purwanchal Campus ERC",
    template: "%s | SOMES ERC",
  },
  description:
    "Society of Mechanical Engineering Students (SOMES) at Purwanchal Campus, ERC. Explore academic notes, events, resources, and student-driven engineering initiatives.",

  keywords: [
    "SOMES",
    "SOMES ERC",
    "Purwanchal Campus",
    "Mechanical Engineering",
    "Engineering Notes",
    "ERC Dharan",
    "Mechanical Engineering Students Nepal",
    "Engineering Resources Nepal",
  ],

  authors: [{ name: "SOMES ERC" }],
  creator: "SOMES Purwanchal Campus",
  publisher: "SOMES ERC",

  robots: {
    index: true,
    follow: true,
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
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://someserc.ioepc.edu.np",
    siteName: "SOMES ERC",
    title: "SOMES | Purwanchal Campus ERC",
    description:
      "Official SOMES platform of Purwanchal Campus ERC notes, events, academic resources, and student innovation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SOMES Purwanchal Campus ERC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SOMES | Purwanchal Campus ERC",
    description:
      "Official SOMES platform of Purwanchal Campus ERC — notes, events, academic resources, and student innovation.",
    images: ["/og-image.png"],
  },

  icons: {
    // shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

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
