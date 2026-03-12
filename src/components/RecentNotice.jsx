"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const RecentNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const res = await fetch("/api/notice");
        const data = await res.json();
        setNotices(data.docs || []);
      } catch (err) {
        console.error("Failed to fetch notices", err);
      } finally {
        setLoading(false);
      }
    };
    getNotices();
  }, []);

  return (
    <div
      className={`
        ${montserrat.className}
        bg-white
        border-2 border-dotted border-primary-600/50
        rounded-xl
        p-6
        shadow-md
      `}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-primary-600">
          Recent Notices
        </h3>
        <span className="text-xs text-background-500">Updates</span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={16} className="rounded" />
          ))}
        </div>
      ) : notices.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {notices.map((item) => (
            <li
              key={item._id}
              className="
                flex items-start gap-3
                border-l-2 border-primary-600/40
                pl-3
                hover:border-primary-600
                transition
              "
            >
              <Image
                src="/icons/notice.png"
                alt="Notice"
                width={18}
                height={18}
                className="mt-1 object-contain"
                unoptimized
              />

              <Link
                href={`/notice/${item._id}`}
                className="
                  text-sm
                  text-background-700
                  hover:text-primary-600
                  transition
                  leading-snug
                "
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-background-600">
          No notices available at the moment.
        </p>
      )}
    </div>
  );
};

export default RecentNotice;
