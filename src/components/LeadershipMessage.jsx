"use client";

import { useEffect, useState } from "react";
import LeadershipMessageForm from "./LeadershipMessageForm";

export default function LeadershipMessageList() {
  const [messages, setMessages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const res = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } else {
      alert("Failed to delete message");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {messages.map((item) => (
        <div key={item._id} className="border rounded p-4">
          {editing === item._id ? (
            <LeadershipMessageForm
              initialData={item}
              isEditing
              buttonLabel="Update Message"
              onSuccess={() => {
                setEditing(null);
                fetchMessages();
              }}
            />
          ) : (
            <>
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.position}</p>
                  <p className="mt-2 text-gray-800 line-clamp-2">
                    {item.message}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setEditing(item._id)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
