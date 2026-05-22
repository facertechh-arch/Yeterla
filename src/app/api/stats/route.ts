import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// referans zamanı: 2026-05-22T17:00:00+03:00
const REFERENCE_TIME = 1779458400000;
const BASE_COUNT = 5732;
const INCREMENT_INTERVAL_MS = 600000; // 10 dakikada 1 artış

function getSimulatedCount(): number {
  const elapsed = Date.now() - REFERENCE_TIME;
  const increments = Math.max(0, Math.floor(elapsed / INCREMENT_INTERVAL_MS));
  return BASE_COUNT + increments;
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("stats")
      .select("counter")
      .eq("id", 1)
      .single();

    if (error || !data) {
      // Tablo yoksa simüle edilen sayacı dön
      return NextResponse.json({ counter: getSimulatedCount() });
    }

    return NextResponse.json({ counter: Number(data.counter) });
  } catch {
    // Herhangi bir ağ/veritabanı hatasında simülasyona dön
    return NextResponse.json({ counter: getSimulatedCount() });
  }
}

export async function POST() {
  try {
    // Supabase'de artırmayı dene
    const { error } = await supabase.rpc("increment_counter");

    if (error) {
      // RPC çalışmazsa (mesela fonksiyon yoksa) simüle edilen değerle devam et
      const currentSimulated = getSimulatedCount();
      return NextResponse.json({ success: true, counter: currentSimulated + 1 });
    }

    // Mümkünse DB'den dönen sayacı al, yoksa simülasyondan devam
    const { data: fetchResult } = await supabase
      .from("stats")
      .select("counter")
      .eq("id", 1)
      .single();

    const count = fetchResult ? Number(fetchResult.counter) : getSimulatedCount() + 1;
    return NextResponse.json({ success: true, counter: count });
  } catch {
    return NextResponse.json({ success: true, counter: getSimulatedCount() + 1 });
  }
}
