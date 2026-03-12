"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function FacultyCommittee() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faculty")
      .then((res) => res.json())
      .then((data) => {
        setFaculty(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-primary-600 text-center mb-12">
        Faculty Committee
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {faculty.map((f) => (
          <div
            key={f._id}
            className="bg-white border rounded-xl p-6 text-center shadow-sm"
          >
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border">
              <Image
                src={f.image}
                alt={f.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>

            <h3 className="text-lg font-semibold">{f.name}</h3>
            <p className="text-sm text-primary-600 font-medium">{f.post}</p>
            <p className="text-sm text-gray-600">{f.qualification}</p>
            <p className="text-sm text-gray-500 mt-2">📞 {f.phone}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
