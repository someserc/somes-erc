"use client";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminNav = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { pathname } = usePathname();
  const path = pathname;

  return (
    <div className="drawer lg:drawer-open top-0 z-[100]">
      <div className=" drawer-side  shadow-lg  ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className=" h-full flex flex-col  ">
          <header className="relative h-fit w-fit  flex flex-col justify-center items-center ">
            <div className="absolute top-2 right-2 flex lg:hidden ">
              <Close
                fontSize="large"
                className="cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              />
            </div>
            {/* <div className="flex">
              <Image
                src="https://placehold.co/680x320"
                alt=""
                height={10}
                width={10}
                className="w-full h-full object-cover"
              />
            </div> */}
          </header>
          <ul className="menu bg-base-200 text-base-content h-full min-w-90 w-full p-4 bg-white ">
            <Link
              className={`sm:p-4 py-4 px-1 duration-300 ${
                path === "/admin"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin"
            >
              Dashboard
            </Link>
            <Link
              className={`sm:p-4 py-4 px-1   duration-300 ${
                path === "/admin/notice"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin/notice"
            >
              Notice
            </Link>
            <Link
              className={`sm:p-4 py-4 px-1   duration-300 ${
                path === "/admin/event"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin/event"
            >
              Event
            </Link>
            <Link
              className={`sm:p-4 py-4 px-1  duration-300 ${
                path === "/admin/project"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin/project"
            >
              Project
            </Link>
            <Link
              className={`sm:p-4 py-4 px-1  duration-300 ${
                path === "/admin/committee"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin/committee"
            >
              Committee
            </Link>
            <Link
              className={`sm:p-4 py-4 px-1 duration-300 ${
                path === "/admin/gallery"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin/gallery"
            >
              Gallery
            </Link>
            <Link
              className={`sm:p-4 py-4 px-1 duration-300 ${
                path === "/admin/faculty"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin/faculty"
            >
              Faculty Members
            </Link>
            <Link
              className={`sm:p-4 py-4 px-1 duration-300 ${
                path === "/admin/testimonial"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin/testimonial"
            >
              Testimonials
            </Link>
            <Link
              className={`sm:p-4 py-4 px-1 duration-300 ${
                path === "/admin/messages"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin/messages"
            >
              Messages
            </Link>
            <Link
              className={`sm:p-4 py-4 px-1 duration-300 ${
                path === "/admin/messages"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-neutral-200"
              } `}
              href="/admin/notes"
            >
              Notes
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
