"use client";

import useScrollBlock from "@/customHooks/useScrollBlock";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Montserrat } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const GallerySlug = () => {
  const router = useRouter();
  const { slug } = useParams();

  const [gallery, setGallery] = useState({});
  const [popupIndex, setPopupIndex] = useState(null);
  const [blockScroll, allowScroll] = useScrollBlock();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loader = [1, 2, 3, 4, 5, 6, 7, 8];

  const getGallery = async () => {
    try {
      const res = await fetch(`/api/gallery/${slug}`);

      if (!res.ok) throw new Error("Failed to fetch gallery");

      const data = await res.json();
      setGallery(data);
    } catch (err) {
      setError("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      getGallery();
    } else {
      setError("Invalid gallery ID");
      setLoading(false);
    }
  }, [slug]);

  const showImagePopup = (index) => {
    setPopupIndex(index);
    blockScroll();
  };

  const hideImagePopup = () => {
    setPopupIndex(null);
    allowScroll();
  };

  const showNextImage = () => {
    if (!gallery?.images?.length) return;

    setPopupIndex((prev) => (prev + 1) % gallery.images.length);
  };

  const showPrevImage = () => {
    if (!gallery?.images?.length) return;

    setPopupIndex((prev) =>
      prev === 0 ? gallery.images.length - 1 : prev - 1,
    );
  };

  return (
    <div className="relative flex min-h-[49rem] w-full flex-col items-center">
      {error && (
        <div className="flex min-h-[49rem] flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl text-red-500">{error}</h2>
          <button
            onClick={() => router.push("/gallery")}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Back to Gallery
          </button>
        </div>
      )}

      {!error && (
        <>
          <div className="mt-5 flex min-h-[4rem] w-[95%] items-center gap-3">
            <svg
              width={40}
              viewBox="0 0 512 512"
              className="h-6 w-6 shrink-0 cursor-pointer duration-300 hover:scale-110 md:h-8 md:w-8"
              onClick={() => router.push("/gallery")}
            >
              <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z" />
            </svg>

            <div className="flex w-full items-center justify-center">
              <div
                className={`text-center text-2xl font-bold underline md:text-[36px] ${montserrat.className}`}
              >
                {gallery?.title}
              </div>
            </div>
          </div>

          <div className="w-[92%] md:w-[88%] lg:w-[80%]">
            <div className="gallery w-full gap-2 pb-20">
              {loading
                ? loader.map((i) => (
                    <div
                      key={i}
                      className="mb-8 h-[20rem] w-full rounded-lg shadow-2xl"
                    >
                      <Skeleton className="h-full w-full" />
                    </div>
                  ))
                : gallery?.images?.map((image, i) => (
                    <div key={i} className="pics">
                      <Image
                        src={image.image_url}
                        alt="gallery-image"
                        width={600}
                        height={400}
                        className="h-auto w-full cursor-pointer"
                        onClick={() => showImagePopup(i)}
                        unoptimized
                      />
                    </div>
                  ))}
            </div>
          </div>

          {popupIndex !== null && (
            <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-3">
              <button
                onClick={hideImagePopup}
                className="absolute right-4 top-4 rounded-full bg-white p-2 md:right-8 md:top-8"
              >
                x
              </button>

              <button
                onClick={showPrevImage}
                className="absolute left-3 top-1/2 rounded-full bg-white p-2 md:left-4"
              >
                {"<"}
              </button>

              <button
                onClick={showNextImage}
                className="absolute right-3 top-1/2 rounded-full bg-white p-2 md:right-4"
              >
                {">"}
              </button>

              <AnimatePresence>
                <motion.div
                  key={gallery.images[popupIndex].image_url}
                  layoutId={gallery.images[popupIndex].image_url}
                >
                  <Image
                    src={gallery.images[popupIndex].image_url}
                    alt="popup-image"
                    width={800}
                    height={600}
                    className="h-[78vh] w-[86vw] object-contain md:h-[90vh] md:w-[80vw]"
                    priority
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default GallerySlug;
