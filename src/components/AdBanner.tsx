"use client";

// Swap this out for a real Google AdSense unit once approved.
// Add your client ID to .env.local as NEXT_PUBLIC_ADSENSE_CLIENT_ID
// then replace the placeholder div with:
// <ins className="adsbygoogle" data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} data-ad-slot="..." />

export default function AdBanner({ slot = "horizontal" }: { slot?: "horizontal" | "sidebar" }) {
  const isSidebar = slot === "sidebar";

  return (
    <div
      className={`flex items-center justify-center rounded-xl text-xs font-medium ${
        isSidebar ? "w-full h-60" : "w-full h-24"
      }`}
      style={{
        background: "var(--bg-muted)",
        border: "1px dashed var(--border)",
        color: "var(--text-faint)",
      }}
    >
      Advertisement · {isSidebar ? "300×250" : "728×90"}
    </div>
  );
}
