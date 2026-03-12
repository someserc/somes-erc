"use client";
import NoticeBoard from "@/components/Admin/NoticeBoard";
import CreateProject from "@/components/Admin/Project/CreateProject";
import ProjectTable from "@/components/Admin/ProjectTable";
// import ProjectTable from '@/components/Admin/projectTable';
// import ProjectTable
import Loading from "@/utils/loading";
import uploadToImageKit from "@/utils/uploadToImageKit";
import { Close } from "@mui/icons-material";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Project = () => {
  const [flag, setFlag] = useState(0);
  const [box, setBox] = useState(false);

  return (
    <div className="w-full h-fit md:min-h-[calc(100vh-4rem)] flex flex-col bg-neutral-200 px-8 ">
      <div className=" mt-6 flex justify-between items-center">
        <h1 className="text-4xl ">Project</h1>
        <button
          className="btn  bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg duration-200 shadow-lg "
          onClick={() => setBox(!box)}
        >
          Add Project
        </button>
      </div>
      <div className="w-full h-full  flex flex-col lg:flex-row mt-4 gap-8">
        {/* <div className="lg:flex-1 h-fit bg-white rounded-lg p-2 px-8 py-8 ">
            <div className="text-2xl font-semibold ">
              <span>Post a Project</span>
            </div>
            <form
              encType="multipart/form-data"
              className="w-full flex flex-col mt-4 gap-4 "
              onSubmit={handlePublishClick}
            >
              <div className="flex flex-col w-full gap-2 ">
                <label htmlFor="title" className="text-lg">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
                />
              </div>

              <div className="flex flex-col w-full h-fit gap-2">
                <label htmlFor="content" className="text-lg">
                  Content
                </label>

                <input name="content" type="file" id="content" />
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
          <div className=" h-[40rem] border-2">
            <ProjectTable flag={flag} setFlag={setFlag} />
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
            <CreateProject flag={flag} setFlag={setFlag} setBox={setBox} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
