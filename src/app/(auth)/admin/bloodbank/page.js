"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 10;

const initialDonor = {
  name: "",
  bloodgroup: "A+",
  address: "",
  contactNo: "",
};

const AdminBloodPanel = () => {
  const [donors, setDonors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState(initialDonor);

  //   useEffect(() => {
  //     document.title = "Admin Panel | Blood Bank";

  //     // Simulated fetch for demonstration
  //     const fetchDonors = async () => {
  //       const localDonors = JSON.parse(localStorage.getItem("donors") || "[]");
  //       setDonors(localDonors);
  //     };

  //     fetchDonors();
  //   }, []);
  useEffect(() => {
    const getDonors = async () => {
      try {
        let response = await fetch("/api/bloodgroup");
        response = await response.json();

        setDonors(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDonors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      try {
        const res = await fetch(`/api/bloodgroup/${editIndex}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const updated = await res.json();

        if (res.ok) {
          const updatedDonors = donors.map((donor) =>
            donor._id === updated._id ? updated : donor
          );
          setDonors(updatedDonors);
        } else {
          console.error("Update failed:", updated.message);
        }
      } catch (error) {
        console.error("Error during update:", error);
      }
    } else {
      // ADD
      try {
        const res = await fetch("/api/bloodgroup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const newDonor = await res.json();

        if (res.ok) {
          setDonors([newDonor, ...donors]);
        } else {
          console.error("Add failed:", newDonor.message);
        }
      } catch (error) {
        console.error("Error during add:", error);
      }
    }

    setModalVisible(false);
    setFormData(initialDonor);
    setEditIndex(null);
  };

  useEffect(() => {
    const filtered =
      bloodGroup === "all"
        ? donors
        : donors.filter((donor) => donor.bloodgroup === bloodGroup);

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    setFilteredData(filtered.slice(start, end));
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  }, [donors, bloodGroup, currentPage]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    const donorToEdit = donors.find((donor) => donor._id === id);
    if (donorToEdit) {
      setFormData(donorToEdit);
      setEditIndex(id); // use ID instead of index
      setModalVisible(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/bloodgroup/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDonors(donors.filter((donor) => donor._id !== id));
      } else {
        const error = await res.json();
        console.error("Delete failed:", error.message);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };
  const deleteNoticeConfirmation = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this blood group?"
    );

    if (userConfirmed) {
      handleDelete(id);
    }
  };
  return (
    <div className="shadow-lg mt-5 rounded-lg flex flex-col w-full max-w-6xl mx-auto min-h-[50rem] bg-[#fcfcfc]">
      {/* Header */}
      <div className="bg-background-color text-primary-500 flex justify-between items-center h-12 px-4 rounded-t-lg">
        <h2 className="font-bold text-xl font-[Montserrat]">
          Admin Blood Bank
        </h2>
        <button
          onClick={() => {
            setFormData(initialDonor);
            setEditIndex(null);
            setModalVisible(true);
          }}
          className="bg-white text-background-color font-semibold px-3 py-1 rounded-lg"
        >
          + Add Donor
        </button>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center p-4 flex-wrap gap-2">
        <div className="flex items-center space-x-4">
          <label htmlFor="group" className="font-semibold font-[Poppins]">
            Filter:
          </label>
          <select
            id="group"
            onChange={handleBloodGroupChange}
            className="rounded-lg w-24 cursor-pointer bg-white border-2 border-background-color p-1"
          >
            {["all", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
              (group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto px-2">
        <table className="w-full text-center font-[Poppins]">
          <thead>
            <tr className="bg-background-color text-secondary-500">
              <th className="p-2 text-base">Name</th>
              <th className="p-2 text-base">Blood Group</th>
              <th className="p-2 text-base">Address</th>
              <th className="p-2 text-base">Contact No.</th>
              <th className="p-2 text-base">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.tr
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className={
                    index % 2 === 0 ? "bg-[#0f29804b]" : "bg-[#f5f3f3]"
                  }
                >
                  <td className="p-2 uppercase">{item.name}</td>
                  <td className="p-2">{item.bloodgroup}</td>
                  <td className="p-2">{item.address}</td>
                  <td className="p-2">{item.contactNo}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-primary-300 text-white px-2 py-1 rounded font-semibold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNoticeConfirmation(item._id)}
                      className="bg-primary-300 text-white mx-2 px-2 py-1 rounded font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4 mb-6">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md font-[Poppins] ${
              currentPage === i + 1
                ? "bg-background-color text-primary-400"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg space-y-4 font-[Poppins]">
            <h3 className="text-xl font-bold text-center">
              {editIndex !== null ? "Edit Donor" : "Add Donor"}
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
              <select
                name="bloodgroup"
                value={formData.bloodgroup}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              >
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
              <input
                type="text"
                name="address"
                value={formData.address}
                placeholder="Address"
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                placeholder="Contact No."
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="px-3 py-1 rounded bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-primary-500 text-white"
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBloodPanel;
