import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Close, DateRange } from "@mui/icons-material";
import dynamic from "next/dynamic";
import Image from "next/image";
import uploadToImageKit from "@/utils/uploadToImageKit";

// const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
//   ssr: false,
// })

const CreateEvent = ({ flag, setFlag, setBox }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetClick = () => {
    const titleInput = document.getElementById("title");
    if (titleInput) {
      titleInput.value = "";
    }
    const contentInput = document.getElementById("content");
    if (contentInput) {
      contentInput.value = "";
    }
    const registrationInput = document.getElementById("registration");
    if (registrationInput) {
      registrationInput.value = "";
    }
    const facebookInput = document.getElementById("facebook");
    if (facebookInput) {
      facebookInput.value = "";
    }

    const imageInput = document.getElementById("image");
    if (imageInput) {
      imageInput.value = "";
    }
    const dateInput = document.getElementById("date");
    if (dateInput) {
      dateInput.value = "";
    }
    setSelectedDate("");
  };

  const handlePublishClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const title = document.getElementById("title");
    const image = document.getElementById("image");
    const date = document.getElementById("date");
    const content = document.getElementById("content");
    const registration = document.getElementById("registration");
    const facebook = document.getElementById("facebook");
    try {
      //creating formData
      const formData = new FormData();
      const uploadedUrl = await uploadToImageKit(image.files[0]);
      if (!uploadedUrl) {
        throw new Error("ImageKit Upload Error");
      }
      formData.append("title", title.value);
      formData.append("thumbnail_url", uploadedUrl.url);
      formData.append("event_date", date.value);
      formData.append("content", content.value);
      formData.append("registration", registration.value);
      formData.append("facebook", facebook.value);

      //send data to server
      const response = await fetch(`/api/event`, {
        method: "POST",
        body: formData,
      });
      if (response.status === 201) {
        handleResetClick();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBox(false);
      setFlag(flag + 1);
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="flex-1 h-fit bg-white rounded-lg p-2 px-8 py-8 ">
        <div className="text-2xl font-semibold ">
          <span>Create an Event</span>
        </div>
        {/* Event form */}
        <form
          encType="multipart/form-data"
          className="w-full flex flex-col mt-4 gap-4 "
          onSubmit={handlePublishClick}
        >
          <div className="flex flex-col w-full gap-2 ">
            <label htmlFor="title" className="text-lg">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
            />
          </div>

          <div className="flex flex-col w-full gap-2 ">
            <label htmlFor="image">Poster</label>
            <input
              type="file"
              name="image"
              id="image"
              className="bg-neutral-100"
            />
          </div>

          <div className="flex flex-col w-full gap-2 ">
            <label htmlFor="date" className="text-lg">
              Event Date
            </label>
            <div className="w-fit relative bg-neutral-100 py-2 rounded-lg px-2 outline-none">
              <label
                htmlFor="date"
                className="absolute right-4 top-0 h-full flex items-center z-[10]"
              >
                <DateRange />
              </label>
              <DatePicker
                name="date"
                id="date"
                type="text"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full bg-neutral-100 outline-none"
                showYearDropdown
                showMonthDropdown
                autoComplete="off"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 ">
            <label htmlFor="registration" className="text-lg">
              Registration Link
            </label>
            <input
              type="text"
              name="registration"
              id="registration"
              className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
            />
          </div>

          <div className="flex flex-col w-full gap-2 ">
            <label htmlFor="facebook" className="text-lg">
              Facebook Post Link
            </label>
            <input
              type="text"
              name="facebook"
              id="facebook"
              className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
            />
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <label htmlFor="content" className="text-lg">
              Content
            </label>
            <input
              type="text"
              name="content"
              id="content"
              className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
            />
          </div>

          <div className="w-full flex px-2 gap-4">
            <button
              className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg "
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Publish"}
            </button>
            <button
              className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg"
              onClick={handleResetClick}
              type="button"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
