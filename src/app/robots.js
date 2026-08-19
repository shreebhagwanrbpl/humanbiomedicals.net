export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/*?*"],
      },
    ],
    sitemap: "https://humanbiomedicals.net/sitemap.xml",
  };
}