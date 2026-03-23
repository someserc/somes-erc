"use client";

import React, { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Testimonials = ({
  initialTestimonials,
  loading: externalLoading = false,
}) => {
  const sliderRef = useRef(null);
  const hasInitialTestimonials = initialTestimonials !== undefined;
  const [testimonials, setTestimonials] = useState(initialTestimonials || []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (hasInitialTestimonials) {
      setTestimonials(initialTestimonials || []);
    }
  }, [hasInitialTestimonials, initialTestimonials]);

  useEffect(() => {
    if (hasInitialTestimonials) {
      setMounted(true);
      return;
    }

    const getTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonial");
        const data = await res.json();
        if (data.success) setTestimonials(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getTestimonials();
    // mark as mounted so we only render client-only slider after hydration
    setMounted(true);
  }, [hasInitialTestimonials]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 6000, // auto-scroll every 6 seconds
    slidesToShow: 1, // ONLY ONE CARD
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
    pauseOnHover: true,

    appendDots: (dots) => (
      <ul className="flex justify-center gap-2 mt-6">{dots}</ul>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 rounded-full bg-background-300 hover:bg-primary-600 transition" />
    ),
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      className={`w-full md:w-[85%] mx-auto mt-24 ${montserrat.className}`}
    >
      {/* Section Header */}
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-widest text-primary-600 mb-2">
          Voices
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background-900">
          Testimonials
        </h2>
      </div>

      {/* Slider */}
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="hidden md:flex absolute -left-10 h-10 w-10 items-center justify-center rounded-full border border-background-300 text-primary-600 hover:bg-primary-50 transition"
          aria-label="Previous testimonial"
        >
          <ArrowBackIosNewOutlined fontSize="small" />
        </button>

        {/* Slider */}
        <div className="w-full">
          {externalLoading && !testimonials.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={`testimonial-skeleton-${index}`}
                  className="h-56 animate-pulse rounded-2xl bg-background-100"
                />
              ))}
            </div>
          ) : mounted ? (
            <Slider {...settings} ref={sliderRef}>
              {testimonials.map((item, index) => (
                <TestimonialCard key={item._id || index} item={item} />
              ))}
            </Slider>
          ) : (
            // placeholder on server / before hydration to avoid markup mismatch
            <div className="w-full h-48" aria-hidden="true" />
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="hidden  md:flex absolute -right-10 h-10 w-10 items-center justify-center rounded-full border border-background-300 text-primary-600 hover:bg-primary-50 transition"
          aria-label="Next testimonial"
        >
          <ArrowForwardIosOutlined fontSize="small" />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
