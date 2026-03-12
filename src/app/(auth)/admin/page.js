"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommitteeBoard from "@/components/Admin/CommitteeBoard";
import EventTable from "@/components/Admin/eventTable";
import GalleryTable from "@/components/Admin/galleryTable";
import NoticeBoard from "@/components/Admin/NoticeBoard";
import ProjectTable from "@/components/Admin/ProjectTable";

const Admin = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/admin/verify");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        setIsAdmin(true);
      } catch (error) {
        console.error("Admin verification failed:", error);
        router.push("/login");
      }
    };

    checkAdmin();
  }, [router]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-gray-600">
          <svg
            className="animate-spin h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-lg">Verifying admin access...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900 text-center w-full">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-gray-600">
          Manage your website content and settings
        </p>
      </div>

      {/* Quick Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: "Total Events",
            value: "24",
            icon: (
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            ),
          },
          {
            title: "Committee Members",
            value: "12",
            icon: (
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ),
          },
          {
            title: "Gallery Items",
            value: "56",
            icon: (
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            ),
          },
          {
            title: "Active Notices",
            value: "8",
            icon: (
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            ),
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50">
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {[
          { title: "Notice Board", component: NoticeBoard, icon: "bell" },
          { title: "Events", component: EventTable, icon: "calendar" },
          { title: "Gallery", component: GalleryTable, icon: "image" },
          { title: "Committee", component: CommitteeBoard, icon: "users" },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="max-h-[500px] overflow-auto">
              <section.component />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
