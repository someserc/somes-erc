"use client";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { Montserrat, Roboto, Inter } from "next/font/google";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import RecentNotice from "@/components/RecentNotice";
import FollowUs from "@/components/FollowUs";
const montserrat = Montserrat({
  weight: ["100", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
});
const inter = Inter({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
});

const ProjectPage = () => {
  const router = useRouter();
  const params = useParams();
  const pageno = Number(params.projectslug);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageno);
  const [totalPages, setTotalPages] = useState(1);
  const [projects, setProjects] = useState();

  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch(`/api/projects?page=${currentPage}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setProjects(data);
        })
        .catch((err) => {
          console.log("An error occured. Please check your code", err);
        });
    };

    getProjects();
  }, []);

  useEffect(() => {
    if (projects) {
      setTotalPages(projects.totalPages);

      setLoading(false);
    }
  }, [projects]);

  const handlePageClick = (pageNumber) => {
    if (pageNumber == 1) {
      router.push("/projects");
    } else {
      router.push(`/projects/page/${pageNumber}`);
    }
    // router.push(`/projects/page/${pageNumber}`);
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
    <div className="md:min-h-[49rem] w-full md:mt-10 flex ">
      <div
        className={`flex flex-col items-center h-full rounded w-full md:w-[70%] ${montserrat.className}`}
      >
        <h1 className=" md:text-[40px] font-bold">List of Projects</h1>
        <div className="w-full flex justify-center min-h-[36rem] ">
          <table className="w-[90%] md:w-[60%] h-fit mt-10 border-y-2 border-gray-400">
            <thead className="w-full border-y-2 border-gray-400 bg-gray-200">
              <tr className="w-full  border-y-2 border-gray-400 text-gray-600">
                <th className="w-[12%] py-2 border-y-2 border-gray-400">
                  <div className="w-full ">SN</div>
                </th>
                <th className="w-[95%] py-2 border-y-2 border-gray-400">
                  <div className="w-full">Name of Project</div>
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {projects?.docs?.map((project, i) => {
                return (
                  <tr className="w-full text-gray-700" key={project._id}>
                    <td className="w-[5%] border-y-2 border-gray-400">
                      <div className="w-full text-center">{i + 1}</div>
                    </td>
                    <td className="w-[95%] py-2 border-y-2 border-gray-400">
                      <div className="w-full text-center">
                        <Link href={`/projects/${project._id}`}>
                          {project.title}
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {projects?.docs && (
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
              className="w-full h-full disabled:text-neutral-300 text-black "
            >
              <ArrowForwardIosOutlined />
            </button>
          </div>
        )}
      </div>
      <div className="h-fit w-[25%] py-5 hidden md:flex flex-col gap-8 ">
        <RecentNotice />
        <FollowUs />
      </div>
    </div>
  );
};

export default ProjectPage;
