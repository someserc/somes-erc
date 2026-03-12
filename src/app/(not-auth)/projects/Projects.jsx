"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [projects, setProjects] = useState(null);
  const router = useRouter();

  useEffect(() => {
    document.title = "Projects | SOMES";

    const metaDesc = document.querySelector("meta[name='Projects of SOMES']");
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(err);
      }
    };
    getProjects();
  }, []);

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    router.push(`/projects/page/${page}`);
  };

  return (
    <section
      className={`w-full md:w-[85%] mx-auto mt-24 mb-20 ${montserrat.className}`}
    >
      {/* Section Header */}
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-widest text-primary-600 mb-2">
          Research & Innovation
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background-900">
          Student Projects
        </h2>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-background-200 rounded-2xl shadow-sm overflow-x-auto max-w-4xl mx-auto">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-background-50 border-b border-background-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-background-700">
                SN
              </th>
              <th className="px-4 py-3 text-left font-semibold text-background-700">
                Project Title
              </th>
              <th className="px-4 py-3 text-left font-semibold text-background-700">
                Category
              </th>
            </tr>
          </thead>

          <tbody>
            {projects?.docs?.map((project, index) => (
              <tr
                key={project._id}
                className="border-b border-background-100 hover:bg-background-50 transition"
              >
                <td className="px-4 py-3 text-background-600">{index + 1}</td>
                <td className="px-4 py-3">
                  <Link
                    href={project.file}
                    className="text-primary-600 hover:underline font-medium"
                  >
                    {project.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-background-700">
                  {project.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {projects?.docs && (
          <div className="flex items-center justify-center gap-6 py-6">
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className="disabled:text-background-300 text-primary-600"
            >
              <ArrowBackIosNewOutlined fontSize="small" />
            </button>

            <span className="text-sm text-background-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="disabled:text-background-300 text-primary-600"
            >
              <ArrowForwardIosOutlined fontSize="small" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
