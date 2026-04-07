"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setStatus("duplicate");
      } else if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setEmail("");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="subscribe"
      className="rounded-2xl p-8 md:p-12 text-center"
      style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}
    >
      <div className="max-w-lg mx-auto">
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
          style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--border)" }}
        >
          Newsletter
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text)" }}>
          Get sidetracked with us
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          New posts on tech, consumer electronics, and life&rsquo;s little detours — straight to your inbox.
          No spam, unsubscribe any time.
        </p>

        {status === "success" ? (
          <div
            className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-medium text-sm"
            style={{ background: "var(--bg-card)", color: "#86efac", border: "1px solid #166534" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            You&rsquo;re in! Check your inbox for a confirmation email.
          </div>
        ) : status === "duplicate" ? (
          <div
            className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-medium text-sm"
            style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--border)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            You&rsquo;re already subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-colors"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-opacity disabled:opacity-60 shrink-0"
              style={{ background: "var(--accent)", color: "#ffffff" }}
            >
              {status === "loading" ? "Subscribing…" : "Subscribe →"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-xs" style={{ color: "#f87171" }}>{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
