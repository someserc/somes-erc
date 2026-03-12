import React from 'react';
import EventCard from './EventCard';
import { upcomingEvents } from '@/data/events';
import { Montserrat, Roboto, Inter } from 'next/font/google';
const montserrat = Montserrat({
  weight: ['100', '300', '500', '600', '700', '800'],
  subsets: ['latin'],
});
const roboto = Roboto({
  weight: ['100', '300', '500', '700'],
  subsets: ['latin'],
});
const inter = Inter({
  weight: ['100', '300', '500', '700'],
  subsets: ['latin'],
});

const UpcomingEvents = ({ events }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between">
        <h1
          className={`${montserrat.className} text-3xl md:text-5xl text-secondary-800 font-bold`}
        >
          Upcoming Events
        </h1>
        {/* <p
          className={` ${montserrat.className} border-2 rounded text-secondary-800 border-secondary-800 cursor-pointer flex justify-center items-center px-2 md:py-3 text-base`}
        >
          See More
        </p> */}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events?.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
      {/* <div className="w-full flex justify-center ">
        <button className="py-3 px-16 bg-secondary-400 rounded-xl font-semibold text-xl text-white">
          Load More
        </button>
      </div> */}
    </div>
  );
};

export default UpcomingEvents;
