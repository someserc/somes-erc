export default async function sitemap() {
  const baseUrl = "https://someserc.ioepc.edu.np"; // ⚠️ update if needed

  /* -------- Static Pages -------- */
  const staticRoutes = [
    "",
    "/about",
    "/events",
    "/notes",
    "/committee",
    "/contact",
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  /* -------- Dynamic Notes Pages --------
     Optional: uncomment if you want per-note indexing
     Requires /api/notes to be public
  ----------------------------------- */

  // let notePages = [];
  // try {
  //   const res = await fetch(`${baseUrl}/api/notes`, {
  //     cache: "no-store",
  //   });
  //   const data = await res.json();
  //
  //   notePages = (data?.data || []).map((note) => ({
  //     url: `${baseUrl}/notes/${note._id}`,
  //     lastModified: new Date(note.updatedAt || Date.now()),
  //     changeFrequency: "monthly",
  //     priority: 0.6,
  //   }));
  // } catch (err) {
  //   console.error("Failed to generate notes sitemap", err);
  // }

  return [
    ...staticPages,
    // ...notePages,
  ];
}
