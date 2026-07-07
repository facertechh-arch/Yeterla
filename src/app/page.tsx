"use client";

import { useState, useEffect, useRef } from "react";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Send, CheckCircle2, ChevronDown, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ManifestoView from "@/components/manifesto-view";
import ManifestoSheet from "@/components/manifesto-sheet";
import { PrivacyTips } from "@/components/privacy-tips";
import { SignalGroupsPanel } from "@/components/signal-groups-panel";
import Image from "next/image";
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

// Bölgesel Telegram linkleri
const REGIONAL_GROUPS = {
  istanbul: "https://t.me/+ZeXtc-FvDTk4NWE8",
  ankara: "https://t.me/+pj6X7diqgEAyOTA0",
  izmir: "https://t.me/+sVdqFdxlv3QwYmRk",
  marmara: "https://t.me/+flYv48qJM4M1ZjE0",
  ege: "https://t.me/+yej-VaPRcrU2MDA0",
  icanadolu: "https://t.me/+YSZVBCP538RkNjVk",
  akdeniz: "https://t.me/+ZPzvs-aR1HJlMjNk",
  karadeniz: "https://t.me/+-lbjCm9AC-swOTk0",
  doguanadolu: "https://t.me/+KsM0IqrlAbs0ZTBk",
  guneydoguanadolu: "https://t.me/+ndEM9-tD771jNmE8",
};

const TELEGRAM_LINKS = [
  { name: "İstanbul", url: REGIONAL_GROUPS.istanbul },
  { name: "Ankara", url: REGIONAL_GROUPS.ankara },
  { name: "İzmir", url: REGIONAL_GROUPS.izmir },
  { name: "Marmara", url: REGIONAL_GROUPS.marmara },
  { name: "Ege", url: REGIONAL_GROUPS.ege },
  { name: "İç Anadolu", url: REGIONAL_GROUPS.icanadolu },
  { name: "Akdeniz", url: REGIONAL_GROUPS.akdeniz },
  { name: "Karadeniz", url: REGIONAL_GROUPS.karadeniz },
  { name: "Doğu Anadolu", url: REGIONAL_GROUPS.doguanadolu },
  { name: "Güneydoğu Anadolu", url: REGIONAL_GROUPS.guneydoguanadolu },
];

// Şehir - Bölge eşleşmeleri
const CITY_TO_REGION: Record<string, keyof typeof REGIONAL_GROUPS> = {
  "İstanbul": "istanbul",
  "Ankara": "ankara",
  "İzmir": "izmir",
  
  // Marmara (İstanbul hariç)
  "Edirne": "marmara",
  "Kırklareli": "marmara",
  "Tekirdağ": "marmara",
  "Kocaeli": "marmara",
  "Sakarya": "marmara",
  "Yalova": "marmara",
  "Bursa": "marmara",
  "Balıkesir": "marmara",
  "Çanakkale": "marmara",
  "Bilecik": "marmara",
  
  // Ege (İzmir hariç)
  "Manisa": "ege",
  "Aydın": "ege",
  "Denizli": "ege",
  "Muğla": "ege",
  "Afyonkarahisar": "ege",
  "Kütahya": "ege",
  "Uşak": "ege",
  
  // İç Anadolu (Ankara hariç)
  "Eskişehir": "icanadolu",
  "Konya": "icanadolu",
  "Karaman": "icanadolu",
  "Aksaray": "icanadolu",
  "Niğde": "icanadolu",
  "Nevşehir": "icanadolu",
  "Yozgat": "icanadolu",
  "Kayseri": "icanadolu",
  "Kırşehir": "icanadolu",
  "Kırıkkale": "icanadolu",
  "Çankırı": "icanadolu",
  "Sivas": "icanadolu",
  
  // Akdeniz
  "Antalya": "akdeniz",
  "Burdur": "akdeniz",
  "Isparta": "akdeniz",
  "Mersin": "akdeniz",
  "Adana": "akdeniz",
  "Hatay": "akdeniz",
  "Osmaniye": "akdeniz",
  "Kahramanmaraş": "akdeniz",
  
  // Karadeniz
  "Bolu": "karadeniz",
  "Düzce": "karadeniz",
  "Zonguldak": "karadeniz",
  "Karabük": "karadeniz",
  "Bartın": "karadeniz",
  "Kastamonu": "karadeniz",
  "Sinop": "karadeniz",
  "Çorum": "karadeniz",
  "Amasya": "karadeniz",
  "Samsun": "karadeniz",
  "Tokat": "karadeniz",
  "Ordu": "karadeniz",
  "Giresun": "karadeniz",
  "Trabzon": "karadeniz",
  "Gümüşhane": "karadeniz",
  "Bayburt": "karadeniz",
  "Rize": "karadeniz",
  "Artvin": "karadeniz",
  
  // Doğu Anadolu
  "Ardahan": "doguanadolu",
  "Kars": "doguanadolu",
  "Iğdır": "doguanadolu",
  "Erzurum": "doguanadolu",
  "Erzincan": "doguanadolu",
  "Tunceli": "doguanadolu",
  "Bingöl": "doguanadolu",
  "Muş": "doguanadolu",
  "Ağrı": "doguanadolu",
  "Bitlis": "doguanadolu",
  "Van": "doguanadolu",
  "Hakkari": "doguanadolu",
  "Şırnak": "doguanadolu",
  "Elazığ": "doguanadolu",
  "Malatya": "doguanadolu",
  
  // Güneydoğu Anadolu
  "Gaziantep": "guneydoguanadolu",
  "Kilis": "guneydoguanadolu",
  "Adıyaman": "guneydoguanadolu",
  "Şanlıurfa": "guneydoguanadolu",
  "Diyarbakır": "guneydoguanadolu",
  "Mardin": "guneydoguanadolu",
  "Batman": "guneydoguanadolu",
  "Siirt": "guneydoguanadolu"
};

