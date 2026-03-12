// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { motion, useAnimate } from 'framer-motion';
// import {
//   Favorite,
//   FavoriteOutlined,
//   GitHub,
//   Language,
//   Person,
// } from '@mui/icons-material';

// const ProjectCard = ({ item, index }) => {
//   const [scope, animate] = useAnimate();
//   const [liked, setLiked] = useState(false);
//   const handleLike = () => {
//     setLiked(!liked);
//     if (liked) {
//       item.likes--;
//     } else {
//       item.likes++;
//     }
//   };
//   function sequence() {
//     animate([
//       ['#layer', { height: '100%', opacity: 1 }, { duration: 0.2 }],
//       ['#detail', { y: -20, opacity: 1 }, { duration: 0.3 }],
//     ]);
//   }
//   function sequenceExit() {
//     animate([
//       ['#detail', { y: 20, opacity: 0 }, { duration: 0.3 }],
//       ['#layer', { height: '0%', opacity: 0 }, { duration: 0.2 }],
//     ]);
//   }

//   return (
//     <motion.div
//       className="p-4 md:w-1/3 lg:w-1/4 flex flex-col"
//       initial={{ opacity: 0, x: -100 }}
//       whileInView={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
//       viewport={{ once: true }}
//       exit={{ opacity: 0 }}
//     >
//       <div
//         ref={scope}
//         onMouseEnter={sequence}
//         onMouseLeave={sequenceExit}
//         className="group w-[100%] h-[16rem] rounded-xl bg-[#e0ccb94d] relative overflow-hidden "
//       >
//         <div
//           id="layer"
//           className="opacity-0 w-[100%] absolute bottom-0 flex items-end bg-gradient-to-t from-[#000000e3] to-transparent "
//         >
//           <div
//             id="detail"
//             className="opacity-0 w-[100%] overflow-hidden px-4 flex absolute bottom-0 justify-between items-center text-white font-bold font-[Helvetica] "
//           >
//             <span className="text-ellipsis overflow-hidden whitespace-nowrap ">
//               {item.project_title}
//             </span>
//             <div className="flex">
//               {item.web_link && (
//                 <div className="w-[2rem] h-[2rem] flex justify-center items-center bg-[#272727] hover:bg-[#ffffff] hover:text-black transition-colors duration-200  cursor-pointer rounded-lg">
//                   <Link href={item.web_link}>
//                     <Language color="inherit" />
//                   </Link>
//                 </div>
//               )}
//               <div className="w-[2rem] h-[2rem] ml-2 flex justify-center items-center bg-[#272727] hover:bg-[#ffffff] hover:text-black transition-colors duration-200  cursor-pointer rounded-lg">
//                 <Link href={item.github}>
//                   <GitHub color="inherit" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Image
//           width={300}
//           height={260}
//           alt="project"
//           src={`${item.project_image}`}
//           className="object-contain w-[100%] h-[100%]"
//         />
//       </div>
//       <div className="flex items-center justify-between mt-2">
//         <div className="flex items-center">
//           <div>
//             <Person />
//           </div>
//           <span className="ml-1">{item.user_name}</span>
//         </div>
//         <div
//           className={`text-gray-500 flex leading-none text-sm cursor-pointer items-center `}
//         >
//           <div
//             onClick={handleLike}
//             className={`${
//               liked ? 'text-red-500' : 'text-gray-200'
//             } transition-colors duration-300 `}
//           >
//             <Favorite color="inherit" />
//           </div>
//           <span className="ml-[0.1rem] ">{item.likes}</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProjectCard;

import React from 'react'

const ProjectCard = () => {
  return (
    <div>ProjectCard</div>
  )
}

export default ProjectCard
