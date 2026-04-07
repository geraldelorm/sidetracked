import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Client } from "@notionhq/client";

const BLOG_URL = process.env.BLOG_URL ?? "https://sidetracked-two.vercel.app";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const dbId = process.env.NOTION_SUBSCRIBERS_DB_ID;
    if (!dbId) throw new Error("NOTION_SUBSCRIBERS_DB_ID not set");

    // ── 1. Check for duplicate ────────────────────────────
    const existing = await notion.databases.query({
      database_id: dbId,
      filter: { property: "Email", title: { equals: email } },
    });

    if (existing.results.length > 0) {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 409 }
      );
    }

    // ── 2. Save to Notion ─────────────────────────────────
    await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Email: { title: [{ text: { content: email } }] },
        Status: { select: { name: "Active" } },
        Source: { rich_text: [{ text: { content: "Blog subscribe form" } }] },
      },
    });

    // ── 3. Send confirmation email via Resend ─────────────
    await resend.emails.send({
      from: "AltTab <onboarding@resend.dev>",
      to: email,
      subject: "You're in — welcome to AltTab 🎉",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0c0c0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c0c0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111116;border-radius:16px;border:1px solid #1e1e2a;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #1e1e2a;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#e8e8ea;">
              Alt<span style="color:#a78bfa;">Tab</span>
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#e8e8ea;line-height:1.3;">
              You're officially sidetracked 🎉
            </h1>
            <p style="margin:0 0 20px;font-size:15px;color:#7a7a8a;line-height:1.7;">
              Thanks for subscribing. You'll get new posts on tech, consumer electronics,
              lifestyle, and whatever rabbit hole we fell into that week — straight to your inbox.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#7a7a8a;line-height:1.7;">
              No spam, no fluff. Unsubscribe any time.
            </p>
            <a href="${BLOG_URL}"
               style="display:inline-block;background:#a78bfa;color:#0c0c0f;font-size:14px;font-weight:600;padding:12px 24px;border-radius:50px;text-decoration:none;">
              Read the latest →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px 28px;border-top:1px solid #1e1e2a;">
            <p style="margin:0;font-size:12px;color:#4a4a5a;line-height:1.6;">
              You subscribed at <a href="${BLOG_URL}" style="color:#7a7a8a;">${BLOG_URL}</a>.<br>
              If this was a mistake, you can safely ignore this email.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
