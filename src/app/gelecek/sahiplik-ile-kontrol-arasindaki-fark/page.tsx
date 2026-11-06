import type { Metadata } from "next";
import ArticleView from "./article-view";
import { ARTICLE, SAHIPLIK_PATH, SECTIONS } from "@/lib/sahiplik-article";

const SITE_URL = "https://yeterla.com";
const PAGE_URL = `${SITE_URL}${SAHIPLIK_PATH}`;

export const metadata: Metadata = {
  title: `${ARTICLE.title} | Gelecek Analizleri`,
  description: ARTICLE.description,
  keywords: ARTICLE.keywords,
  alternates: { canonical: SAHIPLIK_PATH },
  authors: [{ name: "Yeter La İnisiyatifi" }],
  openGraph: {
    type: "article",
    title: `${ARTICLE.title} | Gelecek Analizleri`,
    description: ARTICLE.description,
    url: PAGE_URL,
    siteName: "Yeter La",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${ARTICLE.title} | Gelecek Analizleri`,
    description: ARTICLE.description,
  },
  robots: { index: true, follow: true },
};

/**
 * Yapılandırılmış veri (JSON-LD): makale içeriği, soru-cevap listesi ve
 * gezinme yolu. Arama motorlarının ve yapay zeka botlarının sayfayı
 * metin olarak doğru anlamlandırması için sunucuda (statik HTML içinde) üretilir.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: ARTICLE.title,
      name: ARTICLE.title,
      description: ARTICLE.description,
      inLanguage: "tr-TR",
      url: PAGE_URL,
      mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
      articleSection: ARTICLE.category,
      keywords: ARTICLE.keywords.join(", "),
      /** İçeriğin kaynağı: bu dosya yapay zekâdan destek alınarak hazırlanmıştır. */
      creativeWorkStatus: ARTICLE.origin,
      dateModified: ARTICLE.lastUpdated,
      author: {
        "@type": "Organization",
        name: "Yeter La Sivil Gençlik İnisiyatifi",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Yeter La",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
      },
      isPartOf: {
        "@type": "CollectionPage",
        name: "Gelecek Analizleri",
        url: `${SITE_URL}/gelecek`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: SECTIONS.map((section) => ({
        "@type": "Question",
        name: section.question,
        acceptedAnswer: { "@type": "Answer", text: section.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Gelecek Analizleri",
          item: `${SITE_URL}/gelecek`,
        },
        { "@type": "ListItem", position: 3, name: ARTICLE.title, item: PAGE_URL },
      ],
    },
  ],
};

export default function SahiplikIleKontrolArasindakiFarkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ArticleView />
    </>
  );
}
