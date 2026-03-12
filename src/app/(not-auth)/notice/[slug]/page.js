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
    title: "Notice | SOMES",
    description: "Notice SOMES IOE Purwanchal Campus ERC",
  };
}
