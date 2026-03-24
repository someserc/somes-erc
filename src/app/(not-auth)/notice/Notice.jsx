"use client";
import FollowUs from "@/components/FollowUs";
import NoticeCard from "@/components/NoticeCard";
import RecentNotice from "@/components/RecentNotice";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

const Notice = ({ initialData }) => {
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notices, setNotices] = useState();

  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getNotices = async () => {
      const res = await fetch("/api/notice")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTotalPages(data.totalPages);
          setNotices(data);
        })
        .catch((err) => {
          console.log("An error occured. Please check your code", err);
        });
    };

    getNotices();
  }, []);

  const handlePageClick = (pageNumber) => {
    router.push(`/notice/page/${pageNumber}`);
    setCurrentPage(pageNumber);
    setLoading(true);
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i == 1) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 px-3 py-2 ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </button>
        );
      } else if (Math.abs(currentPage - i) <= 2) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 px-3 py-2 ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </button>
        );
      } else if (i == totalPages) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 px-3 py-2 ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </button>
        );
      } else if (Math.abs(currentPage - i) == 3) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 px-3 py-2 ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            ...
          </button>
        );
      }
    }
    return pages;
  };
  return (
    <div className="flex min-h-[49rem] w-full justify-center bg-neutral-100 px-4 py-10 md:px-6 md:py-16">
      <div className="flex w-full max-w-7xl flex-col justify-center gap-8 lg:flex-row">
        <div className="flex h-full w-full flex-col items-center lg:w-[70%]">
          <div className="grid min-h-[44rem] w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <>
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="mb-4 flex min-h-[20rem] w-full flex-col gap-4"
                  >
                    <Skeleton className="h-[10rem]" />
                    <Skeleton className="h-[2rem]" width={"100%"} />
                    <Skeleton className="h-[1.5rem]" width={"80%"} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {notices?.docs?.map((notice, index) => (
                  <div key={index} className="w-full flex justify-center mb-6">
                    <NoticeCard notice={notice} />
                  </div>
                ))}
              </>
            )}
          </div>
          {notices?.docs && (
            <div className="mt-4 flex h-fit w-full flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-black disabled:text-neutral-300"
              >
                <ArrowBackIosNewOutlined color="inherit" />
              </button>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {renderPagination()}
              </div>
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-black disabled:text-neutral-300"
              >
                <ArrowForwardIosOutlined />
              </button>
            </div>
          )}
        </div>
        <div className="hidden w-full max-w-sm flex-col gap-8 self-start lg:flex">
          <RecentNotice />
          <FollowUs />
        </div>
      </div>
    </div>
  );
};

export default Notice;
