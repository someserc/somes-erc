"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate, formatTime } from "@/utils/dateFormatter";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const windowVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const getNoticePreview = (notice) => {
  const plainText = (notice?.description || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plainText) {
    return "A new notice has been published. Open it to view the full details.";
  }

  return plainText.length > 180
    ? `${plainText.slice(0, 177).trim()}...`
    : plainText;
};

export default function LatestNoticePopup({ notice, open, onClose }) {
  const router = useRouter();

  if (!notice) {
    return null;
  }

  const formattedDate = notice?.createdAt ? formatDate(notice.createdAt) : "";
  const formattedTime = notice?.createdAt ? formatTime(notice.createdAt) : "";
  const preview = getNoticePreview(notice);
  const hasImage = Boolean(notice?.image);
  const isPdf = notice?.image?.toLowerCase().endsWith(".pdf");
  const noticeHref = `/notice/${notice?._id}`;

  const handleOpenNotice = () => {
    onClose?.();
    router.push(noticeHref);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/35 px-3 py-4 sm:px-4 sm:py-8 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={windowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl overflow-hidden rounded-[16px] sm:rounded-[20px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            <button
              type="button"
              onClick={handleOpenNotice}
              className="block w-full text-left"
              aria-label={`Open notice ${notice?.title || ""}`}
            >
              <div className="flex max-h-[75vh] sm:max-h-[82vh] min-h-[60vh] sm:min-h-[75vh] items-center justify-center bg-[#eef2f7] px-3 py-4 sm:px-4 sm:py-6 md:px-8">
                {hasImage && !isPdf ? (
                  <div className="flex aspect-[1/1.414] h-[55vh] sm:h-[65vh] md:h-[72vh] max-h-[55vh] sm:max-h-[65vh] md:max-h-[72vh] w-[min(85vw,45vh)] sm:w-[min(88vw,48vh)] md:w-[min(92vw,50vh)] max-w-full items-center justify-center overflow-hidden rounded-[12px] sm:rounded-[16px] border border-slate-200 bg-white p-1.5 sm:p-2 shadow-[0_22px_60px_rgba(15,23,42,0.14)]">
                    <img
                      src={notice.image}
                      alt={notice?.title || "Notice"}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[1/1.414] h-[55vh] sm:h-[65vh] md:h-[72vh] max-h-[55vh] sm:max-h-[65vh] md:max-h-[72vh] w-[min(85vw,45vh)] sm:w-[min(88vw,48vh)] md:w-[min(92vw,50vh)] max-w-full items-center justify-center rounded-[12px] sm:rounded-[16px] border border-slate-200 bg-white px-4 sm:px-6 md:px-8 shadow-[0_22px_60px_rgba(15,23,42,0.14)]">
                    <img
                      src="/somes_logo.png"
                      alt="Logo"
                      className="max-h-32 sm:max-h-36 md:max-h-40 w-auto object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 px-4 sm:px-5 md:px-6 py-3 sm:py-4">
                <div className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-2">
                  {notice?.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500">
                  {formattedDate ? <span>{formattedDate}</span> : null}
                  {formattedTime ? <span>{formattedTime}</span> : null}
                </div>
                <p className="mt-2 sm:mt-3 line-clamp-2 text-xs sm:text-sm text-slate-600">
                  {preview}
                </p>
              </div>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
