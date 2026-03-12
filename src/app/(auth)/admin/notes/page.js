"use client";

import { Close } from "@mui/icons-material";
import { useState } from "react";
import CreateNote from "@/components/Admin/Notes/CreateNote";
import NotesTable from "@/components/Admin/Notes/NotesTable";

export default function NotesAdminPage() {
  const [flag, setFlag] = useState(0);
  const [box, setBox] = useState(false);

  return (
    <div className="w-full bg-neutral-200 px-8 min-h-screen">
      <div className="mt-6 flex justify-between items-center">
        <h1 className="text-4xl">Notes</h1>
        <button
          className="btn bg-blue-400 text-white px-4 py-2 rounded"
          onClick={() => setBox(true)}
        >
          Add Notes
        </button>
      </div>

      <div className="mt-6 h-[40rem] border-2 bg-white">
        <NotesTable flag={flag} />
      </div>

      {box && (
        <div className="z-[200] fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setBox(false)}
            >
              <Close />
            </button>
            <CreateNote setBox={setBox} flag={flag} setFlag={setFlag} />
          </div>
        </div>
      )}
    </div>
  );
}
