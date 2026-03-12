"use client"
import AdminNav from "@/components/NavBar/AdminNav";
import AdminTopNav from "@/components/NavBar/AdminTopNav";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AdminLayout = ({ Component, pageProps }) => {
  const router = useRouter();
  const path = router.pathname;
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //This functions checks if the admin is authenticated or not
  const checkAdmin = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `/admin/isAdmin`,
        {
          credentials: "include",
        }
      ).then((r) => {
        return r.json();
      });
      if (data.status === "error") {
        router.push("/admin/login");
      } else {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsSidebarOpen(false);
    if (!path.includes("/admin/login")) checkAdmin();
  }, [path]);

  //set the layout of the admin login page
  if (path.includes("/admin/login")) return <Component {...pageProps} />;

  // Wait until loading is complete and isAdmin is updated
  if (loading || !isAdmin) {
    return <div className="w-full h-full"></div>;
  } else
    return (
      <div className="w-full h-fit flex bg-neutral-200 ">
        <div>
          <AdminNav
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
        <div className="w-full min-h-screen flex flex-col items-center bg-neutral-200 px-2 gap-5 ">
          <AdminTopNav
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className="w-[90%]">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    );
};

export default AdminLayout;
