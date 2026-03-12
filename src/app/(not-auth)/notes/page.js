import React from "react";
import NotesPage from "./Notes";

const page = () => {
  return (
    <>
      <NotesPage />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Notes",
    description: "Notes SOMES IOE Purwanchal Campus ERC",
  };
}
