"use client";

import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProjectTable = ({ flag, setFlag }) => {
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
  }, [flag, currentPage]);

  const deleteProjectConfirmation = (projectId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (userConfirmed) {
      handleDelete(projectId);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`/api/projects?id=${projectId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setFlag(flag + 1);
      } else {
        console.error("Failed to delete gallery");
      }
    } catch (error) {
      console.error("Error deleting committee:", error);
    }
  };

  useEffect(() => {
    if (projects) {
      setTotalPages(projects.totalPages);

      setLoading(false);
    }
  }, [projects]);

  const handlePageClick = (pageNumber) => {
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
    <div className="h-full w-full bg-white rounded-lg p-2 px-8 py-8 flex flex-col gap-4 ">
      <div className="text-2xl font-semibold w-full flex justify-between">
        <span>Project Table</span>
        {loading && <Loader2 className="animate-spin w-8 h-8" />}
      </div>

      <table className="w-full  border-collapse h-[80%] overflow-scroll overflow-x-hidden">
        <thead>
          <tr className="bg-neutral-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2 text-center">File</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(projects?.docs) &&
            projects.docs.map((project) => (
              <tr key={project._id} className="border-b">
                <td className="p-2 font-bold">{project.title}</td>
                <td className="p-2 text-center">
                  <Link
                    href={project.file}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    View File
                  </Link>
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => deleteProjectConfirmation(project._id)}
                    className="border-[2px] text-sm py-1 px-2 rounded-lg text-red-500 border-red-500 hover:bg-red-500 hover:text-white duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

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
  );
};

export default ProjectTable;
