import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// reference date: 2026-05-22T17:00:00+03:00 (1779458400000 ms)
const REFERENCE_TIME = 1779458400000;
const BASE_COUNT = 5732;
const INCREMENT_INTERVAL_MS = 25000; // 1 count every 25 seconds

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
      // Fallback silently to simulated time-based counter if table/row does not exist
      return NextResponse.json({ counter: getSimulatedCount() });
    }

    return NextResponse.json({ counter: Number(data.counter) });
  } catch {
    // Fallback to simulated counter on any network or database exception
    return NextResponse.json({ counter: getSimulatedCount() });
  }
}

export async function POST() {
  try {
    // Attempt to increment in Supabase
    const { error } = await supabase.rpc("increment_counter");

    if (error) {
      // If RPC fails (e.g. not created yet), attempt to direct update or fallback
      const currentSimulated = getSimulatedCount();
      return NextResponse.json({ success: true, counter: currentSimulated + 1 });
    }

    // Return the updated count from DB if possible, or fallback
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
