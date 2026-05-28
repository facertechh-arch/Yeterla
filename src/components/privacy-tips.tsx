type PrivacyTipsProps = {
  className?: string;
  variant?: "default" | "compact";
};

export function PrivacyTips({
  className = "",
  variant = "default",
}: PrivacyTipsProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`text-left rounded-lg border border-zinc-700/80 bg-zinc-900/50 p-4 md:p-5 ${className}`}
      role="note"
    >
      <p
        className={`font-semibold text-zinc-200 mb-2 ${isCompact ? "text-sm text-center" : "text-base"}`}
      >
        Gizliliğin için kısa bir hatırlatma
      </p>
      <p className="text-sm text-zinc-400 leading-relaxed mb-3">
        Gruplarda rahat etmek için Telegram ayarlarından numaranı gizleyebilir ve
        görünen adını takma adınla eşleştirebilirsin.
      </p>
      <ol className="text-sm text-zinc-300 space-y-1.5 list-decimal list-inside marker:text-zinc-500">
        <li>Telegram → Ayarlar → Gizlilik ve Güvenlik</li>
        <li>Telefon numarası: &quot;Hiç kimse&quot;</li>
        <li>İsim alanında takma adını kullan</li>
      </ol>
      <p className="text-xs text-zinc-500 mt-3 pt-3 border-t border-zinc-800">
        Bunlar zorunluluk değil; sadece seni daha güvende hissettirmek için.
      </p>
    </div>
  );
}
