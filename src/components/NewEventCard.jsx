// "use client"
// import Image from "next/image"
// import Link from "next/link"
// import React from "react"
// import { useRouter } from "next/navigation"

// const NewEventCard = (event) => {
//   const router = useRouter()
//   const eventDate = event?.event?.date
//   const currentDate = new Date()

//   const completedEvent = eventDate < currentDate
//   const eventDateObject = new Date(eventDate)
//   // console.log(eventDate.toString())

//   const options = { day: "numeric", month: "long", year: "numeric" }

//   const formattedDate = eventDateObject.toLocaleDateString("en-US", options)

//   console.log(event.event.thumbnail_url)
//   return (
//     <div
//       className="card bg-base-100 shadow-xl  py-1 px-1 flex flex-col justify-center bg-primary-400 w-max h-full mx-auto mb-10"
//       onClick={() => router.push(`/events/${event?.event?._id}`)}>
//       {/* <figure className=""> */}
//       <Image
//         src={`${event?.event?.thumbnail_url}`}
//         alt="Shoes"
//         width={300}
//         height={300}
//         className="border object-contain bg-white h-full"
//       />
//       {/* </figure> */}
//       <div className="card-body md:!px-4 !px-2 !py-3 bg-gray-100 text-gray-800 flex flex-col gap-2 h-max">
//         <Link
//           href={`/events/${event?.events?._id}`}
//           className="text-[20px] font-semibold card-title ">
//           {event?.event?.title}
//         </Link>
//         <div
//           className={`badge w-max px-2 ${
//             completedEvent ? "bg-primary-600" : "bg-green-600"
//           } text-white text-[10px] `}>
//           {completedEvent ? "COMPLETED" : "UPCOMING"}
//         </div>
//         <p className="text-[14px]  font-medium">{event?.event?.content}</p>
//         <p className="text-[11px] flex gap-2 font-normal items-center">
//           <span>
//             <svg
//               viewBox="0 0 15 15"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               width="13"
//               height="13">
//               <path
//                 d="M3.5 0v5m8-5v5M5 8.5l2 2 3.5-4m-9-4h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"
//                 stroke="currentColor"></path>
//             </svg>
//           </span>
//           {formattedDate}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default NewEventCard

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { formatDate } from "@/utils/dateFormatter";

const NewEventCard = (event) => {
  const router = useRouter();
  const eventDate = event?.event?.date;

  const currentDate = new Date();
  const eventDateObject = new Date(eventDate);
  const completedEvent = eventDateObject < currentDate;
  const formattedDate = formatDate(eventDate);

  return (
    <div
      onClick={() => router.push(`/events/${event?.event?._id}`)}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 max-w-sm w-full mx-auto mb-6 bg-white cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={event?.event?.thumbnail_url}
          alt={event?.event?.title || "Event thumbnail"}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
              completedEvent ? "bg-primary-600" : "bg-green-600"
            }`}
          >
            {completedEvent ? "COMPLETED" : "UPCOMING"}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <Link
          href={`/events/${event?.event?._id}`}
          className="block text-lg font-semibold text-gray-800 hover:text-primary-600 line-clamp-2"
        >
          {event?.event?.title}
        </Link>

        <p className="text-sm text-gray-600 line-clamp-3">
          {event?.event?.content}
        </p>

        <div className="flex items-center text-gray-500 pt-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default NewEventCard;
