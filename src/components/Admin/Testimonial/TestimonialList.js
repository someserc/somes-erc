"use client";
import { useState } from "react";
import TestimonialForm from "./TestimonialForm";

export default function TestimonialList({ testimonials, refresh }) {
  const [editing, setEditing] = useState(null);

  const handleDelete = async (id) => {
    await fetch(`/api/testimonial/${id}`, { method: "DELETE" });
    refresh();
  };

  const handleEdit = async (data) => {
    await fetch(`/api/testimonial/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setEditing(null);
    refresh();
  };

  return (
    <div>
      {editing && (
        <div className="mb-4">
          <h3 className="font-bold text-primary-400">Edit Testimonial</h3>
          <TestimonialForm
            initialData={editing}
            onSubmit={handleEdit}
            buttonLabel="Update"
            isEditing={true}
          />
        </div>
      )}
      <ul className="space-y-4">
        {testimonials.map((item) => (
          <li key={item._id} className="border p-4 rounded">
            <p>
              <strong>{item.name}</strong> - {item.post}
            </p>
            <p>{item.content}</p>
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover mt-2"
            />
            <div className="mt-2 space-x-2">
              <button
                className="text-blue-600"
                onClick={() => setEditing(item)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
