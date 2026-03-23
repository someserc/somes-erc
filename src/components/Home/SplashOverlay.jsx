"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSplash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 z-[100] overflow-hidden bg-background-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(11,95,255,0.18),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.14),_transparent_32%)]" />

      <div className="relative flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full max-w-xs flex-col items-center rounded-[2rem] border border-white/60 bg-white/80 px-10 py-12 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl"
        >
          <div className="relative flex h-32 w-32 items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-primary-600/20 border-t-primary-600/70"
            />
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="rounded-full bg-white p-5 shadow-[0_10px_30px_rgba(11,95,255,0.14)]"
            >
              <Image
                src="/somes_logo.png"
                alt="SOMES Logo"
                width={72}
                height={72}
                priority
              />
            </motion.div>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {[0, 1, 2].map((item) => (
              <motion.span
                key={item}
                animate={{ opacity: [0.35, 1, 0.35], y: [0, -4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  delay: item * 0.15,
                  ease: "easeInOut",
                }}
                className="h-2.5 w-2.5 rounded-full bg-primary-600"
              />
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0.2, opacity: 0.7 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.4,
              ease: "easeInOut",
            }}
            className="mt-5 h-[3px] w-24 origin-center rounded-full bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
