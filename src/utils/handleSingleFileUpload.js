import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
// Define the upload directory

// Utility function to handle single file uploads
const handleSingleFileUpload = async (file, upload_dir) => {
  // Ensure the upload directory exists
  // console.log(process.cwd());
  const UPLOAD_DIR = path.resolve(
    process.cwd(),
    "public",
    "uploads",
    upload_dir
  );
  // console.log(UPLOAD_DIR);
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Check if the file exists
  if (!file) {
    throw new Error("No file provided");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Generate a unique filename
  const originalExtension = path.extname(file.name);
  const uniqueFilename = `${uuidv4()}${originalExtension}`;
  const filePath = path.join(UPLOAD_DIR, uniqueFilename);
  const imageUrl = `/uploads/${upload_dir}/${uniqueFilename}`;

  fs.writeFileSync(filePath, buffer);

  // Return the file URL
  return imageUrl;
};

export default handleSingleFileUpload;