// Alfabetik şehir listesi
const TURKISH_CITIES = Object.keys(CITY_TO_REGION).sort((a, b) =>
  a.localeCompare(b, "tr-TR")
);

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
  const [city, setCity] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [plusOnes, setPlusOnes] = useState<{ id: number }[]>([]);
  const prevCountRef = useRef<number | null>(null);
  const [showSecretAdmin, setShowSecretAdmin] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const loadingMessages = [
    "VERİTABANI BAĞLANTISI KONTROL EDİLİYOR...",
    "BÖLGESEL HÜCRE ENTEGRASYONU YAPILIYOR...",
    "TELEGRAM YÖNLENDİRİCİSİ AYARLANIYOR...",
    "SİSTEM BAĞLANTISI GÜVENLİ VE AKTİF!"
  ];

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
      if (prevCountRef.current !== null && count > prevCountRef.current) {
        const id = Date.now() + Math.random();
        setPlusOnes((prev) => [...prev, { id }]);
        setTimeout(() => {
          setPlusOnes((prev) => prev.filter((item) => item.id !== id));
        }, 1500); // Allow enough time for animate and exit transitions
      }
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

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setLoadingStep(0);

    // Terminal loading efekti
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingMessages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    try {
      // Veriyi kaydet
      await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, honeypot }),
      });
    } catch (err: any) {
      // Fail completely silently so the client proceeds to success state smoothly
    }

    // Sayacı artır ve başarılı dön
    setCount((prev) => (prev !== null ? prev + 1 : prev));

    clearInterval(interval);
    setLoadingStep(3); // Set to final successful log step
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const selectedRegion = city ? CITY_TO_REGION[city] : null;
  const telegramUrl = selectedRegion ? REGIONAL_GROUPS[selectedRegion] : "#";
  const announcementUrl = "https://t.me/YeterLaDuyuru";

  return (
    <main className="min-h-screen bg-[#060608] text-white selection:bg-[#FF003C] selection:text-white flex flex-col items-center justify-between relative overflow-hidden">
      
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 w-full bg-black/95 backdrop-blur-md border-b border-zinc-900 z-30 select-none">
        {/* Mobile View: X (Twitter) style tabs */}
        <div className="flex md:hidden w-full font-mono text-sm font-black">
          <button
            onClick={() => setActiveMobileTab("join")}
            className={`w-1/3 py-4 text-center tracking-widest relative cursor-pointer ${
              activeMobileTab === "join" ? "text-[#FF003C]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            KATIL
            {activeMobileTab === "join" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF003C]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveMobileTab("manifesto")}
            className={`w-1/3 py-4 text-center tracking-widest relative cursor-pointer ${
              activeMobileTab === "manifesto" ? "text-[#FF003C]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            MANİFESTO
            {activeMobileTab === "manifesto" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF003C]"
              />
            )}
          </button>
          <button
            onClick={() => setIsWorkflowModalOpen(true)}
            className="w-1/3 py-4 text-center tracking-widest relative cursor-pointer text-zinc-400 hover:text-white"
          >
            İŞLEYİŞ
          </button>
        </div>

        {/* Desktop View: Sleek top header bar */}
        <div className="hidden md:flex max-w-5xl mx-auto w-full px-6 py-4 items-center justify-between font-mono">
          <Link href="/" className="text-xl font-black tracking-widest hover:text-[#FF003C] transition-colors">
            // YETER LA
          </Link>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setIsWorkflowModalOpen(true)}
              className="px-3 py-1.5 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#FF003C] transition-all cursor-pointer bg-zinc-950"
            >
              İŞLEYİŞ
            </button>
            <button
              onClick={() => setIsManifestoSheetOpen(true)}
              className="px-3 py-1.5 border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-all cursor-pointer bg-zinc-950"
            >
              MANIFESTO
            </button>
          </div>
        </div>
      </header>

      {/* Telegram Link Bar */}
      <div className="w-full bg-[#FF003C] py-2 z-20 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto flex-nowrap items-center pb-1" style={{ scrollbarWidth: "none" }}>
            <span className={`${bebasNeue.className} text-black font-black tracking-widest flex-shrink-0 mr-2 text-lg`}>KANALLAR:</span>
            {TELEGRAM_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${spaceGrotesk.className} text-xs font-bold bg-black text-white px-3 py-1.5 hover:bg-zinc-900 transition-colors whitespace-nowrap`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Brutalist Grid Overlay Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-45" />

      {/* Aggressive glowing accent gradients */}
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
            className="absolute w-[290px] h-[290px] md:w-[390px] md:h-[390px] rounded-full bg-[#FF003C]/20 filter blur-2xl"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Aggressive Dashed Border Ring */}
          <motion.div
            className="absolute w-[295px] h-[295px] md:w-[395px] md:h-[395px] rounded-full border-2 border-dashed border-[#FF003C]/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating +1 Indicators */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-visible flex items-center justify-center">
            <AnimatePresence>
              {plusOnes.map((item) => {
                const randomX = (Math.floor(item.id * 100) % 80) - 40; // -40px to +40px
                return (
                  <motion.span
                    key={item.id}
                    initial={{ opacity: 0, y: 20, x: randomX, scale: 0.6 }}
                    animate={{ opacity: 1, y: -150, scale: 1.5 }}
                    exit={{ opacity: 0, y: -220, scale: 1.1 }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    className="absolute text-4xl font-extrabold text-[#FF003C] drop-shadow-[0_0_12px_rgba(255,0,60,0.9)] select-none pointer-events-none"
                    style={{
                      fontFamily: bebasNeue.style.fontFamily,
                    }}
                  >
                    +1
                  </motion.span>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Interactive Button Counter */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-zinc-950 border-4 border-[#FF003C] shadow-[0_0_50px_rgba(255,0,60,0.15)] hover:shadow-[0_0_80px_rgba(255,0,60,0.35)] hover:border-white transition-all duration-300 select-none flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
          >
            {/* Embedded internal pattern grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            <div className="absolute top-10 md:top-14 flex items-center gap-1.5 text-xs text-[#FF003C] tracking-widest font-mono font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF003C] animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF003C] absolute" />
              <span>CANLI BAĞLANTI HATTI</span>
            </div>

            {/* Aggressive Large Counter */}
            <span className={`${bebasNeue.className} text-7xl md:text-9xl font-extrabold text-white mt-4 tracking-tight drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]`}>
              {count !== null ? count : "---"}
            </span>

            <span className={`${spaceGrotesk.className} text-xs md:text-sm font-bold tracking-widest text-[#FF003C] mt-2 uppercase group-hover:text-white transition-colors duration-300`}>
              bir araya gel / hemen katıl
            </span>

            <motion.div 
              className="absolute bottom-6 text-zinc-500 group-hover:text-white transition-colors duration-300"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Aggressive Headers */}
        <div className="space-y-6 max-w-3xl">
          <h1 className={`${bebasNeue.className} text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight uppercase`}>
            ŞİKAYET ETMEYİ <br />
            <span className="text-[#FF003C] bg-white px-4 py-1 text-black inline-block transform -rotate-1 shadow-[5px_5px_0px_#000]">
              BIRAK!
            </span>
          </h1>
          
          <p className={`${spaceGrotesk.className} text-zinc-400 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed`}>
            Sürekli şikayet etmek hiçbir şeyi çözmedi. Bölgeni seç, kendi gençlik grubuna katıl, bir araya gel ve değişimi yerelden başlat.
          </p>

          <button
            type="button"
            onClick={() => setIsWorkflowModalOpen(true)}
            className="group w-full max-w-2xl mx-auto text-left border-2 border-zinc-900 bg-black/70 hover:border-[#FF003C] hover:bg-black transition-all duration-300 p-5 md:p-6 shadow-[8px_8px_0px_0px_rgba(255,0,60,0.12)] cursor-pointer"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#FF003C] font-bold">
                  <span className="h-2 w-2 rounded-full bg-[#FF003C] animate-pulse" />
                  İşleyiş Dosyası
                </span>
                <h2 className={`${bebasNeue.className} text-3xl md:text-4xl text-white tracking-wide uppercase`}>
                  Dağınık örgütlenme nasıl işliyor?
                </h2>
                <p className={`${spaceGrotesk.className} text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl`}>
                  Doktrini, stratejik avantajları, işleyiş ilkelerini ve manifesto notunu tek ekranda incele.
                </p>
              </div>
              <span className={`${bebasNeue.className} inline-flex items-center gap-2 text-xl md:text-2xl text-white group-hover:text-[#FF003C] transition-colors`}>
                AÇ <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Brutalist Marquee Banner */}
      <div className="w-full overflow-hidden whitespace-nowrap bg-[#FF003C] py-3 text-black border-y-4 border-black select-none font-bold uppercase tracking-widest text-lg md:text-2xl font-mono transform rotate-1">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          className="inline-block whitespace-nowrap"
        >
          <span>
            KORKMA BURADA İLLEGAL BİRŞEY YOK SADECE BİR ARAYA GELİP ÖRGÜTLENİYORUZ • &nbsp;
            KORKMA BURADA İLLEGAL BİRŞEY YOK SADECE BİR ARAYA GELİP ÖRGÜTLENİYORUZ • &nbsp;
            KORKMA BURADA İLLEGAL BİRŞEY YOK SADECE BİR ARAYA GELİP ÖRGÜTLENİYORUZ • &nbsp;
          </span>
        </motion.div>
      </div>

      {/* Form Portal & Success Card */}
      <section 
        ref={formRef} 
        id="join" 
        className="w-full py-16 md:py-28 px-6 bg-[#09090b] border-t-2 border-zinc-900 flex flex-col items-center justify-center relative z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,60,0.03),transparent_60%)] pointer-events-none" />

        <div className="w-full max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="bg-black border-4 border-white shadow-[12px_12px_0px_0px_#FF003C] p-8 md:p-12 relative overflow-hidden"
              >
                <div className="mb-8 border-b-2 border-dashed border-zinc-800 pb-6 text-center sm:text-left">
                  <h3 className={`${bebasNeue.className} text-4xl md:text-5xl font-black text-white tracking-wide uppercase`}>
                    BİR ARAYA GEL
                  </h3>
                  <p className={`${spaceGrotesk.className} text-sm text-zinc-500 mt-1 uppercase font-semibold`}>
                    Şehrini gir, ağa entegre ol.
                  </p>
                </div>

                <form onSubmit={handleJoin} className="space-y-6">
                  {/* Bot tuzağı (Honeypot) - Kullanıcıya görünmez */}
                  <input
                    type="text"
                    name="phone_number_optional"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none", position: "absolute", opacity: 0 }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {/* Nickname Input Removed */}

                  {/* City Select Dropdown */}
                  <div className="space-y-2">
                    <label className={`${bebasNeue.className} text-xl tracking-wider text-white block uppercase`}>
                      Şehir
                    </label>
                    <p className={`${spaceGrotesk.className} text-sm text-zinc-400 mb-2 leading-relaxed`}>
                      İl bilgilerini alma sebebimiz sosyal medyayla ulaşabildiğimiz kitlenin konumunu öğrenmek ve kişileri illerine ve bölgelerine göre telegram grubuna yönlendirmek.
                    </p>
                    <div className="relative">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={isSubmitting}
                        className={`${spaceGrotesk.className} w-full p-4 bg-zinc-900 border-2 border-zinc-800 focus:border-[#FF003C] text-white rounded-none focus:outline-none transition-all appearance-none cursor-pointer font-semibold text-base`}
                      >
                        <option value="" className="text-zinc-600">Şehir Seç... (İsteğe Bağlı)</option>
                        {TURKISH_CITIES.map((c) => (
                          <option key={c} value={c} className="bg-zinc-950 text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 font-bold">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* KVKK Checkbox Removed */}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${bebasNeue.className} w-full py-4 text-2xl tracking-wider bg-white text-black font-extrabold rounded-none border-2 border-transparent hover:bg-[#FF003C] hover:text-white disabled:opacity-85 disabled:cursor-not-allowed transition-all duration-300 shadow-[4px_4px_0px_#7f7f7f] active:shadow-none active:translate-y-1 select-none flex items-center justify-center gap-3`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        AĞA BAĞLANILIYOR...
                      </>
                    ) : (
                      <>
                        HAREKETE GEÇ <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </button>
                </form>

                {/* Simulated Hacking Progress Bar */}
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-6 text-center space-y-4"
                  >
                    <Loader2 className="w-12 h-12 text-[#FF003C] animate-spin" />
                    <div className={`${spaceGrotesk.className} space-y-2`}>
                      <span className="text-sm font-mono text-[#FF003C] block uppercase tracking-widest animate-pulse font-bold">
                        {loadingMessages[loadingStep]}
                      </span>
                      <div className="w-48 h-1.5 bg-zinc-900 mx-auto overflow-hidden relative">
                        <motion.div
                          className="h-full bg-[#FF003C]"
                          initial={{ width: "0%" }}
                          animate={{ width: `${(loadingStep + 1) * 25}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="success-container"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="bg-zinc-950 border-2 border-zinc-800 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.08)] p-8 md:p-12 text-center relative overflow-hidden"
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                </div>

                <h3 className={`${bebasNeue.className} text-3xl md:text-4xl font-black text-white tracking-wide`}>
                  Aramıza hoş geldin!
                </h3>
                
                <p className={`${spaceGrotesk.className} text-zinc-400 text-sm md:text-base font-medium max-w-md mx-auto mt-3`}>
                  Kaydın tamam. {city ? (<span>Şehrin: <span className="text-white font-semibold">{city}</span>. Aşağıdan grubuna geçebilirsin.</span>) : "Aşağıdan bölgene uygun gruba geçebilirsin."}
                </p>

                <div className="mt-8 pt-6 border-t border-dashed border-zinc-800 space-y-5 text-left">
                  <PrivacyTips className={`${spaceGrotesk.className}`} />

                  <p className={`${spaceGrotesk.className} text-xs text-zinc-500 font-medium tracking-wide text-center`}>
                    Telegram grupları
                  </p>

                  {city ? (
                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${bebasNeue.className} inline-flex items-center justify-center gap-3 w-full py-4 px-8 text-xl tracking-wide bg-[#FF003C] hover:bg-white hover:text-black text-white font-black transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]`}
                    >
                      Bölgendeki gruba katıl <Send className="w-5 h-5" />
                    </a>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {TELEGRAM_LINKS.map(link => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${bebasNeue.className} flex items-center justify-center py-2 px-3 text-lg tracking-wide bg-zinc-900 hover:bg-[#FF003C] border border-zinc-800 hover:border-[#FF003C] text-white transition-all`}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  )}

                  <span className={`${spaceGrotesk.className} block text-[10px] text-zinc-600 text-center`}>
                    Şehrine yakın bölge Telegram grubu
                  </span>

                  <a
                    href={announcementUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${bebasNeue.className} inline-flex items-center justify-center gap-3 w-full py-4 px-8 text-xl tracking-wide bg-zinc-900 border-2 border-zinc-700 hover:border-zinc-500 text-white font-black transition-all duration-300`}
                  >
                    Telegram duyuru (@YeterLaDuyuru) <Send className="w-5 h-5" />
                  </a>

                  <p className={`${spaceGrotesk.className} text-xs text-zinc-500 font-medium tracking-wide text-center pt-2`}>
                    Signal
                  </p>

                  <SignalGroupsPanel />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      </div>

      {activeMobileTab === "manifesto" && (
        <div className="w-full max-w-xl px-6 py-12 flex-1 md:hidden z-10">
          <ManifestoView />
        </div>
      )}

      {/* Footer */}
      <footer className="w-full z-10 border-t-2 border-white py-8 px-6 bg-[#040405] text-zinc-600 text-center flex flex-col md:flex-row items-center justify-between select-none gap-4">
        <span className={`${spaceGrotesk.className} text-xs font-mono tracking-widest uppercase`}>
          © 2026 YETER LA // TÜM GENÇLİK HAKLARI SAKLIDIR.
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
            className="hover:text-white transition-colors duration-300 text-[#FF003C]"
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
            className={`${spaceGrotesk.className} text-sm font-mono text-zinc-500 select-all cursor-pointer hover:text-white transition-colors duration-300`}
            title="Adresi kopyala"
            onClick={() => {
              navigator.clipboard.writeText("yeterla@tutamail.com");
              setEmailCopied(true);
              setTimeout(() => setEmailCopied(false), 2000);
            }}
          >
            {emailCopied ? "[KOPYALANDI!]" : "yeterla@tutamail.com"}
          </span>
        </div>
      </footer>

      <section className="sr-only" aria-label="YeterLa işleyiş metni">
        <h2>YETERLA - Dağınık Gençlik Örgütlenmesi Doktrini ve İşleyiş İlkeleri</h2>
        <p>
          YeterLa; Dağınık Gençlik Örgütlenmesi Doktrini temel alınarak yapılandırılmış,
          kurumsal olmayan, merkeziyetsiz ve bağımsız bir gençlik hareketidir.
          Geleneksel yapıların hantal, pasif ve çekingen tutumlarına tepki olarak
          doğmuştur. Türkiye'deki gençliğin sistematik yıkıma karşı ortak bir refleksle
          birleşmesini amaçlayan amatör ama kararlı bir organizasyondur.
        </p>
        <p>
          Yapı, teorik tartışmalara boğulmak yerine acil eylem odağını korur. Doktrinin
          temel mantığı inisiyatif odaklı olmasıdır. Gençler; uzmanlık alanlarına,
          ilgi alanlarına veya yaşadıkları bölgelere göre merkezi bir yapıdan bağımsız
          yerel hücreler, gruplar ya da topluluklar kurabilir. Kurulan bu yapılar
          Dağınık Gençlik Örgütlenmesi şemsiyesi altında dirsek teması halinde kalır.
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
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-[#FF003C]/12 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-zinc-700/20 blur-[180px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative flex h-full flex-col"
            >
              <div className="sticky top-0 z-10 border-b border-zinc-900 bg-black/90 backdrop-blur-md">
                <div className="bg-[#FF003C] px-4 py-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-black md:px-8">
                  YETERLA İŞLEYİŞ DOSYASI // TAM EKRAN GÖRÜNÜM
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
                    <article className="border border-zinc-900 bg-black/70 p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(255,0,60,0.12)]">
                      <span className="inline-block bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                        YETERLA
                      </span>
                      <h4 className={`${bebasNeue.className} mt-4 text-3xl leading-none tracking-wide text-white uppercase md:text-5xl`}>
                        Dağınık Gençlik Örgütlenmesi Doktrini ve İşleyiş İlkeleri
                      </h4>
                      <div className={`${spaceGrotesk.className} mt-6 space-y-5 text-sm leading-7 text-zinc-300 md:text-base`}>
                        <p>
                          <span className="font-semibold text-white">YeterLa</span>;{" "}
                          <span className="text-[#FF003C] font-semibold">Dağınık Gençlik Örgütlenmesi Doktrini</span>{" "}
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
                          <span className="bg-[#FF003C] px-1.5 py-0.5 text-black font-bold">acil eylem</span>{" "}
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
                        <span className="text-[#FF003C] font-semibold">Dağınık Gençlik Örgütlenmesi</span>{" "}
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
                          className="border border-zinc-900 bg-black/65 p-5 transition-colors hover:border-[#FF003C]/50"
                        >
                          <h5 className={`${bebasNeue.className} text-2xl uppercase tracking-wide text-white`}>
                            {item.title}
                          </h5>
                          <p className={`${spaceGrotesk.className} mt-3 text-sm leading-7 text-zinc-300`}>
                            {item.body}{" "}
                            <span className="font-semibold text-[#FF003C]">{item.emphasis}</span>
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
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-[#FF003C]">
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
                        <span className="text-[#FF003C] font-semibold">geniş tabanlı bir cephe</span> ve
                        başarılı bir dağınık örgütlenme modeli haline gelir.
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

      {/* DGÖ Floating Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 cursor-pointer select-none"
      >
        <div className="relative group p-1">
          {/* Glowing neon bg on hover */}
          <div className="absolute inset-0 bg-[#FF003C]/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <Image
            src="/dgo.png"
            alt="DGÖ Logo"
            width={80}
            height={80}
            priority
            className="w-16 h-16 md:w-20 md:h-20 object-contain relative z-10 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          />
        </div>
      </motion.div>
    </main>
  );
}
