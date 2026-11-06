"use client";

import { useState, useEffect, useRef } from "react";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ManifestoView from "@/components/manifesto-view";
import ManifestoSheet from "@/components/manifesto-sheet";
import { SignalGroupsPanel } from "@/components/signal-groups-panel";
import SecretAdminModal from "@/components/secret-admin-modal";

// Fontlar
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://yeterla.com";

/**
 * Ana sayfa için sıkça sorulan sorular yapılandırılmış verisi.
 *
 * Yapay zekâ yanıt motorları "Yeter La nedir, nasıl katılınır" gibi sorulara
 * cevap üretirken bu alanı kullanır; böylece kaynak olarak site gösterilir.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  "inLanguage": "tr-TR",
  "isPartOf": { "@id": `${SITE_URL}/#webpage` },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Yeter La nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Yeter La; kurumsal olmayan, merkeziyetsiz ve bağımsız bir gençlik hareketidir. Türkiye'deki gençliğin ortak bir refleksle birleşerek somut ve organize eylemler düzenlemesini amaçlar."
      }
    },
    {
      "@type": "Question",
      "name": "Yeter La'ya nasıl katılabilirim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Sitedeki katılım bölümünden Signal gruplarına katılarak veya yeterla02@proton.me adresine yazarak harekete dahil olabilirsin. Herkes YeterLa adına sosyal medya hesabı açabilir ve bağımsız proje üretebilir."
      }
    },
    {
      "@type": "Question",
      "name": "Yeter La merkezi bir yapı mı?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Hayır. Belirli bir lider ya da imtiyazlı bir zümre yoktur. Gençler kendi yerel hücrelerini, gruplarını veya topluluklarını kurar; bu yapılar Yeter La şemsiyesi altında dirsek teması hâlinde kalır ve hiyerarşik bir emir-komuta zinciri gerekmez."
      }
    },
    {
      "@type": "Question",
      "name": "Yeter La manifestoyu nasıl ele alıyor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Manifesto sabit değildir; yaşayan ve değiştirilebilir bir metindir. Katılımcılar manifesto alanında görüş yazabilir, değişiklik önerisi bırakabilir ve ortak metnin gelişimine katkı sunabilir."
      }
    },
    {
      "@type": "Question",
      "name": "Yeter La hangi platformlarda örgütleniyor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Bağımsız gruplar, iletişim ağlarını Telegram ve Signal kanalları üzerinden koordine eder; ortak refleks noktalarında birleşerek eş zamanlı hareket eder."
      }
    }
  ]
};

const WORKFLOW_ADVANTAGES = [
  {
    title: "Süreklilik ve direnç",
    body: "Herhangi bir grup pasifleşse, dağılsa ya da dış müdahaleye maruz kalsa bile diğer bağımsız gruplar çalışmaya devam eder.",
    emphasis: "Yapının tek bir zayıf noktası yoktur.",
  },
  {
    title: "Demokratik ve özgür ortam",
    body: "Kararlar tepeden inme emirlerle değil, tabanın dinamik katılımı ve serbest fikir alışverişiyle şekillenir.",
    emphasis: "Kolektif akıl merkezdedir.",
  },
  {
    title: "Yüksek mobilizasyon kabiliyeti",
    body: "Bürokrasi barındırmayan hafif yapılanmalar daha samimi, daha hızlı ve daha verimli refleksler üretir.",
    emphasis: "Acil eylem odağı korunur.",
  },
];

const WORKFLOW_PRINCIPLES = [
  {
    title: "Yatay hiyerarşi ve organik liyakat",
    body: "Belirli bir lider ya da imtiyazlı bir zümre yoktur. Aktif olan, düşünen, emek veren ve proje üreten insanlar doğal biçimde üst koordinasyon alanlarına çekilir.",
  },
  {
    title: "Tam inisiyatif ve özerklik",
    body: "Her katılımcı veya yerel grup, kimseden izin almadan kendi alanına yönelik görevler tanımlayabilir ve projelerini YeterLa adı altında yayınlayabilir.",
  },
  {
    title: "Yerel istişare ve toplantılar",
    body: "Alt gruplar kendi içlerinde serbestçe toplantılar düzenler; ortak strateji için sonuç özetlerinin koordinasyon kanallarına iletilmesi beklenir.",
  },
  {
    title: "Yaygın temsil ve tanıtım",
    body: "Herkes YeterLa adına sosyal medya hesapları açabilir, içerik üretebilir ve bağımsız projelerinin yayılımını güçlendirebilir.",
  },
];

export default function Home() {
  const [count, setCount] = useState<number | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<"join" | "manifesto">("join");
  const [isManifestoSheetOpen, setIsManifestoSheetOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const prevCountRef = useRef<number | null>(null);
  const [showSecretAdmin, setShowSecretAdmin] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "1") {
      setShowSecretAdmin(true);
    }
  }, []);

  // Başlangıç sayacını çek
  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        if (data && data.counter) {
          setCount(Number(data.counter));
        } else {
          setCount(5732);
        }
      } catch (err) {
        setCount(5732);
        // Hata olursa sessizce geç
      }
    };

    fetchCounter();
  }, []);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const channel = supabase
      .channel(`stats-live-${crypto.randomUUID()}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "stats",
          filter: "id=eq.1",
        },
        (payload: { new: { counter?: number } }) => {
          const row = payload.new;
          if (row?.counter !== undefined) {
            setCount(Number(row.counter));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sayı artınca animasyon tetikle
  useEffect(() => {
    if (count !== null) {
      prevCountRef.current = count;
    }
  }, [count]);

  // Gizli menü için klavye dinleyicisi
  useEffect(() => {
    let keys = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      keys += e.key;
      if (keys.length > 4) {
        keys = keys.slice(-4);
      }
      if (keys === "/-*0") {
        keys = "";
        setShowSecretAdmin((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sayaç için ufak bi interval (ortalama 10 dk)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runSyncIncrement = () => {
      const minDelay = 8 * 60 * 1000; // 8 minutes
      const maxDelay = 12 * 60 * 1000; // 12 minutes
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

      timeoutId = setTimeout(async () => {
        // UI'ı anında güncelle
        setCount((prev) => (prev !== null ? prev + 1 : prev));

        try {
          // Arka planda db'ye yaz
          await fetch("/api/stats", { method: "POST" });
        } catch (err) {
          // Fail silently
        }
        runSyncIncrement();
      }, randomDelay);
    };

    runSyncIncrement();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isWorkflowModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsWorkflowModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWorkflowModalOpen]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="min-h-screen bg-[#060608] text-white selection:bg-white selection:text-black flex flex-col items-center justify-between relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 w-full bg-black/95 backdrop-blur-md border-b border-zinc-900 z-30 select-none">
        {/* Mobile View: Simple tabs */}
        <div className="flex md:hidden w-full font-mono text-sm font-black">
          <button
            onClick={() => setActiveMobileTab("join")}
            className={`w-1/3 py-4 text-center tracking-widest relative cursor-pointer ${
              activeMobileTab === "join" ? "text-white" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            KATIL
            {activeMobileTab === "join" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              />
            )}
          </button>
          <button
            onClick={() => setActiveMobileTab("manifesto")}
            className={`w-1/3 py-4 text-center tracking-widest relative cursor-pointer ${
              activeMobileTab === "manifesto" ? "text-white" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            MANİFESTO
            {activeMobileTab === "manifesto" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              />
            )}
          </button>
          <Link
            href="/gelecek"
            className="w-1/3 py-4 text-center tracking-widest relative cursor-pointer text-zinc-600 hover:text-white"
          >
            GELECEK
          </Link>
        </div>

        {/* Desktop View: Sleek top header bar */}
        <div className="hidden md:flex max-w-5xl mx-auto w-full px-6 py-4 items-center justify-between font-mono">
          <Link href="/" className="text-xl font-black tracking-widest hover:text-[#FF003C] transition-colors">
            // YETER LA
          </Link>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <Link 
              href="/gelecek" 
              className="px-3 py-1.5 border border-zinc-800 text-zinc-400 hover:text-[#FF003C] hover:border-[#FF003C] transition-all cursor-pointer bg-zinc-950"
            >
              GELECEKTE BİZİ NE BEKLİYOR?
            </Link>
            <button
              onClick={() => setIsWorkflowModalOpen(true)}
              className="px-3 py-1.5 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer bg-zinc-950"
            >
              İŞLEYİŞ
            </button>
            <button
              onClick={() => setIsManifestoSheetOpen(true)}
              className="px-3 py-1.5 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer bg-zinc-950"
            >
              MANIFESTO
            </button>
          </div>
        </div>
      </header>

      {/* Brutalist Grid Overlay Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-45" />

      {/* glowing accent gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FF003C]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-zinc-800/20 blur-[180px] rounded-full pointer-events-none" />

      {/* Wrapper to control responsive view switching */}
      <div className={activeMobileTab === "join" ? "w-full flex flex-col items-center flex-1 z-10" : "hidden md:flex w-full flex-col items-center flex-1 z-10"}>
        {/* Hero Section */}
        <div className="w-full max-w-5xl px-6 py-12 md:py-24 flex flex-col items-center justify-center text-center space-y-12 flex-1">
        
        {/* Massive Pulsing Interactive Circle */}
        <div className="relative flex items-center justify-center mt-6">
          {/* Outer glow ring */}
          <motion.div
            className="absolute w-[290px] h-[290px] md:w-[390px] md:h-[390px] rounded-full bg-white/5 filter blur-2xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Dash Border Ring */}
          <motion.div
            className="absolute w-[295px] h-[295px] md:w-[395px] md:h-[395px] rounded-full border border-zinc-800"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />

          {/* Interactive Button Counter */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToForm}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-zinc-950 border border-zinc-800 shadow-[0_0_50px_rgba(255,255,255,0.02)] hover:shadow-[0_0_80px_rgba(255,255,255,0.05)] hover:border-zinc-700 transition-all duration-300 select-none flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
          >
            {/* Embedded internal pattern grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="absolute top-10 md:top-14 flex items-center gap-1.5 text-xs text-[#FF003C] tracking-widest font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#FF003C] animate-pulse" />
              <span>HAREKET KATILIMI</span>
            </div>

            {/* Large Counter */}
            <span className={`${bebasNeue.className} text-7xl md:text-9xl font-extrabold text-white mt-4 tracking-tight`}>
              {count !== null ? count : "---"}
            </span>

            <span className={`${spaceGrotesk.className} text-xs md:text-sm font-bold tracking-widest text-zinc-400 mt-2 uppercase group-hover:text-white transition-colors duration-300`}>
              bize katıl / signal
            </span>

            <motion.div 
              className="absolute bottom-6 text-zinc-700 group-hover:text-white transition-colors duration-300"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Headers */}
        <div className="space-y-6 max-w-3xl">
          <h1 className={`${bebasNeue.className} text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight uppercase`}>
            GELECEĞİNİ <br />
            <span className="text-white bg-zinc-900 px-4 py-1 inline-block shadow-[4px_4px_0px_#fff]">
              İNŞA ET!
            </span>
          </h1>
          
          <p className={`${spaceGrotesk.className} text-zinc-500 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed`}>
            Şikayet etmeyi bırak, harekete geç. Gençlik gruplarına katıl, bir araya gel ve değişimi başlat.
          </p>

          <button
            type="button"
            onClick={() => setIsWorkflowModalOpen(true)}
            className="group w-full max-w-2xl mx-auto text-left border border-zinc-800 bg-zinc-950/50 hover:border-white transition-all duration-300 p-5 md:p-6 cursor-pointer"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-zinc-500 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                  İşleyiş Dosyası
                </span>
                <h2 className={`${bebasNeue.className} text-3xl md:text-4xl text-white tracking-wide uppercase`}>
                  Nasıl örgütleniyoruz?
                </h2>
                <p className={`${spaceGrotesk.className} text-sm md:text-base text-zinc-500 leading-relaxed max-w-xl`}>
                  Stratejik avantajları, işleyiş ilkelerini ve hedeflerimizi incele.
                </p>
              </div>
              <span className={`${bebasNeue.className} inline-flex items-center gap-2 text-xl md:text-2xl text-zinc-400 group-hover:text-white transition-colors`}>
                İNCELE <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Form Portal replaced with Signal Panel */}
      <section 
        ref={formRef} 
        id="join" 
        className="w-full py-16 md:py-28 px-6 bg-[#09090b] border-t border-zinc-900 flex flex-col items-center justify-center relative z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01),transparent_70%)] pointer-events-none" />

        <div className="w-full max-w-lg mx-auto">
          <div className="bg-black border border-zinc-800 p-8 md:p-12 relative overflow-hidden">
            <div className="mb-8 border-b border-dashed border-zinc-800 pb-6 text-center sm:text-left">
              <h3 className={`${bebasNeue.className} text-4xl md:text-5xl font-black text-white tracking-wide uppercase`}>
                BİR ARAYA GEL
              </h3>
              <p className={`${spaceGrotesk.className} text-sm text-zinc-500 mt-1 uppercase font-semibold`}>
                Signal ağımıza katıl, iletişime geç.
              </p>
            </div>

            <SignalGroupsPanel />
          </div>
        </div>
      </section>
      </div>


      {activeMobileTab === "manifesto" && (
        <div className="w-full max-w-xl px-6 py-12 flex-1 md:hidden z-10">
          <ManifestoView />
        </div>
      )}

      {/* Footer */}
      <footer className="w-full z-10 border-t border-zinc-900 py-8 px-6 bg-[#040405] text-zinc-600 text-center flex flex-col md:flex-row items-center justify-between select-none gap-4">
        <span className={`${spaceGrotesk.className} text-xs font-mono tracking-widest uppercase`}>
          © 2026 YETER LA
        </span>
        <div className={`${bebasNeue.className} flex items-center gap-6 text-lg tracking-widest flex-wrap justify-center`}>
          <a href="#join" className="hover:text-white transition-colors duration-300">KATIL</a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault(); 
              if (window.innerWidth < 768) {
                setActiveMobileTab("manifesto");
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                setIsManifestoSheetOpen(true);
              }
            }} 
            className="hover:text-white transition-colors duration-300"
          >
            MANIFESTO
          </a>
          <button
            type="button"
            onClick={() => setIsWorkflowModalOpen(true)}
            className="hover:text-white transition-colors duration-300"
          >
            İŞLEYİŞ
          </button>
          <span 
            className={`${spaceGrotesk.className} text-sm font-mono text-zinc-500 select-all cursor-pointer hover:text-[#FF003C] transition-colors duration-300`}
            title="Adresi kopyala"
            onClick={() => {
              navigator.clipboard.writeText("yeterla02@proton.me");
              setEmailCopied(true);
              setTimeout(() => setEmailCopied(false), 2000);
            }}
          >
            {emailCopied ? "[KOPYALANDI!]" : "yeterla02@proton.me"}
          </span>
        </div>
      </footer>

      <section className="sr-only" aria-label="Yeter La işleyiş metni">
        <h2>YETER LA - Gençlik Hareketi Doktrini ve İşleyiş İlkeleri</h2>
        <p>
          Yeter La; kurumsal olmayan, merkeziyetsiz ve bağımsız bir gençlik hareketidir.
          Geleneksel yapıların hantal, pasif ve çekingen tutumlarına tepki olarak
          doğmuştur. Türkiye'deki gençliğin sistematik yıkıma karşı ortak bir refleksle
          birleşmesini amaçlayan amatör ama kararlı bir organizasyondur.
        </p>
        <p>
          Yapı, teorik tartışmalara boğulmak yerine acil eylem odağını korur. Doktrinin
          temel mantığı inisiyatif odaklı olmasıdır. Gençler; uzmanlık alanlarına,
          ilgi alanlarına veya yaşadıkları bölgelere göre merkezi bir yapıdan bağımsız
          yerel hücreler, gruplar ya da topluluklar kurabilir. Kurulan bu yapılar
          Yeter La şemsiyesi altında dirsek teması halinde kalır.
        </p>
        <p>
          Böylece hiyerarşik bir emir-komuta zincirine ihtiyaç duyulmadan, toplumsal
          olaylara karşı çok sayıda farklı grubun eş zamanlı ve koordineli hareket
          etmesi sağlanır. Stratejik avantajlar arasında süreklilik ve direnç,
          demokratik ve özgür ortam ile yüksek mobilizasyon kabiliyeti bulunur.
        </p>
        <p>
          YeterLa işleyiş ilkeleri; yatay hiyerarşi ve organik liyakat, tam inisiyatif
          ve özerklik, yerel istişare ve toplantılar, yaygın temsil ve tanıtım
          başlıklarından oluşur. Hareket, ideolojik çeşitliliği zayıflık değil,
          merkeziyetsiz yapının geniş tabanlı bir gücü olarak görür.
        </p>
        <p>
          Manifesto yaşayan ve değiştirilebilir bir metindir. İnsanlar manifesto
          alanında kendi görüşlerini yazabilir, değişiklik önerebilir ve ortak metnin
          gelişimine katkı sunabilir.
        </p>
      </section>

      <AnimatePresence>
        {isWorkflowModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050507]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-white/5 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-zinc-800/10 blur-[180px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative flex h-full flex-col"
            >
              <div className="sticky top-0 z-10 border-b border-zinc-900 bg-black/90 backdrop-blur-md">
                <div className="bg-zinc-900 px-4 py-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500 md:px-8">
                  YETER LA İŞLEYİŞ DOSYASI // TAM EKRAN GÖRÜNÜM
                </div>
                <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4 px-4 py-5 md:px-8 md:py-7">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500 md:text-xs">
                      Doktrin ve İşleyiş İlkeleri
                    </span>
                    <h3 className={`${bebasNeue.className} text-4xl leading-none tracking-wide text-white uppercase md:text-6xl`}>
                      YETERLA
                    </h3>
                    <p className={`${spaceGrotesk.className} max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base`}>
                      Merkeziyetsiz hareket mantığını, işleyiş ilkelerini ve stratejik çerçeveyi
                      aynı ekranda, sade ama güçlü bir akışla inceleyebilirsin.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsWorkflowModalOpen(false)}
                    className="shrink-0 border border-zinc-800 bg-zinc-950/80 p-3 text-zinc-400 transition-all hover:border-white hover:text-white cursor-pointer"
                    aria-label="İşleyiş modalını kapat"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                  <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                    <article className="border border-zinc-900 bg-black/70 p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.02)]">
                      <span className="inline-block bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-black">
                        YETER LA
                      </span>
                      <h4 className={`${bebasNeue.className} mt-4 text-3xl leading-none tracking-wide text-white uppercase md:text-5xl`}>
                        Gençlik Hareketi Doktrini ve İşleyiş İlkeleri
                      </h4>
                      <div className={`${spaceGrotesk.className} mt-6 space-y-5 text-sm leading-7 text-zinc-300 md:text-base`}>
                        <p>
                      <span className="font-semibold text-white">Yeter La</span>;{" "}
                      <span className="text-white font-semibold">Merkeziyetsiz Hareket Doktrini</span>{" "}
                      temel alınarak yapılandırılmış, kurumsal olmayan, merkeziyetsiz ve bağımsız
                      bir gençlik hareketidir. Geleneksel yapıların hantal, pasif ve çekingen
                      tutumlarına tepki olarak doğmuştur.
                    </p>
                    <p>
                      Türkiye'deki gençliğin, ülkenin her alanda karşı karşıya kaldığı sistematik
                      yıkıma karşı <span className="font-semibold text-white">ortak bir refleksle birleşmesini</span>{" "}
                      amaçlayan amatör ama kararlı bir organizasyondur. Ülkenin tarihi, toplumsal
                      yapısı, dünyadaki gelişmeler ve ideolojiler hakkında derin bir fikre sahip
                      olmasına rağmen teorik tartışmalara boğulmak yerine{" "}
                      <span className="bg-white px-1.5 py-0.5 text-black font-bold">acil eylem</span>{" "}
                      odağını korur.
                    </p>
                      </div>
                    </article>

                    <aside className="space-y-6">
                      <div className="border border-zinc-900 bg-zinc-950/90 p-6">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-[#FF003C]">
                          Doktrin nedir?
                        </span>
                        <p className={`${spaceGrotesk.className} mt-4 text-sm leading-7 text-zinc-300 md:text-base`}>
                          Bu doktrin, gençlerin yalnızca sosyal medyada paylaşım yapmakla ya da
                          oturdukları yerden öfke duymakla kalmayıp,{" "}
                          <span className="font-semibold text-white">somut ve organize eylemler</span>{" "}
                          düzenlemelerini sağlamak amacıyla geliştirilmiştir.
                        </p>
                      </div>

                      <div className="border border-[#FF003C]/35 bg-[#FF003C]/10 p-6">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-white">
                          Tatlı not
                        </span>
                        <p className={`${spaceGrotesk.className} mt-4 text-sm leading-7 text-zinc-100 md:text-base`}>
                          Manifestomuz sabit değil,{" "}
                          <span className="font-semibold">yaşayan ve değiştirilebilir</span> bir metin.
                          Manifesto alanında kendi görüşünü yazabilir, öneri bırakabilir ve ortak metne
                          katkı sunabilirsin.
                        </p>
                      </div>
                    </aside>
                  </section>

                  <section className="border border-zinc-900 bg-zinc-950/70 p-6 md:p-8">
                    <div className="flex flex-col gap-3 border-b border-dashed border-zinc-800 pb-5 md:flex-row md:items-end md:justify-between">
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-zinc-500">
                          Temel mantık
                        </span>
                        <h4 className={`${bebasNeue.className} mt-2 text-3xl text-white uppercase tracking-wide md:text-4xl`}>
                          İnisiyatif odaklı yapı
                        </h4>
                      </div>
                    </div>
                    <div className={`${spaceGrotesk.className} mt-5 space-y-5 text-sm leading-7 text-zinc-300 md:text-base`}>
                      <p>
                        Doktrinin temel mantığı{" "}
                        <span className="font-semibold text-white">inisiyatif odaklı olmasıdır.</span>{" "}
                        Gençler; kendi uzmanlık alanlarına, ilgi alanlarına veya yaşadıkları bölgelere
                        göre merkezi bir yapıdan bağımsız yerel hücreler, gruplar ya da topluluklar
                        kurmalıdır.
                      </p>
                      <p>
                        Kurulan bu özgün yapılar,{" "}
                        <span className="text-white font-semibold">Yeter La</span>{" "}
                        şemsiyesi altında dirsek teması halinde kalır. Böylece hiyerarşik bir emir-komuta
                        zincirine ihtiyaç duyulmadan, toplumsal olaylara karşı çok sayıda farklı grubun{" "}
                        <span className="font-semibold text-white">eş zamanlı ve koordineli</span> hareket
                        etmesi sağlanır.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-zinc-500">
                        Stratejik avantajlar
                      </span>
                      <h4 className={`${bebasNeue.className} mt-2 text-3xl text-white uppercase tracking-wide md:text-4xl`}>
                        Doktrinin sağladığı güç
                      </h4>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      {WORKFLOW_ADVANTAGES.map((item) => (
                        <article
                          key={item.title}
                          className="border border-zinc-900 bg-black/65 p-5 transition-colors hover:border-white/20"
                        >
                          <h5 className={`${bebasNeue.className} text-2xl uppercase tracking-wide text-white`}>
                            {item.title}
                          </h5>
                          <p className={`${spaceGrotesk.className} mt-3 text-sm leading-7 text-zinc-300`}>
                            {item.body}{" "}
                            <span className="font-semibold text-white">{item.emphasis}</span>
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-zinc-500">
                        İşleyiş ilkeleri
                      </span>
                      <h4 className={`${bebasNeue.className} mt-2 text-3xl text-white uppercase tracking-wide md:text-4xl`}>
                        YeterLa nasıl çalışır?
                      </h4>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      {WORKFLOW_PRINCIPLES.map((item) => (
                        <article
                          key={item.title}
                          className="border border-zinc-900 bg-zinc-950/80 p-5"
                        >
                          <h5 className={`${bebasNeue.className} text-2xl uppercase tracking-wide text-white`}>
                            {item.title}
                          </h5>
                          <p className={`${spaceGrotesk.className} mt-3 text-sm leading-7 text-zinc-300 md:text-base`}>
                            {item.body}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="border border-white/15 bg-white/5 p-6 md:p-8">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-zinc-500">
                      Önemli uyarı
                    </span>
                    <h4 className={`${bebasNeue.className} mt-3 text-3xl text-white uppercase tracking-wide md:text-4xl`}>
                      İdeolojik çeşitlilik ve stratejik birlik
                    </h4>
                    <div className={`${spaceGrotesk.className} mt-5 space-y-5 text-sm leading-7 text-zinc-300 md:text-base`}>
                      <p>
                        Türkiye sosyolojisi; sağcı, solcu, Türkçü ve muhafazakar gibi farklı ideolojik
                        kitlelerden oluşur. Tüm bu kesimlerin tek bir ideolojik kimlik altında kusursuzca
                        birleşmesi her zaman kolay değildir.
                      </p>
                      <p>
                        Bu nedenle herkes, kendi dünya görüşü ve fikri altyapısıyla kendi özgün örgütlerini
                        ve gruplarını kurabilir.{" "}
                        <span className="font-semibold text-white">
                          Esas olan, bağımsız grupların ortak refleks noktalarında birleşebilmesi
                        </span>{" "}
                        için iletişim ağlarını Telegram veya Signal kanalları üzerinden koordine etmesidir.
                      </p>
                      <p>
                        Böylece ideolojik ayrışmalar bir zayıflık değil; merkeziyetsiz yapının ürettiği{" "}
                        <span className="text-white font-semibold">geniş tabanlı bir cephe</span> ve
                        başarılı bir örgütlenme modeli haline gelir.
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SecretAdminModal
        isOpen={showSecretAdmin}
        onClose={() => setShowSecretAdmin(false)}
      />

      {/* Manifesto Sheet Drawer overlay (Desktop Only) */}
      <ManifestoSheet isOpen={isManifestoSheetOpen} onClose={() => setIsManifestoSheetOpen(false)}>
        <ManifestoView />
      </ManifestoSheet>
    </main>
  );
}
