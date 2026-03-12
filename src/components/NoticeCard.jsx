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
      className={`w-[80%] h-full md:h-[40%] flex flex-col items-center ${montserrat.className} gap-4 border-2 border-secondary-800 overflow-hidden rounded-lg`}
    >
      {/* Top Image Section */}
      <div className="w-full h-[10rem]  flex justify-center items-center">
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
      <div className="w-[90%] flex flex-col gap-2 overflow-hidden">
        <Link href={`/notice/${notice._id}`}>
          <div
            className={`text-xl font-semibold hover:text-primary-400 transition-colors duration-300 line-clamp-2 ${inter.className}`}
          >
            {notice.title}
          </div>
        </Link>
        <div className="text-neutral-500 font-sans font-semibold flex items-center gap-2 text-sm">
          <CalendarMonth color="inherit" />
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
