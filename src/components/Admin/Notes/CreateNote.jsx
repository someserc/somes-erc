"use client";

import { useEffect, useState } from "react";

export default function CreateNote({
  initialData = {},
  isEditing = false,
  onSuccess,
  setBox,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    courseType: "",
    semester: "",
    subject: "",
    difficulty: "",
    driveLinks: [{ title: "", url: "" }],
    youtubeLinks: [""],
  });

  useEffect(() => {
    if (isEditing && initialData?._id) {
      setForm({
        courseType: initialData.courseType || "",
        semester: initialData.semester || "",
        subject: initialData.subject || "",
        difficulty: initialData.difficulty || "",
        driveLinks: initialData.pdfs?.length
          ? initialData.pdfs
          : [{ title: "", url: "" }],
        youtubeLinks: initialData.youtubeLinks?.map((y) => y.url) || [""],
      });
    }
  }, [isEditing, initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateDriveLink = (i, field, value) => {
    const updated = [...form.driveLinks];
    updated[i][field] = value;
    setForm({ ...form, driveLinks: updated });
  };

  const addDriveLink = () =>
    setForm({
      ...form,
      driveLinks: [...form.driveLinks, { title: "", url: "" }],
    });

  const handleYoutubeChange = (i, value) => {
    const updated = [...form.youtubeLinks];
    updated[i] = value;
    setForm({ ...form, youtubeLinks: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        pdfs: form.driveLinks.filter((d) => d.title.trim() && d.url.trim()),
        youtubeLinks: form.youtubeLinks
          .filter(Boolean)
          .map((url) => ({ title: "Playlist", url })),
      };

      const url = isEditing ? `/api/notes/${initialData._id}` : "/api/notes";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save notes");

      alert(
        isEditing
          ? "Notes updated successfully"
          : "Notes uploaded successfully",
      );

      onSuccess?.();
      setBox?.(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[32rem] bg-white rounded-xl p-6 space-y-6 shadow-lg"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEditing ? "Edit Notes" : "Upload Notes"}
        </h2>
        <p className="text-sm text-gray-500">
          Upload Google Drive links for notes.
        </p>
      </div>

      {/* Academic Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Course Type</label>
          <select
            name="courseType"
            value={form.courseType}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 bg-neutral-50"
            required
          >
            <option value="">Select Course</option>
            <option>New Course</option>
            <option>Old Course</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="semester"
            value={form.semester}
            placeholder="Semester 3"
            onChange={handleChange}
            className="border rounded-md px-3 py-2 bg-neutral-50"
            required
          />

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 bg-neutral-50"
            required
          >
            <option value="">Select</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <input
          name="subject"
          value={form.subject}
          placeholder="Engineering Mathematics"
          onChange={handleChange}
          className="border rounded-md px-3 py-2 bg-neutral-50"
          required
        />
      </div>

      {/* Drive Links */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Google Drive Notes Links
        </label>

        {form.driveLinks.map((link, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input
              placeholder="Title (Unit 1 Notes)"
              value={link.title}
              onChange={(e) => updateDriveLink(i, "title", e.target.value)}
              className="border rounded-md px-3 py-2 bg-neutral-50"
            />
            <input
              placeholder="Drive link"
              value={link.url}
              onChange={(e) => updateDriveLink(i, "url", e.target.value)}
              className="border rounded-md px-3 py-2 bg-neutral-50"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addDriveLink}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add another link
        </button>
      </div>

      {/* YouTube */}
      <div>
        <label className="block text-sm font-medium mb-1">
          YouTube Playlists
        </label>
        {form.youtubeLinks.map((link, i) => (
          <input
            key={i}
            value={link}
            onChange={(e) => handleYoutubeChange(i, e.target.value)}
            placeholder="https://youtube.com/playlist?..."
            className="w-full border rounded-md px-3 py-2 bg-neutral-50"
          />
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium"
      >
        {loading
          ? isEditing
            ? "Updating..."
            : "Uploading..."
          : isEditing
            ? "Update Notes"
            : "Upload Notes"}
      </button>
    </form>
  );
}
