"use client";
import NoticeBoard from "@/components/Admin/NoticeBoard";
import Loading from "@/utils/loading";
import uploadToImageKit from "@/utils/uploadToImageKit";
import Image from "next/image";
import React, { useState } from "react";

const Notice = ({ notices }) => {
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(0);

  const handleResetClick = () => {
    const titleInput = document.getElementById("title");
    if (titleInput) {
      titleInput.value = "";
    }
    const contentInput = document.getElementById("content");
    if (contentInput) {
      contentInput.value = "";
    }

    const imageInput = document.getElementById("image");
    if (imageInput) {
      imageInput.value = "";
    }

    // const previewImage = document.getElementById("preview");
    // if (previewImage) {
    //   previewImage.src = "";
    // }
  };

  const handlePublishClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const title = document.getElementById("title");
    const image = document.getElementById("image");
    const content = document.getElementById("content");
    try {
      //creating formData
      const formData = new FormData();
      const uploadedUrl = await uploadToImageKit(image.files[0]);
      if (!uploadedUrl) {
        throw new Error("ImageKit Upload Error");
      }
      formData.append("title", title.value);
      formData.append("image", uploadedUrl.url);
      formData.append("description", content.value);

      //send data to server
      const response = await fetch(`/api/notice`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setFlag(flag + 1);
      handleResetClick();
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-fit md:min-h-[calc(100vh-4rem)] flex flex-col bg-neutral-200  ">
      <div className="w-full h-full flex flex-col px-8">
        <div className="mt-6 ">
          <h1 className="text-4xl">Notice</h1>
        </div>
        {/* Notice Box */}
        <div className=" w-full h-full  flex flex-col lg:flex-row mt-4 gap-8">
          <div className="lg:flex-1 h-fit bg-white rounded-lg p-2 px-8 py-8 ">
            <div className="text-2xl font-semibold ">
              <span>Create a Notice</span>
            </div>
            {/* Notice form */}
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
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="bg-neutral-100"
                  // onChange={(e) => handleAddImage(e)}
                />
                {/* {imageUrl && (
                <div className={`${imageUrl ? "flex" : "hidden"}`}>
                  <Image
                    width={10}
                    height={10}
                    alt="image"
                    id="preview"
                    src={imageUrl}
                    className="w-[10rem] object-contain"
                  />
                </div>
              )} */}
              </div>

              <div className="flex flex-col w-full gap-2 ">
                <label htmlFor="content" className="text-lg">
                  Content
                </label>
                <textarea
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

          <div className="lg:flex-[2] lg:mb-0 mb-8 max-h-[45rem] ">
            <div className=" h-[40rem] border-2">
              <NoticeBoard flag={flag} setFlag={setFlag} limit={8} />
            </div>
          </div>
        </div>
      </div>
      {/* {!loading && (
        <div className="w-full h-screen absolute flex justify-center items-center bg-[#0000003f]">
          <div className=" w-8 h-8">
            <Loading />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Notice;
