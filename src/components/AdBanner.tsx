"use client";

import { useEffect, useRef } from "react";

const AD_SLOTS = {
  horizontal: "2774729962", // 728×90 leaderboard
  sidebar: "1690854794",    // 300×250 medium rectangle
};

const AD_SIZES: Record<string, { width: number; height: number }> = {
  horizontal: { width: 728, height: 90 },
  sidebar: { width: 300, height: 250 },
};

export default function AdBanner({ slot = "horizontal" }: { slot?: "horizontal" | "sidebar" }) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch (e) {
      // adsbygoogle not ready yet
    }
  }, []);

  const { width, height } = AD_SIZES[slot];

  return (
    <div
      style={{
        minWidth: width,
        minHeight: height,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width, height }}
        data-ad-client="ca-pub-9012185624278768"
        data-ad-slot={AD_SLOTS[slot]}
        data-ad-format="fixed"
      />
    </div>
  );
}
