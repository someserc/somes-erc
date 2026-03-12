import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const TestimonialCard = ({ item }) => {
  return (
    <div className={`${montserrat.className} px-4`}>
      <div className="bg-white border border-background-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition h-full flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-5 border border-background-300">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Content */}
        <p className="text-sm md:text-base text-background-700 leading-relaxed mb-6">
          {item.content}
        </p>

        {/* Author */}
        <div className="mt-auto">
          <Link
            href={item.facebook}
            target="_blank"
            className="font-semibold text-background-900 hover:underline"
          >
            {item.name}
          </Link>
          <p className="text-xs text-primary-600 mt-1">{item.post}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
