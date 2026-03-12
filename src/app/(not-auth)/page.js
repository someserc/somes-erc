import CoreValues from "@/components/Home/CoreValues";
import Events from "@/components/Home/Events";
import FAQ from "@/components/Home/FAQ";
import Hero from "@/components/Home/Hero";
import Messages from "@/components/Home/Messages";
import Notices from "@/components/Home/Notices";
import Testimonials from "@/components/Home/Testimonials";
import Welcome from "@/components/Home/Welcome";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
// console.log(process.env.MONGODB_URI);

export default function Home() {
  return (
    <div className="w-full min-h-[149rem] flex flex-col items-center   ">
      <div className="w-full md:h-[40rem] ">
        <Hero />
      </div>
      {/* <div className="w-[90%] min-h-[20rem] ">
        <Welcome />
      </div> */}

      <div className="w-[90%] ">
        <Messages />
      </div>
      {/* <div className="w-[90%] ">
        <CoreValues />
      </div> */}

      <div className="w-[90%] ">
        <Events />
      </div>
      {/* <div className="w-[90%] ">
        <Notices />
      </div> */}
      <div className="w-[90%]">
        <Testimonials />
      </div>
      {/* <div className="w-[90%]">
        <FAQ />
      </div> */}
    </div>
  );
}
export async function generateMetadata() {
  return {
    title: "Home",
    description: "Home Page for SOMES IOE Purwanchal Campus ERC",
  };
}
