"use client";
import useScrollBlock from "@/customHooks/useScrollBlock";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Poppins, Montserrat } from "next/font/google";
// import { Empty, Image, Space } from "antd";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "200", "100", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: ["400", "200", "100", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// app/gallery/[slug]/page.tsx

// ...existing code...

const GallerySlug = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [gallery, setGallery] = useState([]);
  const [popupIndex, setPopupIndex] = useState();
  const [blockScroll, allowScroll] = useScrollBlock();
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(true);
  const loader = [1, 2, 3, 4, 5, 6, 7, 8];

  const getGallery = async () => {
    try {
      const data = await fetch(`/api/gallery/${slug}`).then((r) => {
        return r.json();
      });

      setGallery(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      getGallery();
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
    setPopupIndex((prevIndex) => (prevIndex + 1) % gallery.images.length);
  };

  const showPrevImage = () => {
    setPopupIndex((prevIndex) =>
      prevIndex === 0 ? gallery.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex flex-col items-center min-h-[49rem] w-[100%]">
      <div className="w-[95%] flex h-[4rem] items-center mt-5 ">
        <svg
          width={40}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="cursor-pointer hover:scale-110 duration-300 w-[3%] "
          onClick={() => {
            router.push("/gallery");
          }}
        >
          <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z" />
        </svg>
        <div className="flex items-center justify-center relative h-full leading-[4rem] w-[97%]">
          <div
            className={`text-[36px] underline font-bold min-h-[4.5rem] ${montserrat.className} `}
          >
            {gallery && gallery.title}
          </div>
        </div>
      </div>
      {/* <div className="gallery w-full gap-2 pb-20 ">
        {loading
          ? loader?.map((item, i) => (
              <div
                key={i}
                className="w-[100%] md:w-[45%] lg:w-[23%] h-[20rem] mb-8 shadow-2xl rounded-lg "
              >
                <Skeleton className="h-full" />
              </div>
            ))
          : gallery?.images?.map((image, i) => (
              <div key={i} className="pics">
                <Image
                  alt="image"
                  // className=" w-full h-full object-center  mx-auto object-contain rounded-lg cursor-pointer hover:scale-95 duration-300 border-2 border-gray-900"
                  height={100}
                  width={100}
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${image.image_url}`}
                  priority
                  onClick={() => {
                    setSelectedId(image);
                    showImagePopup(i);
                  }}
                />
              </div>
            ))}
        {gallery?.images?.length === 0 && (
          <div className="w-full flex flex-col items-center ">
            <h2 className="text-[#b2b2b2] ">No Images to show</h2>
          </div>
        )}
      </div> */}
      <div className="w-[80%]">
        <div className="gallery w-full gap-2 pb-20 ">
          {loading
            ? loader?.map((item, i) => (
                <div
                  key={i}
                  className="w-full h-[20rem] mb-8 shadow-2xl rounded-lg "
                >
                  <Skeleton className="w-full h-full" />
                </div>
              ))
            : gallery?.images?.map((image, i) => (
                <div key={i} className="pics">
                  <img
                    alt="image"
                    src={`${image?.image_url}`}
                    onClick={() => {
                      setSelectedId(image);
                      showImagePopup(i);
                    }}
                  />
                </div>
              ))}
          {gallery?.images?.length === 0 && (
            <div className="w-full flex flex-col items-center ">
              <h2 className="text-[#b2b2b2] ">No Images to show</h2>
            </div>
          )}
        </div>
      </div>

      {popupIndex != null && (
        <motion.div className="fixed inset-0 flex flex-col items-center justify-center z-[100] bg-[rgba(0,0,0,0.7)]">
          <div className="relative w-[100vw] ">
            <button
              className="absolute right-10 bg-white p-2 rounded-full"
              onClick={hideImagePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full"
            onClick={() => {
              showNextImage();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full"
            onClick={() => {
              showPrevImage();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <AnimatePresence initial={false}>
            {selectedId != null && (
              <motion.div
                layoutId={gallery.images[popupIndex]}
                // key={gallery.images[popupIndex]} // Use the image URL as the key
              >
                <Image
                  src={`${gallery.images[popupIndex].image_url}`}
                  alt="popup-image"
                  width={400}
                  height={400}
                  className="object-contain w-[80vw] h-[90vh]"
                  unoptimized
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default GallerySlug;
