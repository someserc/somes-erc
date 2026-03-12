"use client";

import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import { useEffect } from "react";
import Faculty from "@/components/about/Faculty";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <>
      <Head>
        <title>About Us | SOMES</title>
        <meta name="description" content="About SOMES Mechanical Department" />
      </Head>

      <section
        className={`w-full md:w-[85%] mx-auto mt-24 mb-20 ${montserrat.className}`}
      >
        {/* Page Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-primary-600 mb-2">
            Society
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background-900">
            About SOMES
          </h1>
        </motion.div>

        {/* History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-background-900 mb-4">
              History
            </h2>
            <p className="text-sm md:text-base text-background-700 leading-relaxed text-justify">
              The Society of Mechanical Engineering Students (SOMES) is a
              non-political and non-profit organization of the Department of
              Mechanical Engineering, Purwanchal Campus. Established in 2013,
              SOMES has continuously enhanced the academic and professional
              environment of the campus through technical events, training
              programs, and collaboration with alumni and administration. The
              society aims to foster innovation, leadership, and professional
              readiness among mechanical engineering students.
            </p>
          </motion.div>

          {/* Logo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-sm mx-auto"
          >
            <Image
              src="/somes_logo.png"
              alt="SOMES Logo"
              width={400}
              height={400}
              className="w-full object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Faculty Section */}
        <Faculty />
      </section>
    </>
  );
};

export default About;
