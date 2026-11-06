import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yeter La",
  description:
    "Yeter La; merkeziyetsiz hareket doktrini, işleyiş ilkeleri ve değiştirilebilir manifestosu ile gençliğin yerelden örgütlenmesini amaçlayan bağımsız bir harekettir.",
  keywords: [
    "yeter la",
    "yeterla",
    "gençlik hareketi",
    "işleyiş ilkeleri",
    "merkeziyetsiz gençlik hareketi",
    "gençlik inisiyatifi",
    "manifesto",
    "signal",
    "türkiye gençliği",
  ],
  authors: [{ name: "Yeter La İnisiyatifi" }],
  creator: "Yeter La Sivil Gençlik İnisiyatifi",
  publisher: "Yeter La",
  metadataBase: new URL("https://yeterla.com"),
  openGraph: {
    title: "Yeter La",
    description:
      "Yeter La'nın merkeziyetsiz hareket doktrini, işleyiş ilkeleri ve yaşayan manifestosu tek yerde.",
    url: "https://yeterla.com",
    siteName: "Yeter La",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeter La",
    description:
      "Gençlik hareketi doktrini, işleyiş ilkeleri ve değiştirilebilir manifesto yapısı.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const SITE_URL = "https://yeterla.com";

/**
 * Site kimliğini tanımlayan yapılandırılmış veri.
 *
 * Arama motorları ve yapay zekâ yanıt motorlarının (ChatGPT, Perplexity,
 * Gemini vb.) "Yeter La nedir, ne yapar, nerede faaliyet gösterir" sorularına
 * doğru cevap üretebilmesi ve kaynak olarak siteyi göstermesi için hazırlanır.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Yeter La Sivil Gençlik İnisiyatifi",
      "alternateName": ["Yeter La", "YeterLa"],
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        "url": `${SITE_URL}/icon.svg`,
        "caption": "Yeter La"
      },
      "image": { "@id": `${SITE_URL}/#logo` },
      "slogan": "Şikayet etmeyi bırak, harekete geç!",
      "description":
        "Yeter La; merkeziyetsiz hareket doktrini temelinde bağımsız ve değiştirilebilir manifesto yapısına sahip bir gençlik hareketidir.",
      "knowsLanguage": "tr",
      "areaServed": { "@type": "Country", "name": "Türkiye" },
      "knowsAbout": [
        "Merkeziyetsiz gençlik hareketi",
        "İşleyiş ilkeleri ve yatay hiyerarşi",
        "Değiştirilebilir manifesto",
        "Yerel örgütlenme ve inisiyatif",
        "Gelecek analizleri",
        "Yapay zekâ ve ekonominin geleceği",
        "Sahiplik, kontrol ve erişim"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "@id": `${SITE_URL}/#contact`,
        "email": "yeterla02@proton.me",
        "contactType": "Customer Service",
        "availableLanguage": "tr"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Yeter La",
      "alternateName": "YeterLa",
      "inLanguage": "tr-TR",
      "description":
        "Yeter La; merkeziyetsiz hareket doktrini, işleyiş ilkeleri ve gelecek analizleri ile gençliğin yerelden örgütlenmesini amaçlayan bağımsız bir harekettir.",
      "publisher": { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      "name": "Yeter La | Gençlik Hareketi Doktrini ve İşleyiş İlkeleri",
      "url": SITE_URL,
      "inLanguage": "tr-TR",
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "about": { "@id": `${SITE_URL}/#organization` },
      "description":
        "Yeter La'nın işleyiş ilkeleri, merkeziyetsiz hareket doktrini, stratejik avantajları ve yaşayan manifesto yaklaşımı.",
      "primaryImageOfPage": { "@id": `${SITE_URL}/#logo` }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
