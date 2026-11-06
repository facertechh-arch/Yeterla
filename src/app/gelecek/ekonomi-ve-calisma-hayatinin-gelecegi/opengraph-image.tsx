import { createOgImage } from "@/lib/og-image";
import { ARTICLE } from "@/lib/gelecek-article";

/** 1. dosya için Open Graph / Twitter önizleme görseli. */
export const alt = `${ARTICLE.title} | Yeter La Gelecek Analizleri`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return createOgImage({
    kicker: "// YETER LA ANALİZ",
    badge: ARTICLE.fileNo,
    titleLead: ARTICLE.h1.lead,
    titleAccent: ARTICLE.h1.accent,
    description: ARTICLE.description,
  });
}
