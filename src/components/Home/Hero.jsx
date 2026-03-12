"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

import HeroSplash from "../../components/Home/SplashOverlay";

import Brain from "../brain/Brain";

import Link from "next/link";

const Hero = () => {
  const containerRef = useRef();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 800); // 0.8 seconds

    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <>
      <AnimatePresence>{showSplash && <HeroSplash />}</AnimatePresence>

      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden bg-background-50"
      >
        {/* Soft Background Glow */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-primary-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-secondary-600/10 blur-[120px]" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
          {/* LEFT — TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 mb-6 text-xs font-semibold tracking-widest uppercase text-primary-600">
              <span className="h-[2px] w-6 bg-primary-600" />
              Society of Mechanical Engineering Students
            </span>

            <h1 className="font-bold leading-tight text-background-900">
              <span className="block text-4xl md:text-5xl lg:text-6xl">
                Mech Makes My Mind
              </span>

              <span className="block my-4 text-3xl md:text-4xl lg:text-5xl font-light text-secondary-600">
                &
              </span>

              <span className="block text-4xl md:text-5xl lg:text-6xl">
                My Mind Makes Machine
              </span>
            </h1>

            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-base md:text-lg text-background-700">
              A student-driven technical society fostering mechanical
              excellence, innovation, and applied engineering intelligence.
            </p>

            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                className="rounded-md bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:bg-primary-700 hover:scale-[1.02]"
                href="/events"
              >
                Explore Events
              </Link>

              <Link
                className="rounded-md border border-primary-600 px-8 py-3 text-sm font-semibold text-primary-600 transition hover:bg-primary-50"
                href="/about"
              >
                About SOMES
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — BRAIN VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Animated Halo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="absolute h-[90%] w-[90%] rounded-full border border-primary-600/20"
            />

            <div className="relative w-[80%] max-w-[560px] aspect-square">
              <Brain scrollYProgress={scrollYProgress} />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
