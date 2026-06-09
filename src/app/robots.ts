import { MetadataRoute } from "next";

export const dynamic = "force-static";

const BLOG_URL = process.env.BLOG_URL ?? "https://sidetracked-blog.co.uk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BLOG_URL}/sitemap.xml`,
  };
}
