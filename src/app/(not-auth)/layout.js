import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import UserNav from "@/components/NavBar/UserNav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function NotAuthLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
