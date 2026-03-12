"use client";
import { notice } from "@/data/data";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  Delete,
} from "@mui/icons-material";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatDate, formatTime } from "@/utils/dateFormatter";

const NoticeBoard = ({ flag, setFlag, limit = 5 }) => {
  const [notices, setNotices] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNotice = async () => {
      const res = await fetch(`/api/notice?page=${currentPage}&&limit=${limit}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNotices(data);
        })
        .catch((err) => {
          console.log("An error occured. Please check your code", err);
        });
    };

    getNotice();
  }, [flag, currentPage]);

  const deleteNoticeConfirmation = (noticeId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (userConfirmed) {
      handleDelete(noticeId);
    }
  };

  const [editingNotice, setEditingNotice] = useState(null); // notice object being edited
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editContent, setEditContent] = useState("");

  const handleDelete = async (noticeId) => {
    try {
      const response = await fetch(`/api/notice/${noticeId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // Refresh notices after deletion (or use SWR's mutate function to update the cache)
        // For simplicity, you can refetch all notices
        const getNotice = async () => {
          const res = await fetch(`/api/notice`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              useNotices(data.docs);
            })
            .catch((err) => {
              console.log("An error occured. Please check your code", err);
            });
        };

        setFlag(flag + 1);
      } else {
        console.error("Failed to delete notice");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  useEffect(() => {
    if (notices) {
      setTotalPages(notices.totalPages);
      setLoading(false);
    }
  }, [notices]);

  const handlePageClick = (pageNumber) => {
    // router.push(`/notices/page/${pageNumber}`);
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
    <div className="h-full w-full bg-white rounded-lg p-2 px-8 py-6 flex flex-col gap-4 ">
      <div className="text-2xl font-semibold w-full flex justify-between">
        <span>Notice Board</span>
        {loading && <Loader2 className="animate-spin w-8 h-8" />}
      </div>

      <table className="w-full h-[80%]  border-collapse">
        <thead>
          <tr className="bg-neutral-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Notice</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(notices?.docs) &&
            notices?.docs?.map((notice) => {
              return (
                <tr key={notice._id} className="border-b">
                  <td className="p-2">
                    <Link
                      href={`/notice/${notice._id}`}
                      className="font-bold hover:text-primary-400"
                    >
                      {notice.title}
                    </Link>
                  </td>
                  <td className="p-2 text-gray-500">
                    {formatDate(notice.createdAt)}
                  </td>
                  <td className="p-2 text-gray-500">
                    {formatTime(notice.createdAt)}
                  </td>
                  <td className="p-2 text-gray-500">
                    <Link href={notice?.image || "#"} target="__blank">
                      See File
                    </Link>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => {
                        setEditingNotice(notice);
                        setEditTitle(notice.title);
                        setEditImage(notice.image || "");
                      }}
                      className="border-[2px] mx-3 text-sm py-1 px-2 rounded-lg text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white duration-300"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteNoticeConfirmation(notice._id)}
                      className="border-[2px] text-sm py-1 px-2 rounded-lg text-red-500 border-red-500 hover:bg-red-500 hover:text-white duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {editingNotice && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Notice</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full border px-4 py-2 mb-4 rounded"
              placeholder="Title"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditImage(e.target.files?.[0])}
              className="w-full border px-4 py-2 mb-4 rounded"
            />

            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full border px-4 py-2 mb-4 rounded"
              placeholder="Your Content"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingNotice(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const formData = new FormData();
                  formData.append("title", editTitle);
                  formData.append("image", editImage); // image can be a URL or File
                  formData.append("content", editContent);

                  const res = await fetch(`/api/notice/${editingNotice._id}`, {
                    method: "PUT",
                    body: formData,
                  });

                  if (res.ok) {
                    setEditingNotice(null);
                    setFlag(flag + 1); // Refresh notice list
                  } else {
                    const data = await res.json();
                    alert(`Failed to update: ${data.message}`);
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {notices?.docs && (
        <div className="h-fit flex items-center  ">
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

export default NoticeBoard;
