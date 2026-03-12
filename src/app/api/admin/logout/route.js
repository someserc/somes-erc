export async function POST(req) {
  const response = new Response(
    JSON.stringify({ message: "Logout successful" }),
    { status: 200 }
  );

  // Clear the cookie
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
