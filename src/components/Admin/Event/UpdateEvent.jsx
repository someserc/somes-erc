import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Close, DateRange } from "@mui/icons-material";
import dynamic from "next/dynamic";
import Image from "next/image";

// const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
//   ssr: false,
// })

const UpdateEvent = ({ flag, setFlag, setBox, eventIdInModal }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [content, setContent] = useState("");

  const handleAddImage = (e) => {
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    if (file) {
      let reader = new FileReader();
      const blob = new Blob([file], { type: file.type });

      reader.readAsDataURL(blob);
      reader.onload = function (event) {
        document.getElementById("preview").src = event.target.result;
        setImageUrl(event.target.result);
      };
    } else {
      // setImageUrl('');
    }
  };

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

    // const imageInput = document.getElementById("image")
    // if (imageInput) {
    //   imageInput.value = ""
    // }
    const dateInput = document.getElementById("date");
    if (dateInput) {
      dateInput.value = "";
    }
    setSelectedDate("");

    const previewImage = document.getElementById("preview");
    if (previewImage) {
      previewImage.src = "";
    }

    setImageUrl("");
  };

  const handlePublishClick = async (e, eventId) => {
    e.preventDefault(); // Prevent form submission

    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value.trim();
    const content = document.getElementById("content").value.trim();
    const registration = document.getElementById("registration").value.trim();
    const facebook = document.getElementById("facebook").value.trim();

    // const imageInput = document.getElementById("image") // Ensure the image input is selected

    try {
      // Creating FormData
      const formData = new FormData();
      if (title) formData.append("title", title);
      if (date) formData.append("event_date", date);
      if (content) formData.append("content", content);
      if (registration) formData.append("registration", registration);
      if (facebook) formData.append("facebook", facebook);

      // if (imageInput.files[0]) {
      //   formData.append("thumbnail_url", imageInput.files[0]) // Fix undefined issue
      // }

      // Debugging: Check form data before sending

      // Sending Data to Server
      const response = await fetch(`/api/event?id=${eventId}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        console.log("Event updated successfully");
        handleResetClick();
      } else {
        const errorData = await response.json();
        console.error("Error updating event:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
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
          onSubmit={(e) => handlePublishClick(e, eventIdInModal)}
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

          {/* <div className="flex flex-col w-full h-fit gap-2">
            <label htmlFor="content" className="text-lg">
              Content
            </label>
              <input
                name="content"
                id="content"
                type="text"
                placeholder="Add decription here"
                className="bg-neutral-100 py-2 rounded-lg px-2 outline-none w-full"
              />
          </div> */}

          <div className="w-full flex px-2 gap-4">
            <button
              className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg "
              type="submit"
            >
              Updates
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

export default UpdateEvent;
