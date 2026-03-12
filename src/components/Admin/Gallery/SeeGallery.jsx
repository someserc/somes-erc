"use client";

import uploadToImageKit from "@/utils/uploadToImageKit";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SeeGallery = ({ gallery, flag, setFlag }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState(gallery?.title);

  useEffect(() => {
    const getGalleryImages = async () => {
      try {
        const response = await fetch(`/api/gallery/images/${gallery?._id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data } = await response.json();
        setGalleryImages(data);
      } catch (error) {
        console.error("Error fetching gallery images for editing:", error);
      }
    };
    getGalleryImages();
  }, [flag]);

  //   delete image by id
  const handleDeleteConfirmation = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (userConfirmed) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    setLoading(true);
    try {
      await fetch(`/api/gallery/images/${gallery?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_id: id }),
      });
      setFlag(flag + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImageSubmit = async () => {
    setLoading(true);
    const images = document.getElementById("images");

    try {
      // Upload images to ImageKit and get URLs
      const imageUploadPromises = Array.from(images.files).map(async (file) => {
        const uploadedUrl = await uploadToImageKit(file);
        return uploadedUrl.url; // No need for `.url`, since uploadToImageKit already returns the URL
      });

      const imageUrls = await Promise.all(imageUploadPromises);

      // Send image URLs to the backend
      const response = await fetch(`/api/gallery/images/${gallery._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gallery_id: gallery._id,
          imageUrls,
        }),
      });

      const result = await response.json();
      // console.log("Backend Response:", result);

      if (result.status === "success") {
        setFlag(flag + 1);
      }
    } catch (error) {
      console.log("Error uploading images:", error);
    } finally {
      images.value = null;
      setLoading(false);
    }
  };

  const handleUpdateTitle = async (newTitle) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/gallery/${gallery._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });
      if (response.ok) {
        setFlag(flag + 1);
      } else {
        console.error("Failed to update title");
      }
    } catch (error) {
      console.error("Error updating title:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg flex flex-col gap-2 ">
      <h4 className="text-center font-semibold">{gallery?.title}</h4>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 grid-md-cols-6 grid-lg-cols-10 gap-4 ">
          {galleryImages?.images?.map((image, id) => {
            // console.log(image);
            return (
              <div key={image._id} className="flex flex-col gap-2">
                <Image
                  src={`${image?.image_url}`}
                  width={80}
                  height={80}
                  alt="image"
                />
                <button
                  onClick={() => {
                    handleDeleteConfirmation(image._id);
                  }}
                  className="text-center p-2 border rounded-md hover:bg-red-400 hover:text-white duration-200 "
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex  gap-2">
          <div className="flex items-center gap-2">
            <h5 className="font-semibold">Update Title: </h5>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleUpdateTitle(newTitle)}
              className=" py-2 px-6 bg-blue-400 hover:bg-blue-400/80 duration-200 text-white rounded-md "
              disabled={loading}
            >
              {loading ? "Submitting..." : "Update Title"}
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-2 ">
          <h5 className="font-semibold">Add Images: </h5>
          <input type="file" id="images" name="images" multiple />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAddImageSubmit}
            disabled={loading}
            className="py-2 px-6 bg-blue-400 hover:bg-blue-400/80 duration-200 text-white rounded-md "
          >
            {loading ? "Submitting..." : "Update Images"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeeGallery;
