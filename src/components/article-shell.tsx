"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import ArticleSummary from "@/components/article-summary";
import useReadingProgress from "@/hooks/use-reading-progress";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

/** Başlık fontu (Bebas Neue) sınıf adı — makale içi ara başlıklar için */
export const displayFontClass = bebasNeue.className;

/** Gövde fontu (Space Grotesk) sınıf adı */
export const sansFontClass = spaceGrotesk.className;

/** Gövde metni: yumuşak kontrast + rahat satır yüksekliği */
export const bodyText = `${spaceGrotesk.className} text-[17px] leading-[1.95] text-ink space-y-6`;

export type ShellSection = {
  /** Sayfa içi çapa kimliği */
  id: string;
  /** Yan menüde görünen kısa etiket */
  label: string;
};

type OriginTone = "human" | "ai";

export type ArticleShellProps = {
  fileNo: string;
  kicker: string;
  /** Büyük başlık: düz kısım + kırmızı vurgu kısmı */
  h1: { lead: string; accent: string };
  readingTime: string;
  category: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  /** İçeriğin kaynağını belirten ibare (örn. "Tamamen insan tarafından yazılmıştır") */
  origin: string;
  originTone?: OriginTone;
  summary: { eyebrow: string; title: string; points: string[] };
  sections: ShellSection[];
  backHref?: string;
  backLabel?: string;
  footerNote?: string;
  children: ReactNode;
};

/** Makale başındaki özet panelinin sayfa içi çapa kimliği */
const SUMMARY_ID = "ozet";

const ORIGIN_STYLES: Record<OriginTone, { wrap: string; dot: string }> = {
  human: {
    wrap: "border-emerald-900/60 bg-emerald-950/25 text-emerald-300/90",
    dot: "bg-emerald-400",
  },
  ai: {
    wrap: "border-amber-900/60 bg-amber-950/20 text-amber-300/90",
    dot: "bg-amber-400",
  },
};

/**
 * Uzun okuma sayfalarının ortak iskeleti.
 * Sabit üst başlık + okuma ilerleme çubuğu, masaüstü içindekiler,
 * mobil menü, özet paneli ve alt bilgiyi tek yerde toplar; böylece
 * tüm analiz dosyaları aynı düzeni kullanır.
 */
