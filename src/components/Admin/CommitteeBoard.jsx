"use client";
import React, { useEffect, useState } from "react";
import CreateCommittee from "./Committee/CreateCommittee";
import { Close } from "@mui/icons-material";

const CommitteeBoard = ({ flag, setFlag }) => {
  const [committee, setCommittee] = useState();
  const [box, setBox] = useState(false);
  // const [flag, setFlag] = useState(0);
  const [currentMember, setCurrentMember] = useState({});

  const getCommittee = async () => {
    const res = await fetch(`/api/committee`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCommittee(data);
        // console.log("Data here of committee 123: ", data);
      })
      .catch((err) => {
        console.log("An error occured. Please check your code", err);
      });
  };

  useEffect(() => {
    getCommittee();
  }, [flag]);

  // console.log("Committee", committee);

  const deleteGalleryConfirmation = (committeeId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this gallery?"
    );

    if (userConfirmed) {
      handleDelete(committeeId);
    }
  };
  console.log(currentMember);

  const handleDelete = async (committeeId) => {
    try {
      const response = await fetch(`/api/committee?id=${committeeId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        setFlag(flag + 1);
      } else {
        console.error("Failed to delete committee");
      }
    } catch (error) {
      console.error("Error deleting committee:", error);
    }
  };

  return (
    <div className="h-full w-full bg-white rounded-lg p-2 px-8 py-8 ">
      <div className="text-2xl font-semibold w-full">
        <span>Committee Board</span>
      </div>
      {/* <div className=" w-full h-[90%] overflow-scroll overflow-x-hidden mt-8 flex flex-col gap-4 pt-4 ">
        {Array.isArray(committee) &&
          committee?.map((committee, index) => {
            const utcDate = new Date(committee.createdAt);
            const isPDF = committee?.photo?.toLowerCase().endsWith(".pdf");
            return (
              <div
                key={committee._id}
                className="w-full flex flex-col items-center px-4 gap-4 text-black  "
              >
                <div className="w-full rounded-lg bg-neutral-50 p-4 flex gap-10 ">
                  <div className="w-full relative ">
                    <div>
                      
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <span className="text-lg font-bold hover:text-primary-400 ">
                        {committee.name}
                      </span>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <span className="text-lg font-light hover:text-primary-400 ">
                        {committee.position}
                      </span>
                    </div>
                    <div className="w-full absolute bottom-0 right-0 flex justify-end ">
                      <div
                        onClick={() => {
                          deleteGalleryConfirmation(committee._id);
                        }}
                        className="border-[2px] text-sm py-1 px-2 flex justify-center items-center cursor-pointer duration-300 rounded-lg text-red-500 border-red-500 hover:bg-red-500 hover:text-white  "
                      >
                        
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="w-full border-[1px]" />
              </div>
            );
          })}
      </div> */}

      <table className="w-full mt-8 border-collapse">
        <thead>
          <tr className="bg-neutral-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(committee) &&
            committee?.map((member) => (
              <tr key={member._id} className="border-b">
                <td className="p-2 font-bold">{member.name}</td>
                <td className="p-2 text-gray-500">{member.position}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => {
                      setBox(!box);
                      setCurrentMember(member);
                    }}
                    className="border-[2px] mx-2 text-sm py-1 px-2 rounded-lg text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteGalleryConfirmation(member._id)}
                    className="border-[2px] text-sm py-1 px-2 rounded-lg text-red-500 border-red-500 hover:bg-red-500 hover:text-white duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {box && (
        <div className=" z-[200] absolute top-0 left-0 w-screen h-screen bg-black/40 flex flex-col justify-center items-center ">
          <div className=" relative bg-white rounded-lg p-5 ">
            <button
              className=" absolute top-5 right-5 text-black "
              onClick={() => {
                setBox(false);
              }}
            >
              <Close />
            </button>

            <CreateCommittee
              flag={flag}
              setFlag={setFlag}
              setBox={setBox}
              type="update"
              defaultValues={currentMember}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommitteeBoard;
