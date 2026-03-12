import Committee from "./Committee";
import React from "react";

const page = () => {
  return (
    <>
      <Committee />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Committee",
    description: "Committee SOMES IOE Purwanchal Campus ERC",
  };
}
