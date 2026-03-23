"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Messages = ({ initialMessages, loading: externalLoading = false }) => {
  const hasInitialMessages = initialMessages !== undefined;
  const [messages, setMessages] = useState(initialMessages || []);
  const [loading, setLoading] = useState(!hasInitialMessages);

  useEffect(() => {
    if (hasInitialMessages) {
      setMessages(initialMessages || []);
      setLoading(externalLoading);
    }
  }, [externalLoading, hasInitialMessages, initialMessages]);

  useEffect(() => {
    if (hasInitialMessages) {
      return;
    }

    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hasInitialMessages]);

  if (loading) {
    return (
      <section className="w-full md:w-[85%] mx-auto mt-16 text-center">
        <p>Loading messages...</p>
      </section>
    );
  }

  if (!messages.length) {
    return (
      <section className="w-full md:w-[85%] mx-auto mt-16 text-center">
        <p>No messages available.</p>
      </section>
    );
  }

  return (
    <section
      className={`w-full md:w-[85%] mx-auto mt-16 ${montserrat.className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.article
              key={message._id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`
                relative bg-white rounded-xl p-8 shadow-md
                border-l-4 border-primary-600
                hover:shadow-lg transition-shadow duration-300
                flex flex-col justify-between gap-6
                ${index === 2 ? "lg:col-span-2 lg:max-w-3xl lg:mx-auto" : ""}
              `}
            >
              {/* Header */}
              <div className="space-y-3">
                <h2 className="text-sm uppercase tracking-wider text-primary-600 font-semibold">
                  Message from {message.position}
                </h2>

                <p className="text-background-800 text-sm md:text-base leading-relaxed text-justify">
                  {message.message}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-background-200 flex items-center gap-5">
                <div className="w-16 h-16 rounded-md overflow-hidden border border-background-300">
                  <Image
                    alt={`Photo of ${message.name}`}
                    src={message.image || "/default.jpg"}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-base font-semibold text-background-900">
                    {message.name}
                  </span>
                  <span className="text-sm text-background-600">
                    {message.position}
                  </span>
                </div>

                <div className="ml-auto h-2 w-2 rounded-full bg-secondary-600" />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Messages;
