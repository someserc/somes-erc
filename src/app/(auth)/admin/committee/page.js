"use client";
import CreateCommittee from "@/components/Admin/Committee/CreateCommittee";
import CommitteeBoard from "@/components/Admin/CommitteeBoard";
import NoticeBoard from "@/components/Admin/NoticeBoard";
import FileUpload from "@/components/FileUpload";
import uploadToImageKit from "@/utils/uploadToImageKit";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Committee = ({ notices }) => {
  const [flag, setFlag] = useState(0);
  const [box, setBox] = useState(false);

  return (
    <div className="w-full h-fit md:min-h-[calc(100vh-4rem)] flex flex-col bg-neutral-200 px-8 ">
      <div className="mt-6 flex justify-between items-center">
        <h1 className="text-4xl">Committee</h1>
        <button
          className="btn  bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg duration-200 shadow-lg "
          onClick={() => setBox(!box)}
        >
          Add Member
        </button>
      </div>

      <div className="w-full h-fit flex flex-col lg:flex-row mt-4 gap-8">
        {/* <div className="lg:flex-1 h-fit bg-white rounded-lg p-2 px-8 py-8 ">
          <div className="text-2xl font-semibold ">
            <span>Add a Member</span>
          </div>

          <form
            encType="multipart/form-data"
            className="w-full flex flex-col mt-4 gap-4 "
            onSubmit={handlePublishClick}
          >
            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="name" className="text-lg">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
              />
            </div>

            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                name="photo"
                id="photo"
                className="bg-neutral-100"
              />
            </div>

            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="position" className="text-lg">
                Position
              </label>
              <textarea
                type="text"
                name="position"
                id="position"
                className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
              />
            </div>
            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="facebook" className="text-lg">
                Facebook
              </label>
              <textarea
                type="text"
                name="facebook"
                id="facebook"
                className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
              />
            </div>
            <div className="w-full flex px-2 gap-4">
              <button
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg "
                type="submit"
              >
                Publish
              </button>
              <button
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg"
                onClick={handleResetClick}
                type="button"
              >
                Reset
              </button>
            </div>
          </form>
        </div> */}

        <div className="lg:flex-[2] lg:mb-0 mb-8 max-h-[45rem] ">
          <div className="border-2">
            <CommitteeBoard flag={flag} setFlag={setFlag} />
          </div>
        </div>
      </div>
      {box && (
        <div className=" z-[200] absolute top-0 left-0 w-screen h-screen bg-black/40 flex flex-col justify-center items-center ">
          <div className=" relative bg-white rounded-lg p-5 ">
            <button
              className=" absolute top-5 right-5 text-black "
              onClick={() => {
                setBox(false);
              }}
            >
              <Close />
            </button>

            <CreateCommittee flag={flag} setFlag={setFlag} setBox={setBox} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Committee;
