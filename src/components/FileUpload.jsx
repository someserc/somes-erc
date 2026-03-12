"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
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
      if (!fileType.type.startsWith("video/")) {
        setError("Please upload a video file");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video must be less than 100 MB");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "pdf"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid file (JPEG, PNG, webP,pdf)");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Video must be less than 10 MB");
        return false;
      }
    }
    return false;
  };
  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "pdf" ? "pdf" : "image"}
        useUniqueFileName={true}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        folder={fileType === "pdf" ? "pdf/*" : "image/*"}
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
