"use client";

import { useEffect, useMemo, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const semesters = useMemo(() => {
    if (!course) return [];
    return [
      ...new Set(
        notes.filter((n) => n.courseType === course).map((n) => n.semester),
      ),
    ];
  }, [course, notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (n) =>
        (!course || n.courseType === course) &&
        (!semester || n.semester === semester),
    );
  }, [notes, course, semester]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-widest text-primary-600 mb-2">
          Academic Resources
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          SOMES Notes Library
        </h1>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Curated study materials and playlists to support your mechanical
          engineering journey.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-14 flex justify-center">
        <div className="bg-white border rounded-xl shadow-sm p-5 flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Course
            </label>
            <select
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                setSemester("");
              }}
              className="border px-4 py-2 rounded-md min-w-[200px] bg-neutral-50 focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Courses</option>
              <option value="New Course">New Course</option>
              <option value="Old Course">Old Course</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              disabled={!course}
              className="border px-4 py-2 rounded-md min-w-[200px] bg-neutral-50 disabled:opacity-50"
            >
              <option value="">All Semesters</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-600 border-t-transparent" />
        </div>
      )}

      {/* Empty */}
      {!loading && filteredNotes.length === 0 && (
        <p className="text-gray-500 text-center">
          No notes available for the selected criteria.
        </p>
      )}

      {/* Notes Grid */}
      {!loading && filteredNotes.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              {/* Subject */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {note.subject}
              </h3>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-primary-50 text-primary-700">
                  {note.courseType}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-secondary-50 text-secondary-700">
                  {note.semester}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-neutral-100 text-neutral-700">
                  {note.difficulty}
                </span>
              </div>

              {/* PDFs */}
              {note.pdfs?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">
                    📄 Notes (Drive)
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {note.pdfs.map((pdf, i) => (
                      <li key={i}>
                        <a
                          href={pdf.url}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          {pdf.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* YouTube */}
              {note.youtubeLinks?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">
                    ▶ YouTube Playlists
                  </h4>
                  <div className="space-y-1 text-sm">
                    {note.youtubeLinks.map((yt, i) => (
                      <a
                        key={i}
                        href={yt.url}
                        target="_blank"
                        className="block text-red-600 hover:underline"
                      >
                        {yt.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
