import type { Metadata } from "next";

const SITE_URL = "https://yeterla.com";

/**
 * /gelecek dizin sayfası sayfa (page.tsx) bir istemci bileşeni olduğu için
 * metadata burada, segment layout'unda tanımlanır. Alt sayfalardaki (analiz
 * dosyaları) kendi metadata'ları bu değerleri geçersiz kılar.
 */
export const metadata: Metadata = {
  title: "Gelecek Analizleri | Yeter La",
  description:
    "Gelecekte karşılaşacağımız sorunları ve çözüm yollarını konu konu ele alan analiz dosyaları: yapay zekâ ve ekonominin geleceği, sahiplik-kontrol-erişim ilişkisi.",
  keywords: [
    "gelecek analizleri",
    "yapay zeka ve işin geleceği",
    "otomasyon ve meslekler",
    "sahiplik ve kontrol farkı",
    "erişim hakkı",
    "dijital egemenlik",
    "yeter la analiz",
  ],
  alternates: { canonical: "/gelecek" },
  openGraph: {
    type: "website",
    title: "Gelecek Analizleri | Yeter La",
    description:
      "Gelecekte karşılaşacağımız sorunları ve çözüm yollarını konu konu ele alan analiz dosyaları.",
    url: `${SITE_URL}/gelecek`,
    siteName: "Yeter La",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelecek Analizleri | Yeter La",
    description:
      "Gelecekte karşılaşacağımız sorunları ve çözüm yollarını konu konu ele alan analiz dosyaları.",
  },
  robots: { index: true, follow: true },
};

export default function GelecekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
