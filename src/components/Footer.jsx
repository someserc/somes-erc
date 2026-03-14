import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer
      className={`${montserrat.className} bg-primary-900 text-white mt-16`}
    >
      {/* Top Accent Strip */}
      <div className="h-1 w-full bg-secondary-600" />

      {/* Main Content */}
      <div className="w-full md:w-[85%] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Link href="/" className="w-fit">
              <Image
                src="/somes_logo.png"
                alt="SOMES Logo"
                width={90}
                height={90}
                className="h-16 w-auto"
                unoptimized
              />
            </Link>

            <p className="text-sm text-background-200 max-w-md leading-relaxed">
              Society of Mechanical Engineering Students (SOMES) is a
              student-driven technical society committed to mechanical
              excellence, innovation, and applied engineering intelligence.
            </p>

            <p className="text-sm">
              <span className="font-semibold text-secondary-600">Email:</span>{" "}
              <a
                href="mailto:someserc@ioepc.edu.np"
                className="hover:underline"
              >
                someserc@ioepc.edu.np
              </a>
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-secondary-600 mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                ["Notice", "/notice"],
                ["Events", "/events"],
                ["Projects", "/projects"],
                ["Committee", "/committee"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-secondary-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-secondary-600 mb-4">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                ["About", "/about"],
                ["Notes", "/notes"],
                ["Alumni", "/alumni"],
                ["Gallery", "/gallery"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-secondary-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="w-full md:w-[85%] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background-300 text-center md:text-left">
            © 2026 Society of Mechanical Engineering Students, Dharan, Nepal
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="https://www.facebook.com/somesioepcdharan"
              className="hover:text-secondary-600 transition-colors"
            >
              Facebook
            </Link>
            <span className="text-primary-700">•</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
