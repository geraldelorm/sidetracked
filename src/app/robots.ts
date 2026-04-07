import { MetadataRoute } from "next";

const BLOG_URL = process.env.BLOG_URL ?? "https://sidetracked-two.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${BLOG_URL}/sitemap.xml`,
  };
}
