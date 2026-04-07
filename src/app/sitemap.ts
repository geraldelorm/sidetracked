import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/notion";

const BLOG_URL = process.env.BLOG_URL ?? "https://sidetracked-two.vercel.app";

const CATEGORIES = ["tech", "lifestyle", "gaming", "productivity", "opinion"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BLOG_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BLOG_URL}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [
    {
      url: BLOG_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryEntries,
    ...postEntries,
  ];
}
