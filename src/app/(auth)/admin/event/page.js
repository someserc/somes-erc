"use client";
import CreateEvent from "@/components/Admin/Event/CreateEvent";
import EventTable from "@/components/Admin/eventTable";
import NoticeBoard from "@/components/Admin/NoticeBoard";
// import RichTextEditor from '@/components/RichTextEditor';
import { Close, DateRange } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

// const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
//   ssr: false, // This ensures the component is only rendered on the client side
// })

const poppins = Poppins({
  weight: ["400", "200", "100", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const AdminEvent = () => {
  const [box, setBox] = useState(false);
  const [flag, setFlag] = useState(0);

  return (
    <div className={`${poppins.className} py-10 px-5`}>
      <div className="flex gap-4 flex-col items-center ">
        <div className="w-full flex justify-end ">
          <button
            className="btn  bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg duration-200 shadow-lg "
            onClick={() => setBox(!box)}
          >
            Create an Event
          </button>
          {/* <dialog id="my_modal_1" className="modal ">
            <div className="modal-box w-fit flex justify-center ">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <CreateGallery flag={flag} setFlag={setFlag} />
            </div>
          </dialog> */}
        </div>
        <EventTable flag={flag} setFlag={setFlag} />
      </div>
      {/* Event Box */}
      {box && (
        <div className=" z-[200] absolute top-0 left-0 w-full min-h-screen bg-black/40 flex flex-col justify-center items-center ">
          <div className="w-[80%] relative my-10 bg-white rounded-lg p-5 ">
            <button
              className="absolute top-5 right-5 text-black "
              onClick={() => {
                setBox(false);
              }}
            >
              <Close />
            </button>
            <CreateEvent flag={flag} setFlag={setFlag} setBox={setBox} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvent;
