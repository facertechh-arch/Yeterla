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
  description: "Sürekli şikayet etmek hiçbir şeyi çözmedi. Bölgeni seç, kendi gençlik grubuna katıl, bir araya gel ve değişimi yerelden başlat.",
  keywords: ["yeter la", "gençlik inisiyatifi", "bir araya gelme", "sivil toplum", "telegram hücreleri", "aktivizm", "değişim", "türkiye gençliği"],
  authors: [{ name: "Yeter La İnisiyatifi" }],
  creator: "Yeter La Sivil Gençlik İnisiyatifi",
  publisher: "Yeter La",
  openGraph: {
    title: "Yeter La | Şikayet Etmeyi Bırak, Bir Araya Gel!",
    description: "Sürekli şikayet etmek hiçbir şeyi çözmedi. Bölgeni seç, kendi gençlik grubuna katıl, bir araya gel ve değişimi yerelden başlat.",
    url: "https://yeterla.com",
    siteName: "Yeter La",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeter La | Şikayet Etmeyi Bırak, Bir Araya Gel!",
    description: "Sürekli şikayet etmek hiçbir şeyi çözmedi. Bölgeni seç, kendi gençlik grubuna katıl, bir araya gel ve değişimi yerelden başlat.",
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
  "@type": "Organization",
  "name": "Yeter La Sivil Gençlik İnisiyatifi",
  "url": "https://yeterla.com",
  "logo": "https://yeterla.com/favicon.ico",
  "description": "Sürekli şikayet etmek hiçbir şeyi çözmedi. Bölgeni seç, kendi gençlik grubuna katıl, bir araya gel ve değişimi yerelden başlat.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "yeterla@tutamail.com",
    "contactType": "Customer Service"
  }
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
