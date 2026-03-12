"use client";

import { Menu } from "@mui/icons-material";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Notice", href: "/notice" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Committee", href: "/committee" },
  { label: "Gallery", href: "/gallery" },
  { label: "Alumni", href: "/alumni" },
  { label: "Notes", href: "/notes" },
];

const UserNav = () => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef();
  const pathname = usePathname();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const res = await fetch("/api/notice");
        const data = await res.json();
        setNotices(
          data.docs
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 5)
        );
      } catch (err) {
        console.error(err);
      }
    };
    getNotices();
  }, []);

  return (
    <header className={`${montserrat.className} w-full`}>
      {/* Main Navbar */}
      <div className="bg-white border-b border-background-200">
        <div className="w-[90%] mx-auto h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/somes_logo.png"
              alt="SOMES Logo"
              width={90}
              height={90}
              className="h-12 w-auto"
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition
                    ${
                      active
                        ? "text-primary-600 border-b-2 border-secondary-600"
                        : "text-background-800 hover:text-primary-600 hover:border-b-2 hover:border-secondary-600"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-background-800"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
          >
            <Menu fontSize="large" />
          </button>
        </div>
      </div>

      {/* Notice Marquee */}
      {notices.length > 0 && (
        <div className="bg-background-50 border-b border-background-200 overflow-hidden">
          <div className="flex items-center gap-6 animate-marquee px-4 py-2 hover:[animation-play-state:paused]">
            <span className="text-secondary-600 font-semibold shrink-0">
              Notices
            </span>
            {notices.map((notice, index) => (
              <Link
                key={index}
                href={`/notice/${notice._id}`}
                className="text-sm text-primary-700 hover:underline shrink-0"
              >
                {notice.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white border-b border-background-200 transition-all duration-300 ${
          menu ? "max-h-[600px]" : "max-h-0"
        } overflow-hidden`}
      >
        <nav className="py-6">
          <ul className="flex flex-col items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-background-800 font-medium hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UserNav;
