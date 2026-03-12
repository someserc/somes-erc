import uploadToImageKit from "@/utils/uploadToImageKit";
import React, { useEffect, useState } from "react";

const CreateCommittee = ({
  flag,
  setFlag,
  setBox,
  type = "create",
  defaultValues = {},
}) => {
  const [loading, setLoading] = useState(false);
  const [committee, setCommittee] = useState();

  useEffect(() => {
    if (type === "update" && defaultValues) {
      document.getElementById("name").value = defaultValues.name || "";
      document.getElementById("position").value = defaultValues.position || "";
      document.getElementById("facebook").value = defaultValues.facebook || "";
      document.getElementById("phone").value = defaultValues.phone || "";
      document;
    }
  }, [defaultValues, type]);

  useEffect(() => {
    const getCommittee = async () => {
      // console.log(process.env.NEXT_PUBLIC_SERVER);
      const res = await fetch(`/api/committee`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCommittee(data);
        })
        .catch((err) => {
          console.log("An error occured. Please check your code", err);
        });
    };

    getCommittee();
  }, [flag]);

  const handleResetClick = () => {
    const nameInput = document.getElementById("name");
    if (nameInput) {
      nameInput.value = "";
    }
    const positionInput = document.getElementById("position");
    if (positionInput) {
      positionInput.value = "";
    }
    const facebookInput = document.getElementById("facebook");
    if (facebookInput) {
      facebookInput.value = "";
    }
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      phoneInput.value = "";
    }

    const photoInput = document.getElementById("photo");
    if (photoInput) {
      photoInput.value = "";
    }
  };

  const handlePublishClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = document.getElementById("name");
    const photo = document.getElementById("photo");
    const position = document.getElementById("position");
    const facebook = document.getElementById("facebook");
    const phone = document.getElementById("phone");

    try {
      const formData = new FormData();

      // If type is update, append the ID
      if (type === "update" && defaultValues?._id) {
        formData.append("id", defaultValues._id);
      }

      // Photo Handling
      if (photo.files.length > 0) {
        const uploadedUrl = await uploadToImageKit(photo.files[0]);
        if (!uploadedUrl) {
          throw new Error("ImageKit Upload Error");
        }
        formData.append("photo", uploadedUrl.url);
      } else if (type === "update") {
        // Retain previous image URL
        formData.append("photo", defaultValues.photo || "");
      }

      // Append other fields
      formData.append("name", name.value);
      formData.append("position", position.value.toUpperCase());
      formData.append("facebook", facebook.value);
      formData.append("phone", phone.value);

      // Send request to backend
      const response = await fetch(`/api/committee`, {
        method: type === "create" ? "POST" : "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setFlag(flag + 1);
      handleResetClick();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setBox(false);
    }
  };

  return (
    <div className="lg:flex-1 h-fit bg-white rounded-lg p-2 px-8 py-8 ">
      <div className="text-2xl font-semibold ">
        <span>Add a Member</span>
      </div>

      <form
        encType="multipart/form-data"
        className="w-full flex flex-col mt-4 gap-4 "
        onSubmit={handlePublishClick}
      >
        <div className="flex flex-col w-full gap-2 ">
          <label htmlFor="name" className="text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
          />
        </div>

        <div className="flex flex-col w-full gap-2 ">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            name="photo"
            id="photo"
            className="bg-neutral-100"
          />
        </div>

        <div className="flex flex-col w-full gap-2 ">
          <label htmlFor="position" className="text-lg">
            Position
          </label>
          <textarea
            type="text"
            name="position"
            id="position"
            className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
          />
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <label htmlFor="phone" className="text-lg">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
          />
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <label htmlFor="facebook" className="text-lg">
            Facebook
          </label>
          <textarea
            type="text"
            name="facebook"
            id="facebook"
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

export default CreateCommittee;
