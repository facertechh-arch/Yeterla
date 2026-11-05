type ArticleSummaryProps = {
  eyebrow?: string;
  title?: string;
  points: string[];
  /** Gövde metni için font sınıfı (örn. Space Grotesk) */
  fontClassName?: string;
};

/**
 * Uzun okuma sayfalarının girişine yerleştirilen "özet" paneli.
 * Okuyucuya yazının tamamını okumadan ne kazanacağını gösterir;
 * arama motorları ve yapay zeka botları için de net bir özet metni sağlar.
 */
export default function ArticleSummary({
  eyebrow = "60 saniyede özet",
  title = "Bu dosyada ne var?",
  points,
  fontClassName = "",
}: ArticleSummaryProps) {
  return (
    <aside className="relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-surface p-6 md:p-8">
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#FF003C] to-transparent" />

      <div className="mb-5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF003C]" />
        <span className="font-mono text-[10px] font-bold tracking-[0.28em] text-[#FF003C] uppercase">
          {eyebrow}
        </span>
      </div>

      <p className={`${fontClassName} mb-6 text-lg font-bold text-ink-strong`}>{title}</p>

      <ul className="space-y-4">
        {points.map((point, i) => (
          <li key={i} className="flex gap-4">
            <span className="pt-0.5 font-mono text-xs font-bold text-[#FF003C]/80">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`${fontClassName} text-[15px] leading-relaxed text-ink`}>{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
