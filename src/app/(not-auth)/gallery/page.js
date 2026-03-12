import React from "react";
import Gallery from "./Gallery";

const page = () => {
  return (
    <>
      <Gallery />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Gallery",
    description: "Gallery SOMES IOE Purwanchal Campus ERC",
  };
}
