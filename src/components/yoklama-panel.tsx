"use client";

import { useCallback, useEffect, useState } from "react";
import { Activity, Database, Loader2, RefreshCw } from "lucide-react";
import { YoklamaTable } from "@/components/yoklama-table";
import { getYoklamaStatus, type YoklamaRecord } from "@/lib/yoklama";
import { supabase } from "@/lib/supabase";

const DAY_MS = 24 * 60 * 60 * 1000;

export default function YoklamaPanel() {
  const [records, setRecords] = useState<YoklamaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMock, setIsUsingMock] = useState(false);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (supabase && typeof supabase.from === "function") {
        const { data, error: fetchError } = await supabase
          .from("yoklama")
          .select("telegram_id, kod_adi, son_yoklama")
          .order("son_yoklama", { ascending: false });

        if (data && !fetchError) {
          setRecords(data as YoklamaRecord[]);
          setIsUsingMock(false);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Yoklama fetch failed:", err);
    }

    setRecords([]);
    setIsUsingMock(true);
    setError("Supabase bağlantısı yok veya yoklama tablosu henüz oluşturulmadı.");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const activeCount = records.filter((r) => {
    const diff = Date.now() - new Date(r.son_yoklama).getTime();
    return diff < DAY_MS;
  }).length;

  const warningCount = records.filter((r) => {
    const { status } = getYoklamaStatus(new Date(r.son_yoklama));
    return status === "warning";
  }).length;

  const inactiveCount = records.filter((r) => {
    const { status } = getYoklamaStatus(new Date(r.son_yoklama));
    return status === "inactive";
  }).length;

  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-dashed border-zinc-800 pb-6 gap-4">
        <div>
          <h2 className="font-mono text-3xl font-black uppercase text-white tracking-wider flex items-center gap-2">
            <Activity className="w-7 h-7 text-emerald-500" strokeWidth={2} />
            YOKLAMA
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wide mt-1 flex items-center gap-1.5">
            {isUsingMock ? (
              <span className="text-[#FF003C] font-bold flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> VERİTABANI BAĞLANTISI YOK
              </span>
            ) : (
              <span className="text-emerald-500 font-bold flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> CANLI YOKLAMA VERİSİ
              </span>
            )}
            // Telegram bot yoklamalarını izle
          </p>
        </div>

        <button
          onClick={fetchRecords}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-white transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Yenile
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Toplam" value={records.length} />
        <StatCard label="Aktif (24s)" value={activeCount} accent="emerald" />
        <StatCard label="Uyarı (1-3g)" value={warningCount} accent="amber" />
        <StatCard label="Pasif (3g+)" value={inactiveCount} accent="red" />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
          <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase animate-pulse">
            YOKLAMALAR YÜKLENİYOR...
          </span>
        </div>
      ) : error ? (
        <div className="border-4 border-dashed border-zinc-800 p-8 text-center space-y-3">
          <p className="font-mono text-sm text-red-400 uppercase">{error}</p>
          <p className="text-xs text-zinc-600 font-mono">
            Supabase SQL editöründe yoklama tablosunu oluştur, ardından bot webhook&apos;unu ayarla.
          </p>
        </div>
      ) : (
        <YoklamaTable records={records} />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "emerald" | "amber" | "red";
}) {
  const accentClass =
    accent === "emerald"
      ? "text-emerald-400"
      : accent === "amber"
        ? "text-amber-400"
        : accent === "red"
          ? "text-red-400/80"
          : "text-white";

  return (
    <div className="border-2 border-zinc-800 bg-zinc-950/80 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{label}</p>
      <p className={`font-mono text-2xl font-black mt-1 ${accentClass}`}>{value}</p>
    </div>
  );
}
