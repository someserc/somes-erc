"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const MemberCard = ({ member, highlight = false }) => {
  useEffect(() => {
    document.title = "Committee | SOMES";

    const metaDesc = document.querySelector("meta[name='Notices of SOMES']");
  }, []);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`flex flex-col items-center text-center ${
        highlight ? "scale-105" : ""
      }`}
    >
      <div className="relative w-56 h-56 rounded-xl overflow-hidden border border-background-300">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top"
          unoptimized
        />
      </div>

      <div className="mt-4 bg-white rounded-xl border border-background-200 shadow-sm px-5 py-3 w-full">
        <Link
          href={member.facebook}
          target="_blank"
          className="font-semibold text-background-900 hover:underline"
        >
          {member.name}
        </Link>
        <p className="text-sm text-primary-600 font-medium">
          {member.position}
        </p>
        <p className="text-xs text-background-600">{member.phone}</p>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const [committee, setCommittee] = useState([]);

  useEffect(() => {
    const getCommittee = async () => {
      try {
        const res = await fetch("/api/committee");
        const data = await res.json();
        setCommittee(data || []);
      } catch (err) {
        console.error("Failed to fetch committee", err);
      }
    };
    getCommittee();
  }, []);

  /* ---- Role separation ---- */
  const advisors = committee
    .filter((m) => m.position.toLowerCase() === "advisor")
    .slice(0, 2); // only two

  const president = committee.find(
    (m) => m.position.toLowerCase() === "president",
  );

  const executives = committee.filter((m) =>
    ["treasurer", "secretary", "vice-president", "vice-secretary"].includes(
      m.position.toLowerCase(),
    ),
  );

  const others = committee.filter(
    (m) =>
      ![
        "advisor",
        "president",
        "treasurer",
        "secretary",
        "vice-president",
        "vice-secretary",
      ].includes(m.position.toLowerCase()),
  );

  return (
    <section
      className={`w-full md:w-[85%] mx-auto mt-24 ${montserrat.className}`}
    >
      {/* Section Header */}
      <div className="mb-20 text-center">
        <p className="text-xs uppercase tracking-widest text-primary-600 mb-2">
          Leadership
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background-900">
          SOMES COMMITTEE
        </h2>
      </div>

      {/* Advisors + President */}
      {(president || advisors.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-10 mb-24">
          {/* Left Advisor */}
          <div className="flex justify-center md:justify-end">
            {advisors[0] && <MemberCard member={advisors[0]} />}
          </div>

          {/* President (center) */}
          <div className="flex justify-center">
            {president && <MemberCard member={president} highlight />}
          </div>

          {/* Right Advisor */}
          <div className="flex justify-center md:justify-start">
            {advisors[1] && <MemberCard member={advisors[1]} />}
          </div>
        </div>
      )}

      {/* Executives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-20">
        {executives.map((member, i) => (
          <MemberCard key={i} member={member} />
        ))}
      </div>

      {/* Other Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {others.map((member, i) => (
          <MemberCard key={i} member={member} />
        ))}
      </div>
    </section>
  );
};

export default Team;
