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
    <div className="relative flex flex-col items-center min-h-[49rem] w-full">
      {/* ERROR */}
      {error && (
        <div className="flex flex-col items-center justify-center min-h-[49rem]">
          <h2 className="text-red-500 text-2xl">{error}</h2>
          <button
            onClick={() => router.push("/gallery")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Back to Gallery
          </button>
        </div>
      )}

      {!error && (
        <>
          {/* TITLE */}
          <div className="w-[95%] flex h-[4rem] items-center mt-5">
            <svg
              width={40}
              viewBox="0 0 512 512"
              className="cursor-pointer hover:scale-110 duration-300 w-[3%]"
              onClick={() => router.push("/gallery")}
            >
              <path d="M256 0C114.6 0 0 114.6..." />
            </svg>

            <div className="flex items-center justify-center w-[97%]">
              <div
                className={`text-[36px] underline font-bold ${montserrat.className}`}
              >
                {gallery?.title}
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="w-[80%]">
            <div className="gallery w-full gap-2 pb-20">
              {loading
                ? loader.map((i) => (
                    <div
                      key={i}
                      className="w-full h-[20rem] mb-8 shadow-2xl rounded-lg"
                    >
                      <Skeleton className="w-full h-full" />
                    </div>
                  ))
                : gallery?.images?.map((image, i) => (
                    <div key={i} className="pics">
                      <Image
                        src={image.image_url}
                        alt="gallery-image"
                        width={600}
                        height={400}
                        className="cursor-pointer"
                        onClick={() => showImagePopup(i)}
                        unoptimized
                      />
                    </div>
                  ))}
            </div>
          </div>

          {/* POPUP */}
          {popupIndex !== null && (
            <motion.div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[100]">
              <button
                onClick={hideImagePopup}
                className="absolute top-8 right-8 bg-white p-2 rounded-full"
              >
                ✕
              </button>

              <button
                onClick={showPrevImage}
                className="absolute left-4 top-1/2 bg-white p-2 rounded-full"
              >
                ←
              </button>

              <button
                onClick={showNextImage}
                className="absolute right-4 top-1/2 bg-white p-2 rounded-full"
              >
                →
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
                    className="object-contain w-[80vw] h-[90vh]"
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
