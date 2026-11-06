import { createOgImage } from "@/lib/og-image";

/** Gelecek Analizleri dizin sayfası için Open Graph / Twitter önizleme görseli. */
export const alt = "Gelecek Analizleri | Yeter La";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return createOgImage({
    kicker: "// YETER LA",
    badge: "ANALİZ DİZİNİ",
    titleLead: "GELECEKTE BİZİ",
    titleAccent: "NE BEKLİYOR?",
    description:
      "Gelecekte karşılaşacağımız sorunları ve çözüm yollarını konu konu ele alan analiz dosyaları.",
  });
}
