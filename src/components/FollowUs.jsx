import { FacebookOutlined, Instagram, LinkedIn } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const FollowUs = () => {
  return (
    <div
      className={`${montserrat.className} bg-white border border-background-200 rounded-xl p-6 shadow-sm`}
    >
      <h3 className="text-base font-semibold text-background-900 mb-4 text-center">
        Follow Us
      </h3>

      <p className="text-sm text-background-600 text-center mb-5">
        Stay connected for the latest updates and announcements.
      </p>

      <div className="flex items-center justify-center gap-6">
        <Link
          href="https://www.facebook.com/profile.php?id=61576373201271"
          target="_blank"
          aria-label="Facebook"
          className="text-background-600 hover:text-primary-600 transition"
        >
          <FacebookOutlined fontSize="large" />
        </Link>

        <Link
          href="https://www.instagram.com/fsuerc/"
          target="_blank"
          aria-label="Instagram"
          className="text-background-600 hover:text-secondary-600 transition"
        >
          <Instagram fontSize="large" />
        </Link>

        <Link
          href="https://www.linkedin.com/company/107169823"
          target="_blank"
          aria-label="LinkedIn"
          className="text-background-600 hover:text-primary-600 transition"
        >
          <LinkedIn fontSize="large" />
        </Link>
      </div>
    </div>
  );
};

export default FollowUs;
