import AdminNav from "@/components/NavBar/AdminNav";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
