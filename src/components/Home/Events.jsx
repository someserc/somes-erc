"use client";

import React, { useEffect, useState } from "react";
import NewEventCard from "../NewEventCard";
import RecentNotice from "../RecentNotice";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data || []);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    getEvents();
  }, []);

  const currentDate = new Date();

  const closestEvents = [...events]
    .sort((a, b) => {
      const diffA = Math.abs(
        new Date(a.date).getTime() - currentDate.getTime()
      );
      const diffB = Math.abs(
        new Date(b.date).getTime() - currentDate.getTime()
      );
      return diffA - diffB;
    })
    .slice(0, 4);

  return (
    <section
      className={`w-full md:w-[85%] mx-auto mt-24 ${montserrat.className}`}
    >
      {/* Section Header */}
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary-600 mb-2">
          Activities
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background-900">
          Recent Events
        </h2>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 2xl:grid-cols-[2fr_1fr] gap-12 items-start">
        {/* Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {closestEvents.length > 0 ? (
            closestEvents.map((event, index) => (
              <NewEventCard key={index} event={event} />
            ))
          ) : (
            <p className="text-background-600 text-sm">
              No events available at the moment.
            </p>
          )}
        </div>

        {/* Notices */}

        <RecentNotice />
      </div>
    </section>
  );
};

export default Events;
