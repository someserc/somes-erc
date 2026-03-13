"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Montserrat } from "next/font/google";
import Head from "next/head";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    document.title = "Gallery | SOMES";
  }, []);

  useEffect(() => {
    const getGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();

        if (Array.isArray(data)) {
          setGallery(data);
        } else if (Array.isArray(data?.data)) {
          setGallery(data.data);
        } else {
          setGallery([]);
        }
      } catch (err) {
        console.error("Gallery fetch error", err);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };
    getGallery();
  }, []);

  return (
    <>
      <Head>
        <title>Gallery | Free Student Union</title>
      </Head>

      <section
        className={`w-full md:w-[85%] mx-auto mt-24 mb-20 ${montserrat.className}`}
      >
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-primary-600 mb-2">
            Moments
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background-900">
            Gallery
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl">
                <Skeleton height={220} className="mb-3 rounded-xl" />
                <Skeleton height={18} width="70%" />
              </div>
            ))
          ) : gallery.length > 0 ? (
            gallery
              .filter((item) => item._id)
              .map((item) => (
                <Link
                  key={item._id}
                  href={`/gallery/${item._id}`}
                  className="group bg-white border border-background-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.thumbnail_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>

                  {/* Title */}
                  <div className="p-4">
                    <h3 className="text-sm md:text-base font-semibold text-background-900 group-hover:text-primary-600 transition">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))
          ) : (
            <p className="text-background-600 text-sm col-span-full text-center">
              No gallery items found.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;
