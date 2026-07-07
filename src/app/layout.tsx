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
  title: "Yeter La | Şikayet Etmeyi Bırak, Bir Araya Gel!",
  description:
    "YeterLa; dağınık gençlik örgütlenmesi doktrini, işleyiş ilkeleri ve değiştirilebilir manifestosu ile gençliğin yerelden örgütlenmesini amaçlayan merkeziyetsiz bir harekettir.",
  keywords: [
    "yeter la",
    "yeterla",
    "dağınık gençlik örgütlenmesi",
    "işleyiş ilkeleri",
    "merkeziyetsiz gençlik hareketi",
    "gençlik inisiyatifi",
    "manifesto",
    "telegram",
    "signal",
    "türkiye gençliği",
  ],
  authors: [{ name: "Yeter La İnisiyatifi" }],
  creator: "Yeter La Sivil Gençlik İnisiyatifi",
  publisher: "Yeter La",
  metadataBase: new URL("https://yeterla.com"),
  openGraph: {
    title: "Yeter La | Şikayet Etmeyi Bırak, Bir Araya Gel!",
    description:
      "YeterLa'nın dağınık gençlik örgütlenmesi doktrini, işleyiş ilkeleri ve yaşayan manifestosu tek yerde.",
    url: "https://yeterla.com",
    siteName: "Yeter La",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeter La | Şikayet Etmeyi Bırak, Bir Araya Gel!",
    description:
      "Dağınık gençlik örgütlenmesi doktrini, işleyiş ilkeleri ve değiştirilebilir manifesto yapısı.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Yeter La Sivil Gençlik İnisiyatifi",
      "url": "https://yeterla.com",
      "logo": "https://yeterla.com/favicon.ico",
      "description":
        "YeterLa; dağınık gençlik örgütlenmesi doktrini temelinde merkeziyetsiz, bağımsız ve değiştirilebilir manifesto yapısına sahip bir gençlik hareketidir.",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "yeterla@tutamail.com",
        "contactType": "Customer Service"
      }
    },
    {
      "@type": "WebPage",
      "name": "YeterLa | Dağınık Gençlik Örgütlenmesi Doktrini ve İşleyiş İlkeleri",
      "url": "https://yeterla.com",
      "inLanguage": "tr-TR",
      "description":
        "YeterLa'nın işleyiş ilkeleri, dağınık gençlik örgütlenmesi doktrini, stratejik avantajları ve yaşayan manifesto yaklaşımı.",
      "about": [
        "Dağınık Gençlik Örgütlenmesi Doktrini",
        "Merkeziyetsiz gençlik hareketi",
        "İşleyiş ilkeleri",
        "Değiştirilebilir manifesto"
      ]
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
