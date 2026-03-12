import uploadToImageKit from "@/utils/uploadToImageKit";
import React, { useState } from "react";

const CreateProject = ({ flag, setFlag, setBox }) => {
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
    const category = document.getElementById("category");

    if (category) {
      category.value = "";
    }
  };

  const handlePublishClick = async (e) => {
    e.preventDefault();
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const category = document.getElementById("category");

    try {
      setLoading(true);
      const formData = new FormData();
      const uploadedUrl = await uploadToImageKit(content.files[0]);
      if (!uploadedUrl) {
        throw new Error("ImageKit Upload Error");
      }
      formData.append("title", title.value);
      formData.append("content", uploadedUrl.url);
      formData.append("category", category.value);

      const response = await fetch(`/api/projects`, {
        method: "POST",
        body: formData,
      });
      if (response.status == 201) {
        handleResetClick();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setFlag(flag + 1);
      setBox(false);
    }
  };

  return (
    <div className="lg:flex-1 h-fit bg-white rounded-lg p-2 px-8 py-8 ">
      <div className="text-2xl font-semibold ">
        <span>Post a Project</span>
      </div>
      {/* Project form */}
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

        <div className="flex flex-col w-full h-fit gap-2">
          <label htmlFor="content" className="text-lg">
            Content (PDF)
          </label>

          <input name="content" type="file" id="content" />
        </div>
        <div className="flex flex-col w-full h-fit gap-2">
          <label htmlFor="category" className="text-lg">
            Category
          </label>

          <input
            name="category"
            type="text"
            id="category"
            className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
          />
        </div>

        <div className="w-full flex px-2 gap-4">
          <button
            className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg "
            type="submit"
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
  );
};

export default CreateProject;
