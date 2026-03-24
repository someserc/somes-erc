import { CalendarMonth } from "@mui/icons-material";
import { Montserrat, Roboto, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { formatDate, formatTime } from "@/utils/dateFormatter";

const montserrat = Montserrat({
  weight: ["100", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
});
const inter = Inter({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
});

const NoticeCard = ({ notice }) => {
  const formattedDate = formatDate(notice.createdAt);
  const formattedTime = formatTime(notice.createdAt);

  return (
    <div
      className={`flex h-full w-full max-w-sm flex-col items-center gap-4 overflow-hidden rounded-lg border-2 border-secondary-800 ${montserrat.className}`}
    >
      {/* Top Image Section */}
      <div className="flex h-[10rem] w-full items-center justify-center">
        <Image
          alt="SOMES Logo"
          width={150}
          height={100}
          src="/somes_logo.png"
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Content Section */}
      <div className="flex w-full flex-col gap-2 overflow-hidden px-4 pb-4">
        <Link href={`/notice/${notice._id}`}>
          <div
            className={`text-xl font-semibold hover:text-primary-400 transition-colors duration-300 line-clamp-2 ${inter.className}`}
          >
            {notice.title}
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-neutral-500">
          <CalendarMonth color="inherit" />
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
