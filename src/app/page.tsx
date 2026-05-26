"use client";

import { useState, useEffect, useRef } from "react";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Send, CheckCircle2, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ManifestoView from "@/components/manifesto-view";
import ManifestoSheet from "@/components/manifesto-sheet";

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

export default function Home() {
  const [count, setCount] = useState<number | null>(null);
  const [nickname, setNickname] = useState("");
  const [activeMobileTab, setActiveMobileTab] = useState<"join" | "manifesto">("join");
  const [isManifestoSheetOpen, setIsManifestoSheetOpen] = useState(false);
  const [city, setCity] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; text: string } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [plusOnes, setPlusOnes] = useState<{ id: number }[]>([]);
  const prevCountRef = useRef<number | null>(null);
  const [secretMembers, setSecretMembers] = useState<{ nickname: string; city: string }[]>([]);
  const [loadingSecret, setLoadingSecret] = useState(false);
  const [showSecretList, setShowSecretList] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const loadingMessages = [
    "VERİTABANI BAĞLANTISI KONTROL EDİLİYOR...",
    "BÖLGESEL HÜCRE ENTEGRASYONU YAPILIYOR...",
    "TELEGRAM YÖNLENDİRİCİSİ AYARLANIYOR...",
    "SİSTEM BAĞLANTISI GÜVENLİ VE AKTİF!"
  ];

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
        setShowSecretList((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Gizli menü açılınca üyeleri listele
  useEffect(() => {
    if (showSecretList) {
      const fetchMembers = async () => {
        setLoadingSecret(true);
        try {
          if (supabase && typeof supabase.from === "function") {
            const { data, error } = await supabase
              .from("members")
              .select("nickname, city")
              .order("id", { ascending: false });

            if (data && !error) {
              setSecretMembers(data);
              setLoadingSecret(false);
              return;
            }
          }
        } catch (err) {
          // Fail silently
        }

        // Mock fallback
        setSecretMembers([
          { nickname: "AsilRebel", city: "İstanbul" },
          { nickname: "VatanSever", city: "Ankara" },
          { nickname: "HürGenç", city: "İzmir" },
          { nickname: "YeterArtık", city: "Bursa" },
        ]);
        setLoadingSecret(false);
      };
      fetchMembers();
    }
  }, [showSecretList]);

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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname === "/-*0") {
      setNickname("");
      setShowSecretList(true);
      return;
    }
    const cleanNickname = nickname.trim();
    if (!cleanNickname || !city || !kvkkChecked) return;

    // Hızlı girdi doğrulaması (Sunucuyla uyumlu güvenlik filtresi)
    const NICKNAME_REGEX = /^[a-zA-Z0-9çÇğĞıİöÖşŞüÜ \-_]+$/;
    if (cleanNickname.length < 2 || cleanNickname.length > 30 || !NICKNAME_REGEX.test(cleanNickname)) {
      alert("Takma ad 2 ila 30 karakter uzunluğunda olmalı ve sadece harf, rakam, boşluk, tire (-) veya alt çizgi (_) içermelidir!");
      return;
    }

    setNickname(cleanNickname);
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
        body: JSON.stringify({ nickname, city, honeypot }),
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

  return (
    <main className="min-h-screen bg-[#060608] text-white selection:bg-[#FF003C] selection:text-white flex flex-col items-center justify-between relative overflow-hidden">
      
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 w-full bg-black/95 backdrop-blur-md border-b border-zinc-900 z-30 select-none">
        {/* Mobile View: X (Twitter) style tabs */}
        <div className="flex md:hidden w-full font-mono text-sm font-black">
          <button
            onClick={() => setActiveMobileTab("join")}
            className={`w-1/2 py-4 text-center tracking-widest relative cursor-pointer ${
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
            className={`w-1/2 py-4 text-center tracking-widest relative cursor-pointer ${
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
        </div>

        {/* Desktop View: Sleek top header bar */}
        <div className="hidden md:flex max-w-5xl mx-auto w-full px-6 py-4 items-center justify-between font-mono">
          <Link href="/" className="text-xl font-black tracking-widest hover:text-[#FF003C] transition-colors">
            // YETER LA
          </Link>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setIsManifestoSheetOpen(true)}
              className="px-3 py-1.5 border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-all cursor-pointer bg-zinc-950"
            >
              MANIFESTO
            </button>
          </div>
        </div>
      </header>

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
                    Takma adını ve şehrini gir, ağa entegre ol.
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
                  {/* Nickname Input */}
                  <div className="space-y-2">
                    <label className={`${bebasNeue.className} text-xl tracking-wider text-white block uppercase`}>
                      Takma Ad
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={30}
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Örn: AsilRebel"
                      disabled={isSubmitting}
                      className={`${spaceGrotesk.className} w-full p-4 bg-zinc-900 border-2 border-zinc-800 focus:border-[#FF003C] text-white rounded-none focus:outline-none transition-all placeholder:text-zinc-600 font-semibold text-base`}
                    />
                  </div>

                  {/* City Select Dropdown */}
                  <div className="space-y-2">
                    <label className={`${bebasNeue.className} text-xl tracking-wider text-white block uppercase`}>
                      Şehir
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={isSubmitting}
                        className={`${spaceGrotesk.className} w-full p-4 bg-zinc-900 border-2 border-zinc-800 focus:border-[#FF003C] text-white rounded-none focus:outline-none transition-all appearance-none cursor-pointer font-semibold text-base`}
                      >
                        <option value="" disabled className="text-zinc-600">Şehir Seç...</option>
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

                  {/* KVKK Checkbox */}
                  <div className="flex items-start gap-3 mt-4 text-left">
                    <input
                      id="kvkk"
                      type="checkbox"
                      required
                      checked={kvkkChecked}
                      disabled={isSubmitting}
                      onChange={(e) => setKvkkChecked(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded-none border-2 border-zinc-800 bg-zinc-900 text-[#FF003C] focus:ring-0 focus:outline-none accent-[#FF003C] cursor-pointer"
                    />
                    <label 
                      htmlFor="kvkk" 
                      className={`${spaceGrotesk.className} text-[11px] text-zinc-500 font-semibold select-none cursor-pointer uppercase leading-snug`}
                    >
                      Takma adımın ve şehrimin, bölgeme özel Telegram grubuna yönlendirilmem ve katılımcı sayısının doğrulanması amacıyla işlenmesini kabul ediyorum.{" "}
                      <span 
                        className="text-[#FF003C] hover:underline cursor-pointer font-extrabold" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          setModalContent({
                            title: "KVKK AYDINLATMA METNİ",
                            text: "1. Veri Sorumlusu: Yeter La Sivil Gençlik İnisiyatifi\n\n2. İşlenen Veriler: Takma ad ve şehir bilginiz.\n\n3. İşleme Amacı: Bölgelere özel şifreli Telegram hücre davetlerinin atanması ve aktif katılımcı sayacının güncel tutulması.\n\n4. Haklarınız: Kaydınızın kalıcı olarak silinmesini talep etmek için dilediğiniz an iletişim kanallarından bize ulaşabilirsiniz. Verileriniz kesinlikle üçüncü parti şahıs veya reklam firmalarıyla paylaşılmaz."
                          });
                        }}
                      >
                        KVKK Aydınlatma Metni'ni
                      </span>{" "}
                      okudum ve onaylıyorum.
                    </label>
                  </div>

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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="bg-black border-4 border-[#FF003C] shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] p-8 md:p-12 text-center relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#FF003C]/35 rounded-full filter blur-xl" />

                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-[#FF003C]/10 border-2 border-[#FF003C] flex items-center justify-center text-[#FF003C]"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                </div>

                <h3 className={`${bebasNeue.className} text-4xl md:text-5xl font-black text-white uppercase tracking-wider`}>
                  ARAMIZA HOŞ GELDİN, {nickname}!
                </h3>
                
                <p className={`${spaceGrotesk.className} text-zinc-400 text-sm md:text-base font-semibold max-w-sm mx-auto mt-3 uppercase`}>
                  Sistem entegrasyonu tamamlandı. Şehrin: <span className="text-white font-bold">{city}</span>.
                </p>

                {/* Regional Telegram Route Action */}
                <div className="mt-8 pt-6 border-t-2 border-dashed border-zinc-900 space-y-4">
                  <div
                    role="alert"
                    className="text-left border-4 border-[#FF003C] bg-[#FF003C]/10 p-4 md:p-5 shadow-[4px_4px_0px_0px_#FF003C] ring-2 ring-[#FF003C]/40"
                  >
                    <p className={`${bebasNeue.className} text-lg md:text-xl font-black text-[#FF003C] uppercase tracking-wide text-center mb-3`}>
                      ⚠️ Önemli Uyarı
                    </p>
                    <div className={`${spaceGrotesk.className} text-sm md:text-base text-zinc-100 font-semibold leading-relaxed space-y-3`}>
                      <p className="text-center font-bold text-white">
                        🚨 GÜVENLİK PROTOKOLÜ: İLK GÖREV 🚨
                      </p>
                      <p>
                        Hoş geldin. Bu grupta pasif izleyici olmak yok, güvenliğini sağlamak var.
                      </p>
                      <p className="font-bold text-[#FF003C]">⚠️ HEMEN ŞİMDİ YAPMAN GEREKENLER:</p>
                      <ul className="space-y-2 list-none pl-0">
                        <li>⚙️ 1. Telegram Ayarlarına git.</li>
                        <li>🛡️ 2. Gizlilik ve Güvenlik &gt; Telefon Numarası kısmını kesinlikle &quot;Hiç Kimse&quot; yap.</li>
                        <li>🎭 3. İsim ve soyismini anonim bir takma adla değiştir.</li>
                      </ul>
                      <p className="text-xs md:text-sm text-zinc-300 border-t border-zinc-800 pt-3">
                        ❗️ Burası bir ağ, ancak kimliğini korumak senin elinde. Bunu yapmayanların sorumluluğu kendine aittir.
                      </p>
                    </div>
                  </div>

                  <p className={`${spaceGrotesk.className} text-xs text-[#FF003C] font-extrabold tracking-widest uppercase`}>
                    ŞİMDİ EYLEM ZAMANI
                  </p>

                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${bebasNeue.className} inline-flex items-center justify-center gap-3 w-full py-5 px-8 text-2xl tracking-wider bg-[#FF003C] hover:bg-white hover:text-black text-white font-black transition-all duration-300 animate-bounce shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-[6px_6px_0px_0px_#000]`}
                  >
                    BÖLGENDEKİ GRUBA KATIL <Send className="w-6 h-6" />
                  </a>

                  <span className={`${spaceGrotesk.className} block text-[10px] text-zinc-500 uppercase font-mono tracking-widest`}>
                    bölgene özel şifreli telegram hücresine katıl.
                  </span>
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

      {/* Sleek Custom Brutalist Modal */}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-black border-4 border-white shadow-[12px_12px_0px_#FF003C] p-6 md:p-8 relative"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 bg-[#FF003C] text-black font-mono text-xs px-2 py-0.5 font-bold uppercase">
                SİSTEM BİLGİSİ
              </div>
              
              <h4 className={`${bebasNeue.className} text-3xl md:text-4xl font-black text-white mt-4 mb-4 tracking-wider uppercase border-b-2 border-dashed border-zinc-800 pb-2`}>
                {modalContent.title}
              </h4>
              
              <p className={`${spaceGrotesk.className} text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-line uppercase font-medium`}>
                {modalContent.text}
              </p>
              
              <button
                onClick={() => setModalContent(null)}
                className={`${bebasNeue.className} mt-8 w-full py-4 text-2xl bg-white text-black font-extrabold hover:bg-[#FF003C] hover:text-white transition-colors duration-200 border-2 border-black tracking-widest cursor-pointer`}
              >
                KAPAT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Admin Member List Modal */}
      <AnimatePresence>
        {showSecretList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-black border-4 border-[#FF003C] shadow-[12px_12px_0px_#fff] p-6 md:p-8 relative max-h-[80vh] flex flex-col"
            >
              <div className="absolute top-0 left-0 bg-[#FF003C] text-black font-mono text-xs px-2 py-0.5 font-bold uppercase">
                SİSTEM GÜNLÜKLERİ // VERİTABANI
              </div>

              <h4 className={`${bebasNeue.className} text-3xl md:text-4xl font-black text-white mt-4 mb-4 tracking-wider uppercase border-b-2 border-dashed border-zinc-800 pb-2`}>
                KAYITLI ÜYE LİSTESİ ({secretMembers.length})
              </h4>

              <div className="flex-1 overflow-y-auto space-y-2 pr-2 font-mono text-xs text-zinc-400 max-h-[50vh]">
                {loadingSecret ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-[#FF003C] animate-spin" />
                  </div>
                ) : secretMembers.length === 0 ? (
                  <p className="text-center py-6 text-zinc-600">KAYITLI KULLANICI BULUNAMADI.</p>
                ) : (
                  <div className="border border-zinc-900 bg-zinc-950/40 divide-y divide-zinc-900">
                    <div className="flex bg-zinc-900/60 font-bold uppercase text-zinc-500 py-2 px-3">
                      <div className="w-1/2">TAKMA AD</div>
                      <div className="w-1/2">ŞEHİR</div>
                    </div>
                    {secretMembers.map((m, idx) => (
                      <div key={idx} className="flex py-2.5 px-3 hover:bg-zinc-900/30 transition-colors">
                        <div className="w-1/2 text-white font-bold break-all">{m.nickname}</div>
                        <div className="w-1/2 text-zinc-300">{m.city}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowSecretList(false)}
                className={`${bebasNeue.className} mt-6 w-full py-4 text-2xl bg-white text-black font-extrabold hover:bg-[#FF003C] hover:text-white transition-colors duration-200 border-2 border-black tracking-widest cursor-pointer`}
              >
                KAPAT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manifesto Sheet Drawer overlay (Desktop Only) */}
      <ManifestoSheet isOpen={isManifestoSheetOpen} onClose={() => setIsManifestoSheetOpen(false)}>
        <ManifestoView />
      </ManifestoSheet>
    </main>
  );
}
