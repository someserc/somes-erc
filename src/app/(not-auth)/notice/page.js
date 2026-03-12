import React from "react";
import Notice from "./Notice";

const page = () => {
  return (
    <>
      <Notice />
    </>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Notices",
    description: "Notices SOMES IOE Purwanchal Campus ERC",
  };
}
