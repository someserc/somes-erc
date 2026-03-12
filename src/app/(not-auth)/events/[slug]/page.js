import React from "react";
import Event from "./Event";

const page = () => {
  return (
    <>
      <Event />
    </>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Event | SOMES",
    description: "Event SOMES IOE Purwanchal Campus ERC",
  };
}
