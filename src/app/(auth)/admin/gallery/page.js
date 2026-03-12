"use client";
import React, { useState } from "react";
import { Poppins, Montserrat } from "next/font/google";
import GalleryTable from "@/components/Admin/galleryTable";
import { useRouter } from "next/navigation";
import CreateGallery from "@/components/Admin/Gallery/CreateGallery";
import { Close } from "@mui/icons-material";

const poppins = Poppins({
  weight: ["400", "200", "100", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: ["400", "200", "100", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Gallery = () => {
  const router = useRouter();
  const [box, setBox] = useState(false);
  const [message, setMessage] = useState(null);
  const [flag, setFlag] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const files = document.getElementById("files");

    try {
      const formData = new FormData();

      formData.append("name", name.value);

      for (let i = 0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
      }
      const response = await fetch(`/api/gallery`, {
        method: "POST",
        body: formData,
      }).then((r) => {
        return r.json();
      });
    } catch (error) {
      console.log(error);
    } finally {
      name.value = null;
      files.value = null;
      setBox(true);
      router.reload();
    }
  };

  // return (
  //   <div
  //     className={`${poppins.className} h-fit min-h-[calc(100vh-4rem)] flex flex-col items-center  bg-neutral-200  `}
  //   >
  //     <div className="w-[90%] h-full flex flex-col justify-center items-center border-2 border-gray-300 py-10 mt-10 rounded-lg bg-white ">
  //       <div className="w-full h-[4rem] flex justify-center ">
  //         <div
  //           className={`sm:text-[3rem] text-3xl font-bold ${montserrat.className}`}
  //         >
  //           Gallery Upload{' '}
  //         </div>{' '}
  //       </div>{' '}
  //       <AnimatePresence>
  //         {' '}
  //         {box && (
  //           <motion.div
  //             initial={{ x: 100, opacity: 0 }}
  //             animate={{ x: 0, opacity: 1 }}
  //             exit={{ x: 400, opacity: 0 }}
  //             className="fixed top-[88%] right-10 h-24 w-96 border-2 p-4 bg-[#5b4beb] text-white "
  //           >
  //             <div className="w-full flex justify-end">
  //               <button onClick={() => setBox(!box)}>
  //                 <Image
  //                   width={20}
  //                   height={20}
  //                   src="/assets/icons/close.png"
  //                   alt="close"
  //                 />
  //               </button>{' '}
  //             </div>{' '}
  //             <span> Gallery added successfully! </span>{' '}
  //           </motion.div>
  //         )}{' '}
  //       </AnimatePresence>{' '}
  //       <form
  //         encType="multipart/form-data"
  //         onSubmit={handleSubmit}
  //         className="w-[80%] flex flex-col items-center justify-center space-y-10 md:px-10 px-2"
  //       >
  //         <div className=" mt-10 w-[100%]  flex md:flex-row flex-col items-center justify-start mx-auto">
  //           <label htmlFor="name" className="text-lg md:mr-3 mr-auto">
  //             Event Name:
  //           </label>{' '}
  //           <input
  //             className=" w-[65%] outline-none focus-within:border-black rounded-lg border-2 border-gray-300 p-2  duration-300"
  //             name="name"
  //             id="name"
  //             type="text"
  //             placeholder="Enter gallery name"
  //             required
  //           />
  //         </div>{' '}
  //         <div className="w-[100%] text-center ">
  //           <label
  //             htmlFor="files"
  //             className="md:w-[91%] w-[100%] flex justify-center items-center text-lg border-2 border-gray-300 py-2 rounded-lg cursor-pointer hover:border-black duration-300"
  //           >
  //             Select Images{' '}
  //           </label>{' '}
  //           <input
  //             className=" w-[100%] hidden"
  //             id="files"
  //             type="file"
  //             name="files"
  //             multiple
  //             accept=".png, .jpg, .jpeg"
  //             required
  //           />
  //         </div>{' '}
  //         <div className="mt-10 flex justify-center w-[80%]">
  //           <button
  //             type="submit"
  //             className="p-3 md:px-20 px-5 border-2 border-gray-300 hover:border-black rounded-lg font-semibold sm:text-lg text-base duration-300"
  //           >
  //             Upload{' '}
  //           </button>{' '}
  //         </div>{' '}
  //       </form>{' '}
  //     </div>
  //     <div className="w-[90%] mt-10 flex justify-center">
  //       <GalleryTable />
  //     </div>
  //   </div>
  // );

  return (
    <div className={`${poppins.className} py-10 px-5 `}>
      <div className="flex gap-4 flex-col items-center ">
        <div className="w-full flex justify-end ">
          <button
            className="btn  bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg duration-200 shadow-lg "
            onClick={() => setBox(!box)}
          >
            Create a Gallery
          </button>
        </div>
        <GalleryTable flag={flag} setFlag={setFlag} />
      </div>
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
            <CreateGallery flag={flag} setFlag={setFlag} setBox={setBox} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
