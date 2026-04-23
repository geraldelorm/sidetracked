import { getAllPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import AdBanner from "@/components/AdBanner";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="mb-16 text-center">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          Always sidetracked, never bored
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5" style={{ color: "var(--text)" }}>
          The internet&rsquo;s{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #a78bfa, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            favourite detour
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-base md:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Consumer electronics, tech deep-dives, lifestyle picks, and whatever random rabbit hole
          we fell into this week.
        </p>
      </section>

      {/* ── Ad banner ────────────────────────────────────── */}
      <div className="mb-12">
        <AdBanner slot="horizontal" />
      </div>

      {/* ── Featured post ────────────────────────────────── */}
      {featured && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
              Featured
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <PostCard post={featured} featured />
        </section>
      )}

      {/* ── Latest posts grid ────────────────────────────── */}
      {rest.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              Latest
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ── More posts ───────────────────────────────────── */}
      {rest.length > 3 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              More reads
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.slice(3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ── Bottom ad ────────────────────────────────────── */}
      <AdBanner slot="horizontal" />
    </div>
  );
}
