"use client";

import { useEffect, useState } from "react";
import CreateNote from "./CreateNote";

export default function NotesTable({ flag, setFlag }) {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data.data || []);
  };

  useEffect(() => {
    fetchNotes();
  }, [flag]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this note permanently?")) return;

    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } else {
      alert("Failed to delete note");
    }
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note._id} className="border p-4 rounded bg-white">
          {editing === note._id ? (
            <CreateNote
              initialData={note}
              isEditing
              onSuccess={() => {
                setEditing(null);
                setFlag((f) => f + 1);
              }}
            />
          ) : (
            <>
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{note.subject}</h3>
                  <p className="text-sm text-gray-600">
                    {note.courseType} • {note.semester} • {note.difficulty}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => setEditing(note._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="mt-2 text-sm">
                PDFs: {note.pdfs.length} • Playlists: {note.youtubeLinks.length}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
