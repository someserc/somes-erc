"use client";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import NewEventCard from "@/components/NewEventCard";

const Events = ({ initialData }) => {
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [events, setEvents] = useState();

  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    document.title = "Events | SOMES";

    const metaDesc = document.querySelector("meta[name='Events of SOMES']");
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      const res = await fetch("/api/events")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTotalPages(data.totalPages);
          setEvents(data);
        })
        .catch((err) => {
          console.log("An error occured. Please check your code", err);
        });
    };

    getEvents();
  }, []);

  const handlePageClick = (pageNumber) => {
    router.push(`/events/page/${pageNumber}`);
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
    <div className="w-full min-h-[49rem] flex justify-center py-16 bg-neutral-100 ">
      <div className="w-full flex justify-center gap-5">
        <div className="w-full md:w-[65%] h-full flex flex-col items-center ">
          <div className="w-full grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
            {loading ? (
              <>
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="w-[90%] min-h-[20rem] flex flex-col gap-4 mb-4 "
                  >
                    <Skeleton className="h-[10rem]" />
                    <Skeleton className="h-[2rem]" width={"100%"} />
                    <Skeleton className="h-[1.5rem]" width={"80%"} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {events?.map((event, index) => (
                  <div key={index} className="flex justify-center mb-6 w-full">
                    <NewEventCard event={event} />
                  </div>
                ))}
              </>
            )}
          </div>
          {events?.docs && (
            <div className="h-fit flex items-center ">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-full h-full disabled:text-neutral-300 text-black "
              >
                <ArrowBackIosNewOutlined color="inherit" />
              </button>
              {renderPagination()}
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-full h-full disabled:text-neutral-300 text-black"
              >
                <ArrowForwardIosOutlined />
              </button>
            </div>
          )}
        </div>
        {/* <div className="w-[25%] hidden md:flex flex-col gap-8 ">
          <RecentNotice />
          <FollowUs />
        </div> */}
      </div>
    </div>
  );
};

export default Events;
