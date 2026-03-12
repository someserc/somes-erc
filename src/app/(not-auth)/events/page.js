import React from "react";
import Events from "./Events";

const page = () => {
  return (
    <>
      <Events />
    </>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Events",
    description: "Events SOMES IOE Purwanchal Campus ERC",
  };
}
