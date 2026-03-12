"use client";

import uploadToImageKit from "@/utils/uploadToImageKit";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";

const CreateGallery = ({ flag, setFlag, setBox }) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(`/api/event`);
        const { data } = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching gallery images for editing:", error);
      }
    };
    getEvents();
  }, []);

  const handleInputChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const title = document.getElementById("title");
    const thumbnail = document.getElementById("thumbnail");

    try {
      const formData = new FormData();

      formData.append("title", title.value);
      formData.append("event_id", selectedEvent);
      const uploadedUrl = await uploadToImageKit(thumbnail.files[0]);
      if (!uploadedUrl) {
        throw new Error("ImageKit Upload Error");
      }
      formData.append("thumbnail_url", uploadedUrl.url);

      const response = await fetch(`/api/gallery`, {
        method: "POST",
        body: formData,
      }).then((r) => {
        return r.json();
      });

      setFlag(flag + 1);
      setBox(false);
    } catch (error) {
      console.log(error);
    } finally {
      title.value = null;
      setSelectedEvent("");
      setLoading(false);
      alert("Gallery created successfully");
    }
  };

  return (
    <div className="w-fit rounded-md flex flex-col gap-4 ">
      <h4 className="font-semibold text-center ">Create a Gallery</h4>
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-4 h-fit items-center justify-between rounded-lg ">
          <label htmlFor="title" className="w-[30%] ">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-neutral-200 outline-none p-2 rounded-md w-full"
          />
        </div>
        <div className=" flex gap-4 h-fit items-center justify-between rounded-lg ">
          <label htmlFor="title" className="w-[30%] ">
            Event
          </label>
          <input
            type="text"
            list="event"
            className="bg-neutral-200 outline-none p-2 rounded-md w-full"
            value={selectedEvent}
            onChange={handleInputChange}
          />
          <datalist name="event" id="event">
            {events?.map((event, id) => (
              <option key={event._id} value={event._id}>
                {event.title}
              </option>
            ))}
          </datalist>
        </div>
        <div className="flex gap-4 h-fit items-center justify-between rounded-lg ">
          <label htmlFor="thumbnail" className="w-[30%] ">
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            className="bg-neutral-200 outline-none p-2 rounded-md w-full "
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Gallery"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGallery;
