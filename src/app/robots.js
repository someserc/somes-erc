export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login", "/register", "/dashboard"],
      },
    ],
    sitemap: "https://someserc.ioepc.edu.np/sitemap.xml", // change if domain differs
    host: "https://someserc.ioepc.edu.np",
  };
}
