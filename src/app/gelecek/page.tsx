"use client";

import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";
import { ArrowLeft, Folder as FolderIcon, FileText } from "lucide-react";
import Link from "next/link";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

const TOPICS = [
  {
    id: "ekonomi-gelecek",
    title: "1) Ekonomi ve çalışma hayatının geleceği",
    desc: "Yapay zeka, otomasyon ve yeni ekonomik modellerin iş dünyasına etkisi.",
    date: "AÇIK",
    active: true,
    href: "/gelecek/ekonomi-ve-calisma-hayatinin-gelecegi"
  },
  {
    id: "sahiplik-kontrol",
    title: "2) Sahiplik ile kontrol arasındaki fark",
    desc: "Mülkiyet, kontrol ve erişim: bir şirket sahip olmadığı bir teknolojiyi nasıl kontrol edebilir?",
    date: "AÇIK",
    active: true,
    href: "/gelecek/sahiplik-ile-kontrol-arasindaki-fark"
  },
  {
    id: "devlet-demokrasi",
    title: "3) Devlet ve demokrasi",
    desc: "Devletin işleyişi, demokrasinin geleceği ve karar alma süreçlerinde vatandaşın rolü.",
    date: "YAKINDA",
    active: false,
    href: "#"
  },
  {
    id: "egitim-gelisim",
    title: "4) Eğitim ve insanın gelişimi",
    desc: "Eğitim sisteminin dönüşümü ve insanın gelişimini destekleyen yeni öğrenme modelleri.",
    date: "YAKINDA",
    active: false,
    href: "#"
  },
  {
    id: "toplum-iliskiler",
    title: "5) Toplum ve insan ilişkileri",
    desc: "Toplumsal bağlar, dayanışma ve insan ilişkilerinin gelecekte alacağı biçim.",
    date: "YAKINDA",
    active: false,
    href: "#"
  },
  {
    id: "kaynaklar-enerji",
    title: "6) Kaynaklar, enerji ve yaşam koşulları",
    desc: "Kaynakların dağılımı, enerji dönüşümü ve yaşam koşullarının sürdürülebilirliği.",
    date: "YAKINDA",
    active: false,
    href: "#"
  }
];

const SITE_URL = "https://yeterla.com";
const PAGE_URL = `${SITE_URL}/gelecek`;

/**
 * Dizin sayfası için yapılandırılmış veri: bu sayfanın bir "koleksiyon"
 * olduğunu, altındaki analiz dosyalarının listesini ve gezinme yolunu
 * arama motorlarına ve yapay zekâ botlarına anlatır.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#page`,
      "name": "Gelecek Analizleri",
      "url": PAGE_URL,
      "inLanguage": "tr-TR",
      "description":
        "Gelecekte karşılaşacağımız sorunları ve çözüm yollarını konu konu ele alan analiz dosyaları.",
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "about": { "@id": `${SITE_URL}/#organization` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
    },
    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#list`,
      "name": "Gelecek Analizleri dosyaları",
      "itemListElement": TOPICS.filter((topic) => topic.active).map(
        (topic, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": topic.title,
          "description": topic.desc,
          "url": `${SITE_URL}${topic.href}`
        })
      )
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Gelecek Analizleri", "item": PAGE_URL }
      ]
    }
  ]
};

export default function FuturePage() {
  return (
    <main className="min-h-screen bg-[#060608] text-white selection:bg-[#FF003C] selection:text-white flex flex-col items-center relative overflow-clip font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF003C]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="w-full border-b border-zinc-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> GERİ DÖN
          </Link>
          <span className={`${bebasNeue.className} text-xl tracking-widest text-white`}>GELECEK ANALİZLERİ</span>
        </div>
      </header>

      {/* Content */}
      <div className="w-full max-w-5xl px-6 py-16 md:py-24 space-y-16 z-10">
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${bebasNeue.className} text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight uppercase`}
          >
            GELECEKTE BİZİ <br />
            <span className="text-[#FF003C]">NE BEKLİYOR?</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${spaceGrotesk.className} text-zinc-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed`}
          >
            Sistem şöyle işleyecek: Gelecekte karşılaşacağımız sorunları ve çözüm yollarını konu konu burada depolayacağız.
          </motion.p>
        </div>

        {/* Folder Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {TOPICS.map((topic, i) => (
            <Link 
              key={topic.id}
              href={topic.href}
              className={topic.active ? "block" : "pointer-events-none"}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`group relative ${topic.active ? "cursor-pointer" : "opacity-60 grayscale"}`}
              >
                {/* Folder Shape */}
                <div className="relative pt-4">
                  {/* Folder Tab */}
                  <div className={`absolute top-0 left-0 w-16 h-4 rounded-t-lg transition-colors ${topic.active ? "bg-zinc-800 group-hover:bg-[#FF003C]" : "bg-zinc-900"}`} />
                  
                  {/* Folder Body */}
                  <div className={`bg-zinc-900 border p-4 md:p-6 aspect-[4/5] flex flex-col justify-between transition-all shadow-xl relative overflow-hidden ${topic.active ? "border-zinc-800 group-hover:border-[#FF003C]/50" : "border-zinc-950"}`}>
                    <div className="space-y-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-black/50 flex items-center justify-center transition-colors ${topic.active ? "text-zinc-600 group-hover:text-[#FF003C]" : "text-zinc-800"}`}>
                        <FolderIcon className="w-6 h-6" />
                      </div>
                      <h3 className={`${spaceGrotesk.className} text-xs md:text-sm font-bold leading-tight ${topic.active ? "text-zinc-200 group-hover:text-white" : "text-zinc-600"}`}>
                        {topic.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        <Clock size={10} /> {topic.date}
                      </div>
                      {topic.active && (
                        <div className="h-1 w-full bg-zinc-800 overflow-hidden">
                          <div className="h-full bg-[#FF003C] w-0 group-hover:w-full transition-all duration-700" />
                        </div>
                      )}
                    </div>

                    {/* Inner Content Preview */}
                    {topic.active && (
                      <div className="absolute inset-0 bg-black/95 p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className={`${spaceGrotesk.className} text-[10px] md:text-xs text-zinc-400 leading-relaxed`}>
                          {topic.desc}
                        </p>
                        <span className={`${bebasNeue.className} text-[#FF003C] mt-4 text-lg tracking-widest`}>
                          DOSYAYI AÇ
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          
          {/* Add more placeholder folders if needed to show grid */}
          {[1, 2].map((n) => (
            <div key={n} className="opacity-20 pointer-events-none pt-4">
              <div className="absolute top-0 left-0 w-16 h-4 bg-zinc-900 rounded-t-lg" />
              <div className="bg-zinc-950 border border-zinc-900 aspect-[4/5] rounded-b-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer link back to home */}
      <footer className="w-full py-12 px-6 border-t border-zinc-900 mt-auto bg-black/30">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className={`${spaceGrotesk.className} text-xs font-mono text-zinc-600 uppercase tracking-widest`}>
            © 2026 YETER LA // ANALİZ DOSYALARI
          </span>
          <Link 
            href="/" 
            className={`${bebasNeue.className} text-xl text-white hover:text-[#FF003C] transition-colors uppercase tracking-widest`}
          >
            ANA SAYFAYA DÖN
          </Link>
        </div>
      </footer>
    </main>
  );
}

// Simple Clock icon component
function Clock({ size = 12 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
