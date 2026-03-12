"use client";
import TestimonialForm from "@/components/Admin/Testimonial/TestimonialForm";
import TestimonialList from "@/components/Admin/Testimonial/TestimonialList";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic"; // needed for fresh data in App Router

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        let response = await fetch("/api/testimonial");
        console.log(response);
        response = await response.json();

        if (!response.success) console.log("Server error");

        setTestimonials(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTestimonials();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-primary-400">
        Manage Testimonials
      </h1>
      <TestimonialForm buttonLabel={"Submit"} />
      <div className="mt-6">
        <TestimonialList
          testimonials={testimonials}
          refresh={() => location.reload()}
        />
      </div>
    </div>
  );
}
