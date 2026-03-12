"use client";

import uploadToImageKit from "@/utils/uploadToImageKit";
import { useState } from "react";

export default function LeadershipMessageForm({
  initialData = {},
  buttonLabel,
  isEditing,
  onSuccess,
}) {
  const [form, setForm] = useState({
    position: initialData.position || "",
    name: initialData.name || "",
    message: initialData.message || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, isEditing = false, editId = null) => {
    e.preventDefault();

    const imageInput = document.getElementById("image");

    try {
      const formData = new FormData();

      if (imageInput.files.length > 0) {
        // New image selected → upload
        const uploadedUrl = await uploadToImageKit(imageInput.files[0]);
        if (!uploadedUrl) throw new Error("Image upload failed");
        formData.append("image", uploadedUrl.url);
      } else if (isEditing && imageInput.dataset.current) {
        // Editing → keep existing image
        formData.append("image", imageInput.dataset.current);
      } else if (!isEditing) {
        // New message → image required
        throw new Error("Image is required");
      }
      formData.append("position", form.position);
      formData.append("name", form.name);
      formData.append("message", form.message);

      const url = isEditing ? `/api/messages/${editId}` : "/api/messages";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }

      setForm({ position: "", name: "", message: "" });
      alert(isEditing ? "Message updated!" : "Message added!");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, isEditing, initialData._id)}
      className="space-y-4"
    >
      <select
        name="position"
        value={form.position}
        onChange={handleChange}
        className="border px-3 py-2 w-full"
        required
      >
        <option value="">Select Position</option>
        <option value="President">President</option>
        <option value="HOD">HOD</option>
      </select>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border px-3 py-2 w-full"
        required
      />

      <input
        type="file"
        id="image"
        data-current={initialData.image}
        className="border px-3 py-2 w-full bg-neutral-100"
      />

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
        className="border px-3 py-2 w-full"
        rows={5}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
