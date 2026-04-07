import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  publishedAt: string;
  tags: string[];
};

function getProperty(page: PageObjectResponse, name: string) {
  return (page.properties as Record<string, unknown>)[name];
}

function extractText(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as Record<string, unknown>;
  if (p.type === "title") {
    const arr = p.title as Array<{ plain_text: string }>;
    return arr?.map((t) => t.plain_text).join("") ?? "";
  }
  if (p.type === "rich_text") {
    const arr = p.rich_text as Array<{ plain_text: string }>;
    return arr?.map((t) => t.plain_text).join("") ?? "";
  }
  if (p.type === "select") {
    const sel = p.select as { name: string } | null;
    return sel?.name ?? "";
  }
  if (p.type === "date") {
    const date = p.date as { start: string } | null;
    return date?.start ?? "";
  }
  if (p.type === "multi_select") {
    const arr = p.multi_select as Array<{ name: string }>;
    return arr?.map((t) => t.name).join(", ") ?? "";
  }
  if (p.type === "url") {
    return (p.url as string) ?? "";
  }
  return "";
}

function extractTags(prop: unknown): string[] {
  if (!prop || typeof prop !== "object") return [];
  const p = prop as Record<string, unknown>;
  if (p.type === "multi_select") {
    const arr = p.multi_select as Array<{ name: string }>;
    return arr?.map((t) => t.name) ?? [];
  }
  return [];
}

function extractCover(page: PageObjectResponse): string | null {
  // Try cover image property first
  const coverProp = getProperty(page, "Cover");
  if (coverProp) {
    const p = coverProp as Record<string, unknown>;
    if (p.type === "url" && p.url) return p.url as string;
    if (p.type === "files") {
      const files = p.files as Array<Record<string, unknown>>;
      const first = files?.[0];
      if (first?.type === "external") {
        return (first.external as { url: string })?.url ?? null;
      }
      if (first?.type === "file") {
        return (first.file as { url: string })?.url ?? null;
      }
    }
  }
  // Fall back to page cover
  if (page.cover) {
    const c = page.cover as Record<string, unknown>;
    if (c.type === "external") return (c.external as { url: string })?.url ?? null;
    if (c.type === "file") return (c.file as { url: string })?.url ?? null;
  }
  return null;
}

export async function getAllPosts(): Promise<Post[]> {
  const dbId = process.env.NOTION_DATABASE_ID;
  if (!dbId) return getMockPosts();

  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: "Status",
        select: { equals: "Published" },
      },
      sorts: [{ property: "Published", direction: "descending" }],
    });

    return response.results
      .filter((r): r is PageObjectResponse => r.object === "page" && "properties" in r)
      .map((page) => ({
        id: page.id,
        slug: extractText(getProperty(page, "Slug")) || page.id,
        title: extractText(getProperty(page, "Title")),
        excerpt: extractText(getProperty(page, "Excerpt")),
        coverImage: extractCover(page),
        category: extractText(getProperty(page, "Category")),
        publishedAt: extractText(getProperty(page, "Published")),
        tags: extractTags(getProperty(page, "Tags")),
      }));
  } catch {
    return getMockPosts();
  }
}

export async function getPostBySlug(slug: string): Promise<{ post: Post; markdown: string } | null> {
  const dbId = process.env.NOTION_DATABASE_ID;
  if (!dbId) {
    const mock = getMockPosts().find((p) => p.slug === slug);
    return mock ? { post: mock, markdown: getMockMarkdown(mock.title) } : null;
  }

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: "Slug", rich_text: { equals: slug } },
    });

    const page = response.results.find(
      (r): r is PageObjectResponse => r.object === "page" && "properties" in r
    );
    if (!page) return null;

    const post: Post = {
      id: page.id,
      slug: extractText(getProperty(page, "Slug")) || page.id,
      title: extractText(getProperty(page, "Title")),
      excerpt: extractText(getProperty(page, "Excerpt")),
      coverImage: extractCover(page),
      category: extractText(getProperty(page, "Category")),
      publishedAt: extractText(getProperty(page, "Published")),
      tags: extractTags(getProperty(page, "Tags")),
    };

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const markdown = n2m.toMarkdownString(mdBlocks).parent;

    return { post, markdown };
  } catch {
    return null;
  }
}

// ─── Mock data for local dev without Notion creds ────────────────────────────

function getMockPosts(): Post[] {
  return [
    {
      id: "1",
      slug: "best-wireless-earbuds-2024",
      title: "The Best Wireless Earbuds You Can Buy Right Now",
      excerpt: "We tested 20+ pairs so you don't have to. Here's what actually survived the daily commute.",
      coverImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      category: "Tech",
      publishedAt: "2024-11-10",
      tags: ["Audio", "Gadgets", "Reviews"],
    },
    {
      id: "2",
      slug: "notion-changed-how-i-work",
      title: "Notion Changed How I Work — Here's My Exact Setup",
      excerpt: "After 3 years of trying every productivity app, I finally stopped switching. Here's the system that stuck.",
      coverImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
      category: "Productivity",
      publishedAt: "2024-10-28",
      tags: ["Productivity", "Tools", "Notion"],
    },
    {
      id: "3",
      slug: "gaming-on-a-budget-2024",
      title: "How to Game on a Budget Without Feeling Like You're Missing Out",
      excerpt: "PC gaming doesn't have to cost a fortune. These picks give you 90% of the experience at 40% of the price.",
      coverImage: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
      category: "Gaming",
      publishedAt: "2024-10-15",
      tags: ["Gaming", "Budget", "PC"],
    },
    {
      id: "4",
      slug: "coffee-gear-that-actually-matters",
      title: "The Coffee Gear That Actually Matters (And What's Just Hype)",
      excerpt: "A barista friend told me I was wasting money. She was right. Here's what to actually buy.",
      coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      category: "Lifestyle",
      publishedAt: "2024-09-30",
      tags: ["Coffee", "Lifestyle", "Kitchen"],
    },
    {
      id: "5",
      slug: "phone-cameras-are-too-good-now",
      title: "Phone Cameras Are Too Good Now — And That's a Problem",
      excerpt: "When everyone has a great camera, what does photography even mean anymore? A take.",
      coverImage: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80",
      category: "Tech",
      publishedAt: "2024-09-18",
      tags: ["Photography", "Smartphones", "Opinion"],
    },
    {
      id: "6",
      slug: "my-desk-setup-2024",
      title: "My 2024 Desk Setup: Every Item, Every Reason",
      excerpt: "People keep asking. Here's the full breakdown — monitor arms, cable management, the chair that saved my back.",
      coverImage: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
      category: "Lifestyle",
      publishedAt: "2024-09-05",
      tags: ["Desk Setup", "WFH", "Productivity"],
    },
  ];
}

function getMockMarkdown(title: string): string {
  return `
This is a mock post for **${title}**.

Connect your Notion database to see real content here. Add \`NOTION_API_KEY\` and \`NOTION_DATABASE_ID\` to your \`.env.local\` file.

## Getting Started

1. Create a Notion integration at [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Share your database with the integration
3. Copy the database ID from the URL
4. Add credentials to \`.env.local\`

Your content will appear here automatically once connected.
  `.trim();
}
