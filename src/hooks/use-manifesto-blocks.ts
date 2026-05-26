"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type ManifestoBlock = {
  id: string;
  order_index: number;
  content: string;
};

const STORAGE_KEY = "mock_manifesto_blocks";

const DEFAULT_BLOCKS: ManifestoBlock[] = [
  {
    id: "block-1",
    order_index: 0,
    content:
      "BİZİ KURTARACAK BİR ANA MUHALEFET YOK. Siyasetin köhne yüzleri gençliğin çığlığını duymamakta direniyor, koltuklarını ve kendi konforlu statükolarını koruma derdindeler. Değişim yukarıdan gelmeyecek.",
  },
  {
    id: "block-2",
    order_index: 1,
    content:
      "İKTİDARIN BİZİ SÜRÜKLEDİĞİ O KARANLIK, SESSİZ DİKTATÖRLÜGE GİRMEMİZE ÇOK AZ KALDI. Her geçen gün sansürleniyor, haklarımızdan ve özgürlüklerimizden taviz vermeye zorlanıyoruz. Sessiz kalmak suça ortak olmaktır.",
  },
  {
    id: "block-3",
    order_index: 2,
    content:
      "EĞER BUGÜN KENDİ MERKEZİDİSİ (DECENTRALIZED) DİJİTAL VE FİZİKSEL AĞLARIMIZI KURMAZSAK, 100 YILLIK CUMHURİYETİN ÇÖKÜŞÜNÜ İZLEYEN KORKAK VE ACİZ BİR NESİL OLACAĞIZ. Kendi geleceğimizi kimsenin lütfuna bırakamayız.",
  },
  {
    id: "block-4",
    order_index: 3,
    content:
      "ŞİKAYET ETMEYİ BIRAK, BİR ARAYA GEL. Harekete geçmek ve değişimi yerelden, kendi mahallemizden, kendi okulumuzdan başlatmak için bir araya geliyoruz. Bu platform, geleceğimizi ortak akılla yeniden yazma aracıdır.",
  },
];

function supabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function readLocalBlocks(): ManifestoBlock[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ManifestoBlock[];
  } catch {
    // bozuk json vs. — varsayılana dön
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BLOCKS));
  return DEFAULT_BLOCKS;
}

export function useManifestoBlocks() {
  const [blocks, setBlocks] = useState<ManifestoBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const refresh = useCallback(async () => {
    if (supabaseConfigured()) {
      const { data, error } = await supabase
        .from("manifesto_blocks")
        .select("*")
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        setBlocks(data);
        setLoading(false);
        return;
      }
    }

    setBlocks(readLocalBlocks());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();

    const onStorage = () => {
      if (!supabaseConfigured()) {
        setBlocks(readLocalBlocks());
      }
    };
    window.addEventListener("storage", onStorage);

    if (!supabaseConfigured()) {
      return () => window.removeEventListener("storage", onStorage);
    }

    // Her mount kendi kanalını açar; aynı isim iki bileşende çakışmasın diye uuid
    const channel = supabase
      .channel(`manifesto-blocks-${crypto.randomUUID()}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "manifesto_blocks" },
        () => {
          refresh();
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      window.removeEventListener("storage", onStorage);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [refresh]);

  return { blocks, loading, refresh };
}
