"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/faqs";
import { ArrowDropDownCircleSharp } from "@mui/icons-material";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className={`w-full md:w-[85%] mx-auto mt-24 ${montserrat.className}`}
    >
      {/* Section Header */}
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-widest text-primary-600 mb-2">
          Help
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background-900">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col gap-5">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white border border-background-200 rounded-xl px-5 md:px-6 py-4 shadow-sm transition hover:shadow-md"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-base md:text-lg font-semibold text-background-900">
                {faq.question}
              </h3>

              <motion.span
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-primary-600"
              >
                <ArrowDropDownCircleSharp fontSize="large" />
              </motion.span>
            </button>

            {/* Answer */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden mt-4 text-sm md:text-base text-background-700 leading-relaxed"
                >
                  {faq.answer.includes("-") ? (
                    <ul className="list-disc list-inside space-y-1">
                      {faq.answer.split("\n-").map((point, idx) => (
                        <li key={idx}>{point.trim()}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
