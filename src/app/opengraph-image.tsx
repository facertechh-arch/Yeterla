import { createOgImage } from "@/lib/og-image";

/**
 * Site geneli Open Graph / Twitter önizleme görseli.
 *
 * Amaç: Bir bağlantı sosyal medyada, mesajlaşma uygulamasında veya yapay zekâ
 * sohbetinde paylaşıldığında güçlü ve okunur bir kart görünmesini sağlamak.
 * Bu, tıklanma oranını ve dolayısıyla siteye yönlenen insan sayısını artırır.
 */
export const alt = "Yeter La";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return createOgImage({
    kicker: "// YETER LA",
    badge: "GENÇLİK HAREKETİ",
    titleLead: "GELECEĞİNİ",
    titleAccent: "İNŞA ET!",
    description:
      "Şikayet etmeyi bırak, harekete geç. Merkeziyetsiz bir gençlik hareketi: doktrin, işleyiş ilkeleri ve gelecek analizleri.",
  });
}
