import { Montserrat } from "next/font/google";
import React from "react";
import Image from "next/image";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Welcome = () => {
  return (
    <section
      className={`w-full md:w-[85%] mx-auto mt-20 ${montserrat.className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-2xl border border-background-200 p-8 md:p-10 shadow-sm">
        {/* Left — Image */}
        <div className="relative w-full h-64 md:h-[22rem] rounded-xl overflow-hidden">
          <Image
            src="/campus.jpg"
            alt="Purwanchal Campus"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right — Text */}
        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">
            Welcome
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background-900">
            Purwanchal Campus
          </h2>

          <p className="text-sm md:text-base text-background-700 leading-relaxed text-justify">
            Purwanchal Campus, formerly known as Eastern Region (ERC) Campus, is
            one of the constituent campuses of Tribhuvan University (TU) and a
            key associate engineering campus of the Institute of Engineering
            (IOE). It is a comprehensive, non-profit institution of higher
            education in Nepal, funded by the Government of Nepal.
          </p>

          <p className="text-sm md:text-base text-background-700 leading-relaxed text-justify">
            Currently, the campus offers seven bachelor's degree programs and
            one master's degree program in Land and Water Engineering. Located
            at Gangalal Marg, Tinkune, Dharan-8, Sunsari, the campus spans 443
            ropani. With a focus on academic excellence, research, and
            innovation, Purwanchal Campus is dedicated to delivering quality
            engineering education.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
