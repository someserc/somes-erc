"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["100", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const EventCard = ({ event }) => {
  const [scope, animate] = useAnimate();
  const [expandImage, setExpandImage] = useState(false);
  function sequence() {
    animate([
      ["#layer", { height: "100%" }, { duration: 0.1 }],
      ["#event_name", { y: -20, opacity: 1 }, { duration: 0.3 }],
    ]);
  }
  function sequenceExit() {
    animate([
      ["#event_name", { y: 0, opacity: 0 }, { duration: 0.1 }],
      ["#layer", { height: "0%" }, { duration: 0.1 }],
    ]);
  }
  return (
    <motion.div
      ref={scope}
      onMouseEnter={sequence}
      onMouseLeave={sequenceExit}
      className="group w-full max-h-[24rem] rounded-xl relative cursor-pointer overflow-hidden "
    >
      {/* <div className="layer group-hover:w-full group-hover:h-full h-0 absolute bottom-0 duration-200 bg-gradient-to-t from-[#0000009f] to-[#ffffff02] ">
        <span className="hidden group-hover:block">{event.name}</span>
      </div> */}
      <div
        id="layer"
        className="absolute bottom-0 bg-gradient-to-t w-full from-[#0000009f] to-[#ffffff02] "
      >
        <div className={`w-full flex justify-center ${montserrat.className} `}>
          {event.registration && (
            <Link
              href={event.registration}
              className="w-full flex justify-center"
              target="__blank"
            >
              <button
                id="event_name"
                className="absolute bottom-0 text-white mx-auto flex justify-center font-medium text-xl z-[20] bg-primary-300 hover:bg-primary-400 transition-colors duration-300 opacity-0 px-16 py-2 rounded-lg "
              >
                Register
              </button>
            </Link>
          )}
          {event.facebook && (
            <Link
              href={event.facebook}
              className="w-full flex justify-center "
              target="__blank"
            >
              <button
                id="event_name"
                className="absolute bottom-0 text-white mx-auto flex justify-center font-medium text-xl z-[20] bg-primary-300 hover:bg-primary-400 transition-colors duration-300 opacity-0 px-16 py-2 rounded-lg "
              >
                Facebook
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className=" w-full h-full flex flex-col gap-4 ">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            alt="SOMES Events"
            width={10}
            height={10}
            src={`${event.image}`}
            className={`object-contain w-full rounded-lg`}
            unoptimized
          />
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
