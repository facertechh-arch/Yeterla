import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nickname, city } = body;

    if (!nickname || !city) {
      return NextResponse.json({ error: "Nickname and City are required" }, { status: 400 });
    }

    // 1. Attempt to insert member in Supabase
    const { error: insertError } = await supabase
      .from("members")
      .insert([{ nickname, city }]);

    // 2. Attempt to increment counter atomically
    const { error: rpcError } = await supabase.rpc("increment_counter");

    if (insertError || rpcError) {
      // Fallback silently if tables aren't set up yet
      return NextResponse.json({ success: true, local: true });
    }

    return NextResponse.json({ success: true });
  } catch {
    // Catch any connection error and fallback silently
    return NextResponse.json({ success: true, local: true });
  }
}
