import fs from "fs";
import path from "path";

// Define the upload directory
// const UPLOAD_DIR = path.resolve(
//   process.env.ROOT_PATH || "",
//   "public",
//   "uploads",
//   "galleries"
// );

// Utility function to handle file uploads
export const handleMultipleFileUpload = async (files, upload_dir) => {
  const UPLOAD_DIR = path.resolve(
    process.cwd(),
    "public",
    "uploads",
    upload_dir
  );

  // Ensure the upload directory exists

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
  const fileUrls = [];

  // Loop through each file
  // console.log(files);
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());

    // Construct the file path for the server
    const filePath = path.join(UPLOAD_DIR, file.name);

    // Define the URL path for the frontend
    const imageUrl = `/uploads/${upload_dir}/` + file.name;
    fileUrls.push(imageUrl); // Store the image URL to return later

    // Save the file to the server
    fs.writeFileSync(filePath, buffer);
  }

  return fileUrls; // Return the array of URLs
};
