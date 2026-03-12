"use client"
import { AccountCircle, Menu } from "@mui/icons-material"
import { Montserrat } from "next/font/google"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const montserrat = Montserrat({
  weight: ["100", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
})

const AdminTopNav = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter()

  //Handles logout logic
  const handleLogoutClick = async () => {
    try {
      const result = await fetch(
        `/admin/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      ).then((r) => {
        return r.json()
      })
      if (result.status === "success") {
        router.push("/admin/login")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      className={`sticky top-0 h-[4rem] w-full flex items-center justify-between lg:justify-end px-4 relative ${montserrat.className} rounded-b-3xl bg-white shadow-lg `}>
      <div className={`flex lg:hidden cursor-pointer `}>
        <Menu
          fontSize="large"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen)
          }}
        />
      </div>
      <div className="dropdown relative ">
        <div tabIndex={0} role="button" className=" m-1 text-[36px] ">
          <AccountCircle color="primary" fontSize="inherit" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu absolute right-0 bg-base-100 rounded-md z-[1] w-52 p-2 shadow">
          <li>
            <button>Profile</button>
          </li>
          <li>
            <button onClick={handleLogoutClick}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminTopNav
