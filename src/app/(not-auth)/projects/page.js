import React from "react";
import Projects from "./Projects";

const page = () => {
  return (
    <>
      <Projects />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Projects | SOMES",
    description: "Projects SOMES IOE Purwanchal Campus ERC",
  };
}
