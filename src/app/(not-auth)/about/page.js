import React from "react";
import About from "./About";

const page = () => {
  return (
    <>
      <About />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "About",
    description: "About SOMES IOE Purwanchal Campus ERC",
  };
}
