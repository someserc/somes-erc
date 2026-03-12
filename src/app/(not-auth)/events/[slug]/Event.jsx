"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

const montserrat = Montserrat({
  weight: ["100", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const EventSlug = () => {
  const params = useParams();
  const [event, setEvent] = useState();
  const { slug } = params;

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await fetch(`/api/events/${slug}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.log("An error occurred. Please check your code", err);
      }
    };
    getEvent();
  }, [slug]);

  const eventDate = event?.data?.date;
  const currentDate = new Date();
  const eventDateObject = new Date(eventDate);
  const completedEvent = eventDateObject < currentDate;

  const dateOptions = { day: "numeric", month: "long", year: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedDate = eventDateObject.toLocaleDateString(
    "en-US",
    dateOptions
  );
  const formattedTime = eventDateObject.toLocaleTimeString(
    "en-US",
    timeOptions
  );

  return (
    <main className={`max-w-4xl mx-auto px-4 py-8 ${montserrat.className}`}>
      {/* Header Section */}
      <div className="mb-8">
        <Link
          href="../"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to Events</span>
        </Link>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {event?.data?.title}
          </h1>

          <div className="flex flex-wrap gap-4 items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                completedEvent ? "bg-yellow-500" : "bg-green-600"
              }`}
            >
              {completedEvent ? "COMPLETED" : "UPCOMING"}
            </span>

            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{formattedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      {event?.data?.thumbnail_url && (
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={event.data.thumbnail_url}
            alt={event.data.title || "Event Image"}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700">{event?.data?.content}</p>
      </div>

      {/* Details Section */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>

        <div className="space-y-3">
          {event?.data?.registration && (
            <div className="flex items-center">
              <ExternalLink className="w-5 h-5 mr-3 text-gray-600" />
              <div>
                <span className="text-gray-600 mr-2">Registration:</span>
                <Link
                  href={event.data.registration}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  target="_blank"
                >
                  Register Now
                </Link>
              </div>
            </div>
          )}

          {completedEvent && (
            <div className="flex items-center">
              <ImageIcon className="w-5 h-5 mr-3 text-gray-600" />
              <div>
                <span className="text-gray-600 mr-2">Event Gallery:</span>
                <Link
                  href="/gallery"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  View Photos
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default EventSlug;