export default function ArticleShell({
  fileNo,
  kicker,
  h1,
  readingTime,
  category,
  lastUpdated,
  lastUpdatedLabel,
  origin,
  originTone = "human",
  summary,
  sections,
  backHref = "/gelecek",
  backLabel = "GELECEK ANALİZLERİ",
  footerNote = "© 2026 YETER LA // DOSYA ANALİZ SİSTEMİ",
  children,
}: ArticleShellProps) {
  const [activeId, setActiveId] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const progress = useReadingProgress();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-96px 0px -50% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    const summaryEl = document.getElementById(SUMMARY_ID);
    if (summaryEl) observer.observe(summaryEl);

    return () => observer.disconnect();
  }, [sections]);

  const originStyle = ORIGIN_STYLES[originTone];

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#060608] font-sans text-ink selection:bg-[#FF003C] selection:text-white">
      {/* Arka plan dokusu */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.06]" />

      {/* Üst başlık — mobilde de her zaman görünür kalır */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/90 backdrop-blur-xl">
        {/* Okuma ilerlemesi çubuğu */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-full bg-zinc-900/70"
          role="progressbar"
          aria-label="Okuma ilerlemesi"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-full bg-gradient-to-r from-[#FF003C] to-[#ff6b8f] shadow-[0_0_12px_rgba(255,0,60,0.6)] transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link
            href={backHref}
            className="flex items-center gap-2 font-mono text-[10px] font-bold text-ink-faint transition-colors hover:text-white md:text-xs"
          >
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" /> {backLabel}
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] font-bold tracking-widest text-ink-faint sm:inline">
              %{Math.round(progress)} OKUNDU
            </span>
            <span
              className={`${bebasNeue.className} hidden text-lg tracking-widest text-zinc-400 md:inline`}
            >
              {fileNo}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="article-mobile-menu"
              className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-zinc-300 transition-all hover:border-zinc-700 hover:text-white lg:hidden"
            >
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                {isMobileMenuOpen ? "Kapat" : "Sorular"}
              </span>
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:flex-row lg:py-12">
        {/* Sol kenar — masaüstü içindekiler */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-28 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-ink-faint uppercase">
                İçindekiler
              </span>
              <div className="h-px w-full bg-zinc-900" />
            </div>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => scrollToSection(SUMMARY_ID)}
                className={`flex items-start gap-3 border-l-2 px-4 py-3 text-left text-sm font-bold tracking-wide uppercase transition-all ${
                  activeId === SUMMARY_ID
                    ? "border-[#FF003C] bg-zinc-900/50 text-white"
                    : "border-transparent text-ink-faint hover:bg-zinc-900/30 hover:text-zinc-300"
                }`}
              >
                <span className="pt-0.5 font-mono text-[10px] text-[#FF003C]/70">◆</span>
                <span>Özet</span>
              </button>
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`flex items-start gap-3 border-l-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                    activeId === s.id
                      ? "border-[#FF003C] bg-zinc-900/50 text-white"
                      : "border-transparent text-ink-faint hover:bg-zinc-900/30 hover:text-zinc-300"
                  }`}
                >
                  <span className="pt-0.5 font-mono text-[10px] text-[#FF003C]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobil menü */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="article-mobile-menu"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed inset-0 z-40 overflow-y-auto bg-black px-6 pt-24 pb-12 lg:hidden"
            >
              <div className="space-y-6">
                <span className="block font-mono text-xs font-bold tracking-widest text-ink-faint uppercase">
                  Sorular
                </span>
                <nav className="flex flex-col gap-4">
                  <button
                    onClick={() => scrollToSection(SUMMARY_ID)}
                    className="flex items-center justify-between border-b border-zinc-900 py-4 text-left text-xl font-bold text-zinc-200"
                  >
                    ÖZET <ChevronRight className="h-5 w-5 shrink-0 text-[#FF003C]" />
                  </button>
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className="flex items-center justify-between border-b border-zinc-900 py-4 text-left text-xl font-bold text-zinc-200"
                    >
                      {s.label} <ChevronRight className="h-5 w-5 shrink-0 text-[#FF003C]" />
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Makale */}
        <article className="w-full max-w-3xl flex-1">
          <div className="space-y-16 rounded-2xl border border-zinc-900/80 bg-surface px-5 py-10 sm:px-8 md:px-12 md:py-14">
            {/* Başlık */}
            <header className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-ink-faint"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF003C]" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                  {kicker}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`${bebasNeue.className} text-5xl leading-tight font-black tracking-tight text-ink-strong uppercase md:text-7xl lg:text-8xl`}
              >
                {h1.lead} <span className="text-[#FF003C]">{h1.accent}</span>
              </motion.h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                <span>Okuma süresi: {readingTime}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-800" />
                <span>Kategori: {category}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-800" />
                <span>
                  Son güncelleme: <time dateTime={lastUpdated}>{lastUpdatedLabel}</time>
                </span>
              </div>

              {/* İçerik kaynağı ibaresi */}
              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase ${originStyle.wrap}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${originStyle.dot}`} />
                {origin}
              </span>

              <div id={SUMMARY_ID} className="scroll-mt-28">
                <ArticleSummary
                  eyebrow={summary.eyebrow}
                  title={summary.title}
                  points={summary.points}
                  fontClassName={spaceGrotesk.className}
                />
              </div>
            </header>

            {children}
          </div>
        </article>
      </div>

      {/* Alt bilgi */}
      <footer className="w-full border-t border-zinc-900 bg-black/50 px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <span
            className={`${spaceGrotesk.className} font-mono text-xs tracking-widest text-ink-faint uppercase`}
          >
            {footerNote}
          </span>
          <div className="flex gap-8">
            <Link
              href="/gelecek"
              className="text-sm font-bold tracking-widest text-ink-faint uppercase transition-colors hover:text-white"
            >
              DİĞER DOSYALAR
            </Link>
            <Link
              href="/"
              className="text-sm font-bold tracking-widest text-ink-faint uppercase transition-colors hover:text-white"
            >
              ANA SAYFA
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/**
 * Numaralı bölüm başlığı + gövde metni sarmalayıcısı.
 * Her analiz dosyası bölümlerini bununla render eder.
 */
export function ArticleSection({
  id,
  number,
  total,
  heading,
  children,
}: {
  id: string;
  number: number;
  total: number;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-8">
      <div className="space-y-4 border-b border-zinc-900 pb-6">
        <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
          Bölüm {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h2
          className={`${bebasNeue.className} text-3xl leading-tight tracking-wide text-ink-strong uppercase md:text-5xl`}
        >
          {heading}
        </h2>
      </div>
      <div className={bodyText}>{children}</div>
    </section>
  );
}
