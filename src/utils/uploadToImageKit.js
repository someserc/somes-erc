const uploadToImageKit = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    // console.log(result);
    if (result.imageUrl) {
      return result.imageUrl;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default uploadToImageKit;
