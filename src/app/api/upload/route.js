export async function POST(req) {
  try {
    const body = await req.formData();
    const file = body.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("folder", "/uploads");

    const response = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.PRIVATE_KEY + ":"
          ).toString("base64")}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      return Response.json({ error: "Image upload failed" }, { status: 500 });
    }

    const data = await response.json();
    return Response.json({ imageUrl: data }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
