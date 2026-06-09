export const CATEGORIES = ["Tech", "Lifestyle", "Gaming", "Productivity", "Opinion"] as const;

export type Category = (typeof CATEGORIES)[number];

/** Lowercase slugs for use in URLs and filtering */
export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.toLowerCase());
