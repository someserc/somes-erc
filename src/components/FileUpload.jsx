"use client";
import React, { useState, useRef } from "react";
import { upload } from "@imagekit/next";
import { Loader2 } from "lucide-react";

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const onError = (err) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (res) => {
    setUploading(false);
    setError(null);
    onSuccess(res);
  };

  const handleProgress = (progress) => {
    setUploading(true);
    setError(null);
  };

  const handleStartUpload = (evt) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const validateFile = (file) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video must be less than 100 MB");
        return false;
      }
    } else {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid file (JPEG, PNG, webP, PDF)");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File must be less than 10 MB");
        return false;
      }
    }
    return true;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const result = await upload({
        file,
        fileName: fileType === "pdf" ? "pdf" : "image",
        useUniqueFileName: true,
        folder: fileType === "pdf" ? "pdf/" : "image/",
        onUploadProgress: handleProgress,
        onUploadStart: handleStartUpload,
      });
      handleSuccess(result);
    } catch (err) {
      onError(err);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={
          fileType === "video"
            ? "video/*"
            : fileType === "pdf"
              ? ".pdf"
              : "image/*"
        }
        className="file-input file-input-bordered w-full"
      />
      {uploading && (
        <div className="flex items-center gap-2 text-sm text-black">
          <Loader2 className="animate-spin w-4 h-4" />
          <span>Uploading...</span>
        </div>
      )}
      {error && <div className="text-red-500 text-sm ">{error}</div>}
    </div>
  );
}
