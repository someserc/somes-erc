"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarMonth } from "@mui/icons-material";
import useSWR from "swr";
import RecentNotice from "@/components/RecentNotice";
import { useParams, useRouter } from "next/navigation";
import { notice } from "@/data/data";
import { formatDate, formatTime } from "@/utils/dateFormatter";

const NoticeSlug = () => {
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [notice, setNotice] = useState();
  const router = useRouter();
  const params = useParams();

  const { slug } = params;

  // )

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const getNotice = async () => {
      const res = await fetch(`/api/notice/${slug}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNotice(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("An error occured. Please check your code", err);
        });
    };

    if (slug) {
      getNotice();
    }
  }, [slug]);

  const formattedDate = notice?.createdAt ? formatDate(notice?.createdAt) : "";
  const formattedTime = notice?.createdAt ? formatTime(notice?.createdAt) : "";

  const isPDF = notice?.image?.toLowerCase().endsWith(".pdf");

  // console.log(isPDF);

  if (!notice) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center ">
        Loading...
      </div>
    );
  } else {
    return (
      <div className="my-12 flex min-h-[49rem] w-full justify-center px-4 md:my-20">
        <div className="flex w-full max-w-7xl">
          <div className="w-full ">
            <div className="w-full flex flex-col items-center ">
              <div className="w-full mb-10 md:mb-14 ">
                <motion.h1 className="flex items-start gap-3 text-2xl font-extrabold text-black md:gap-5 md:text-4xl font-[Arial]">
                  <svg
                    width={40}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="mt-1 h-6 w-6 shrink-0 cursor-pointer duration-300 hover:scale-110 md:h-8 md:w-8 "
                    onClick={() => {
                      router.push("/notice");
                    }}
                  >
                    <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z" />
                  </svg>
                  {notice?.title}
                </motion.h1>

                <div className="flex min-h-[4rem] w-full flex-wrap items-center text-base text-neutral-500 md:text-lg ">
                  <CalendarMonth />
                  <span className="ml-2 font-semibold">
                    {formattedDate} {formattedTime}{" "}
                  </span>
                </div>
                <div className="mt-6 text-gray-800 text-base leading-7 font-sans whitespace-pre-line">
                  {notice?.description}
                </div>
              </div>
              <div className="flex w-full flex-col gap-8 lg:flex-row lg:justify-between ">
                <div className="flex-1 border-2 lg:w-[60%]">
                  {/* <Image
                  alt="notice image"
                  src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${notice.image}`}
                  width={100}
                  height={100}
                  className="cursor-pointer w-full "
                  unoptimized
                /> */}
                  {isPDF ? (
                    <iframe
                      src={`${notice?.image}`}
                      className="w-full h-[70vh] min-h-[28rem] md:h-[50rem] " // Adjust height as needed
                    ></iframe>
                  ) : (
                    <Image
                      alt="notice image"
                      src={`${notice?.image}`}
                      width={100}
                      height={100}
                      className="cursor-pointer h-auto w-full"
                      unoptimized
                    />
                  )}
                  {/* <div dangerouslySetInnerHTML={{ __html: notice.content }} /> */}
                </div>
                <div className="container hidden h-max lg:flex md:w-[30%] px-0 lg:px-5 py-0 lg:py-4">
                  <RecentNotice />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NoticeSlug;
