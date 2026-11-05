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
  title: "Yeter La | Şikayet Etmeyi Bırak, Harekete Geç!",
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
    title: "Yeter La | Şikayet Etmeyi Bırak, Harekete Geç!",
    description:
      "Yeter La'nın merkeziyetsiz hareket doktrini, işleyiş ilkeleri ve yaşayan manifestosu tek yerde.",
    url: "https://yeterla.com",
    siteName: "Yeter La",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeter La | Şikayet Etmeyi Bırak, Harekete Geç!",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Yeter La Sivil Gençlik İnisiyatifi",
      "url": "https://yeterla.com",
      "logo": "https://yeterla.com/favicon.ico",
      "description":
        "Yeter La; merkeziyetsiz hareket doktrini temelinde bağımsız ve değiştirilebilir manifesto yapısına sahip bir gençlik hareketidir.",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "yeterla02@proton.me",
        "contactType": "Customer Service"
      }
    },
    {
      "@type": "WebPage",
      "name": "Yeter La | Gençlik Hareketi Doktrini ve İşleyiş İlkeleri",
      "url": "https://yeterla.com",
      "inLanguage": "tr-TR",
      "description":
        "Yeter La'nın işleyiş ilkeleri, merkeziyetsiz hareket doktrini, stratejik avantajları ve yaşayan manifesto yaklaşımı.",
      "about": [
        "Gençlik Hareketi Doktrini",
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
