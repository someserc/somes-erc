"use client";
import uploadToImageKit from "@/utils/uploadToImageKit";
import { useState } from "react";

export default function TestimonialForm({
  initialData = {},
  buttonLabel,
  isEditing,
}) {
  const [form, setForm] = useState({
    content: initialData.content || "",
    image: initialData.image || "",
    post: initialData.post || "",
    name: initialData.name || "",
    facebook: initialData.facebook || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, isEditing = false, editId = null) => {
    e.preventDefault();

    const imageInput = document.getElementById("image");

    try {
      const formData = new FormData();

      // Upload image if new one selected
      if (imageInput.files.length > 0) {
        const uploadedUrl = await uploadToImageKit(imageInput.files[0]);
        if (!uploadedUrl) throw new Error("ImageKit Upload Error");
        formData.append("image", uploadedUrl.url);
      } else if (isEditing && imageInput.dataset.current) {
        formData.append("image", imageInput.dataset.current);
      } else if (!isEditing) {
        throw new Error("Image is required for new testimonial");
      }

      // ✅ Use React state instead of DOM
      formData.append("name", form.name);
      formData.append("content", form.content);
      formData.append("post", form.post);
      formData.append("facebook", form.facebook);

      const url = isEditing ? `/api/testimonial/${editId}` : "/api/testimonial";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit testimonial");
      }

      setForm({ content: "", image: "", post: "", name: "", facebook: "" });
      alert(isEditing ? "Testimonial updated!" : "Testimonial added!");
    } catch (error) {
      console.error(error);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, isEditing, initialData._id)}
      className="space-y-4"
    >
      {["name", "post", "facebook"].map((field) => (
        <input
          key={field}
          type="text"
          id={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="border px-3 py-2 w-full"
          required
        />
      ))}

      <input
        type="file"
        id="image"
        data-current={initialData.image}
        className="bg-neutral-100 border px-3 py-2 w-full"
      />

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        id="content"
        placeholder="Testimonial content"
        className="border px-3 py-2 w-full"
        required
        rows={5}
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
