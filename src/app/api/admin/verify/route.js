import jwt from "jsonwebtoken";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const verified = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    return new Response(JSON.stringify({ verified }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }
}
