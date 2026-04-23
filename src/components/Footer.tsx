import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
      className="mt-20"
    >
      <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span style={{ color: "var(--text)" }} className="font-semibold">
            Side<span style={{ color: "var(--accent)" }}>Tracked</span>
          </span>
          <span>— always sidetracked, never bored.</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter
          </a>
        </div>
        <p>© {new Date().getFullYear()} SideTracked. All rights reserved.</p>
      </div>
    </footer>
  );
}
