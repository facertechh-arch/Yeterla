import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Şifre girilmesi zorunludur!" },
        { status: 400 }
      );
    }

    let isMatch = false;
    let didCallSupabase = false;

    // 1. First, try highly secure Supabase RPC verify function (zero-leak)
    try {
      if (supabase && typeof supabase.rpc === "function") {
        const { data, error } = await supabase.rpc("verify_admin_password", {
          p_password: password,
        });

        if (error) {
          console.warn("Supabase RPC verification failed/not found, trying direct table select:", error.message);
        } else if (typeof data === "boolean") {
          isMatch = data;
          didCallSupabase = true;
        }
      }
    } catch (err) {
      console.warn("Supabase RPC error, fallback to direct query:", err);
    }

    // 2. Direct table select fallback (if RPC is not installed or service role bypass is available)
    if (!didCallSupabase) {
      try {
        if (supabase && typeof supabase.from === "function") {
          const { data, error } = await supabase
            .from("admin_settings")
            .select("value")
            .eq("key", "admin_password")
            .maybeSingle();

          if (data && !error) {
            isMatch = password === data.value;
            didCallSupabase = true;
          }
        }
      } catch (err) {
        console.warn("Supabase direct table select error, running mock fallback:", err);
      }
    }

    // 3. Mock Fallback (if Supabase credentials are empty or failed)
    if (!didCallSupabase) {
      const SECURE_FALLBACK_PASSWORD = "YeterLa!SuperSecureAdminKey2026*#-0";
      isMatch = password === SECURE_FALLBACK_PASSWORD;
    }

    if (isMatch) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Sisteme erişim engellendi. Geçersiz şifre!" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("Verification endpoint error:", err);
    return NextResponse.json(
      { success: false, error: "Sunucu hatası oluştu!" },
      { status: 500 }
    );
  }
}
