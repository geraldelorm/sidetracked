import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SideTracked",
  description:
    "SideTracked is a personal blog covering tech, consumer electronics, gaming, lifestyle, and productivity — always sidetracked, never bored.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Home
      </Link>

      {/* Header */}
      <section className="mb-14">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          About
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-5"
          style={{ color: "var(--text)" }}
        >
          Side
          <span style={{ color: "var(--accent)" }}>Tracked</span>
        </h1>
        <p
          className="max-w-2xl text-base md:text-lg leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Always sidetracked, never bored. SideTracked is a personal blog about the things worth
          talking about — consumer electronics, tech deep-dives, gaming, productivity, and whatever
          random rabbit hole we fell into this week.
        </p>
      </section>

      {/* Divider */}
      <div className="mb-14" style={{ height: "1px", background: "var(--border)" }} />

      {/* What we cover */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>
          What we cover
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              emoji: "💻",
              title: "Tech",
              desc: "Software, tools, and the ideas shaping how we work and live online.",
            },
            {
              emoji: "🎮",
              title: "Gaming",
              desc: "Games worth playing, hardware worth buying, and opinions nobody asked for.",
            },
            {
              emoji: "📱",
              title: "Consumer Electronics",
              desc: "Gadgets, gear, and honest takes on whether any of it is actually worth it.",
            },
            {
              emoji: "⚡",
              title: "Productivity",
              desc: "Systems, habits, and apps that might actually help you get things done.",
            },
            {
              emoji: "🌿",
              title: "Lifestyle",
              desc: "Everything that doesn't fit neatly into a category but is worth writing about.",
            },
            {
              emoji: "💬",
              title: "Opinion",
              desc: "Hot takes, unpopular truths, and things we just needed to get off our chest.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-5"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <p className="text-2xl mb-2">{emoji}</p>
              <p className="font-semibold mb-1" style={{ color: "var(--text)" }}>
                {title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
