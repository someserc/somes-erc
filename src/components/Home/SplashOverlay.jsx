"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSplash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background-50"
    >
      <div className="relative flex flex-col items-center gap-6">
        <Image
          src="/somes_logo.png"
          alt="SOMES Logo"
          width={120}
          height={120}
          className="animate-pulse"
        />

        <div className="h-[2px] w-24 bg-primary-600 animate-pulse" />
      </div>
    </motion.div>
  );
}
