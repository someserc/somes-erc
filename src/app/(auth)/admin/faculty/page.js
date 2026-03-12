"use client";

import React, { useEffect, useState } from "react";
import uploadToImageKit from "@/utils/uploadToImageKit";

const POSTS = ["HOD", "Deputy HOD", "Lecturer", "Coordinator"];
const QUALIFICATIONS = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
];

const AdminFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    post: "",
    qualification: "",
    image: "",
    phone: "",
    order: 0,
  });

  /* ---------------- FETCH ---------------- */
  const fetchFaculty = async () => {
    const res = await fetch("/api/faculty");
    const data = await res.json();
    setFaculty(data.data || []);
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  /* ---------------- FORM ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", post: "", phone: "", order: 0 });
    setEditingId(null);
  };

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editingId ? `/api/faculty/${editingId}` : "/api/faculty";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchFaculty();
    setLoading(false);
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      post: item.post,
      phone: item.phone,
      order: item.order || 0,
    });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!confirm("Delete this faculty member?")) return;

    await fetch(`/api/faculty/${id}`, { method: "DELETE" });
    fetchFaculty();
  };

  return (
    <section className="w-full md:w-[85%] mx-auto mt-16 mb-20">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Faculty Management (Mechanical)
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Faculty Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        />

        <select
          name="post"
          value={form.post}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        >
          <option value="">Select Post</option>
          {POSTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        >
          <option value="">Select Qualification</option>
          {QUALIFICATIONS.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const uploaded = await uploadToImageKit(e.target.files[0]);
            setForm({ ...form, image: uploaded.url });
          }}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="order"
          placeholder="Display Order"
          value={form.order}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700"
          >
            {editingId
              ? `${loading ? "Updating..." : "Update Faculty"}`
              : `${loading ? "Adding..." : "Add Faculty"}`}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Faculty List */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Post</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.post}</td>
                <td className="px-4 py-3">{item.phone}</td>
                <td className="px-4 py-3">{item.order}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-primary-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {faculty.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No faculty added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminFaculty;
