"use client";

import { useEffect, useState } from "react";
import Events from "@/components/Home/Events";
import Hero from "@/components/Home/Hero";
import Messages from "@/components/Home/Messages";
import Testimonials from "@/components/Home/Testimonials";
import {
  fetchHomePageData,
  getCachedHomePageData,
} from "@/components/Home/homePageData";

const HOME_SPLASH_KEY = "somes-home-splash-seen";
const SPLASH_DURATION_MS = 2000;

const wait = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

export default function HomePageClient() {
  const [homeData, setHomeData] = useState(() => getCachedHomePageData());
  const [loading, setLoading] = useState(!getCachedHomePageData());
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      const hasSeenSplash = sessionStorage.getItem(HOME_SPLASH_KEY) === "true";

      if (!hasSeenSplash) {
        setShowSplash(true);
      }

      try {
        const preloadTask = fetchHomePageData().then((data) => {
          if (!isMounted) {
            return data;
          }

          setHomeData(data);
          setLoading(false);
          return data;
        });

        if (hasSeenSplash) {
          await preloadTask;
          return;
        }

        await Promise.all([preloadTask, wait(SPLASH_DURATION_MS)]);
        sessionStorage.setItem(HOME_SPLASH_KEY, "true");
      } catch (error) {
        console.error("Failed to preload home page data", error);
        if (isMounted) {
          setLoading(false);
        }
      } finally {
        if (isMounted) {
          setShowSplash(false);
        }
      }
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full min-h-[149rem] flex flex-col items-center">
      <div className="w-full md:h-[40rem]">
        <Hero showSplash={showSplash} />
      </div>

      <div className="w-[90%]">
        <Messages
          initialMessages={homeData?.messages}
          loading={loading && !homeData?.messages}
        />
      </div>

      <div className="w-[90%]">
        <Events
          initialEvents={homeData?.events}
          initialNotices={homeData?.notices}
          loading={loading && !homeData?.events}
        />
      </div>

      <div className="w-[90%]">
        <Testimonials
          initialTestimonials={homeData?.testimonials}
          loading={loading && !homeData?.testimonials}
        />
      </div>
    </div>
  );
}
