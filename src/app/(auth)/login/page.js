"use client";

import Loading from "@/utils/loading";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminLogin = () => {
  const router = useRouter();

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!details.username || !details.password) {
      setMessage("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await response.json();

      if (response.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        setMessage(data.error || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background-50 px-4">
      <div className="w-full max-w-sm bg-white border border-background-200 rounded-2xl shadow-sm p-8">
        {/* Title */}
        <h1 className="text-xl font-semibold text-background-900 text-center mb-2">
          Admin Login
        </h1>

        <p className="text-sm text-background-600 text-center mb-6">
          Mechanical Department Administration
        </p>

        {/* Error Message */}
        {message && (
          <div className="mb-4 text-sm text-red-600 text-center">{message}</div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={details.username}
            autoComplete="off"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            className="w-full rounded-md border border-background-300 px-3 py-2 text-sm outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
          />

          <div className="relative">
            <input
              type={passwordType}
              placeholder="Password"
              value={details.password}
              autoComplete="off"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              className="w-full rounded-md border border-background-300 px-3 py-2 text-sm outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
            />

            {details.password && (
              <button
                type="button"
                onClick={() =>
                  setPasswordType(
                    passwordType === "password" ? "text" : "password"
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 text-background-500 hover:text-background-800"
              >
                {passwordType === "password" ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-2 w-full rounded-md bg-primary-600 py-2 text-sm font-medium text-white hover:bg-primary-700 transition disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5">
                <Loading color="white" />
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
