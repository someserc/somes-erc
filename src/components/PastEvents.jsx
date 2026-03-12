"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { pastEvents } from "@/data/events";
import Image from "next/image";
import { upcomingEvents } from "@/data/events";
import { Montserrat, Roboto, Inter } from "next/font/google";
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

const PastEvents = ({ events }) => {
  const [page, setPage] = useState(0);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(events);
  useEffect(() => {
    loadMoreEvents();
  }, []);

  const loadMoreEvents = async () => {
    setLoading(true);
    setPage(page + 1);
    try {
      // let additionalEvents = [];
      const response = await fetch(`/admin/event?limit=${page + 1}`);
      const data = await response.json();
      // console.log(data.pastEvents)
      setDisplayedEvents(data.pastEvents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(displayedEvents);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between">
        <h1
          className={` ${montserrat.className} text-3xl md:text-5xl text-secondary-800 font-bold `}
        >
          Past Events
        </h1>
        {/* <button
          onClick={loadMoreEvents}
          disabled={loading || events?.length == displayedEvents?.length}
          className={` ${montserrat.className} border-2 rounded text-secondary-800 border-secondary-800 cursor-pointer px-5 py-3 text-base`}
        >
          See More
        </button> */}
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedEvents?.map((event, index) => (
          <div key={index} className="w-full max-h-[24rem] rounded-xl ">
            <div className="w-full h-full flex flex-col gap-4  ">
              <div className="w-full h-full flex justify-center items-center">
                <Image
                  alt="SOMES Events"
                  width={10}
                  height={10}
                  src={`${event.image}`}
                  className={`object-contain object-top w-full border-2 rounded-lg`}
                  unoptimized
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {events?.length !== displayedEvents?.length && (
        <div className="w-full flex justify-center ">
          {/* <button
          onClick={loadMoreEvents}
          disabled={loading || events?.length == displayedEvents?.length}
          className="py-3 px-16 bg-secondary-400 rounded-xl font-semibold text-xl text-white "
        >
          {loading ? 'Loading...' : 'Load More'}
        </button> */}
          <button
            onClick={loadMoreEvents}
            disabled={loading || events?.length == displayedEvents?.length}
            className={` ${montserrat.className} border-2 rounded text-secondary-800 border-secondary-800 cursor-pointer px-5 py-3 text-base`}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PastEvents;
