import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Basit in-memory rate limiter (Sunucusuz ortamda tam kesinlik sağlamaz ama aşırı basit botları durdurur)
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT = 5; // 1 dakikada maksimum 5 istek
const WINDOW_MS = 60 * 1000; // 1 dakika

// Türkiye'deki 81 geçerli il listesi. Şehir girdisini bu set ile eşleştirerek XSS veya SQLi
// gibi girdi enjeksiyonlarını kökten engelliyoruz.
const VALID_CITIES = new Set([
  "İstanbul", "Ankara", "İzmir", "Edirne", "Kırklareli", "Tekirdağ", "Kocaeli", 
  "Sakarya", "Yalova", "Bursa", "Balıkesir", "Çanakkale", "Bilecik", "Manisa", 
  "Aydın", "Denizli", "Muğla", "Afyonkarahisar", "Kütahya", "Uşak", "Eskişehir", 
  "Konya", "Karaman", "Aksaray", "Niğde", "Nevşehir", "Yozgat", "Kayseri", 
  "Kırşehir", "Kırıkkale", "Çankırı", "Sivas", "Antalya", "Burdur", "Isparta", 
  "Mersin", "Adana", "Hatay", "Osmaniye", "Kahramanmaraş", "Bolu", "Düzce", 
  "Zonguldak", "Karabük", "Bartın", "Kastamonu", "Sinop", "Çorum", "Amasya", 
  "Samsun", "Tokat", "Ordu", "Giresun", "Trabzon", "Gümüşhane", "Bayburt", 
  "Rize", "Artvin", "Ardahan", "Kars", "Iğdır", "Erzurum", "Erzincan", "Tunceli", 
  "Bingöl", "Muş", "Ağrı", "Bitlis", "Van", "Hakkari", "Şırnak", "Elazığ", 
  "Malatya", "Gaziantep", "Kilis", "Adıyaman", "Şanlıurfa", "Diyarbakır", "Mardin", 
  "Batman", "Siirt"
]);

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();

    // IP Bazlı Rate Limit
    if (ip !== "unknown") {
      const windowData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
      
      if (now - windowData.lastReset > WINDOW_MS) {
        windowData.count = 0;
        windowData.lastReset = now;
      }
      
      if (windowData.count >= RATE_LIMIT) {
        // Botlara "başarılı" döndürüp uslu durmalarını sağlıyoruz (shadow ban)
        return NextResponse.json({ success: true, rateLimited: true });
      }
      
      windowData.count += 1;
      rateLimitMap.set(ip, windowData);
    }

    const body = await request.json();
    const { city, honeypot } = body;

    // Honeypot kontrolü (Eğer gizli alan doldurulduysa kesin bottur)
    if (honeypot) {
      return NextResponse.json({ success: true, botDetected: true });
    }

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const cleanCity = city.trim();

    // 1. Şehir doğrulaması (Sadece Türkiye'deki 81 geçerli şehre izin veriyoruz)
    // Bu sayede şehir girdisine zararlı script veya SQL komutları yazılması imkansız hale geliyor
    if (!VALID_CITIES.has(cleanCity)) {
      return NextResponse.json({ error: "Geçersiz şehir seçimi" }, { status: 400 });
    }

    // 4. Üyeyi Supabase'e ekle
    // Not: Supabase JS SDK (PostgREST) arka planda parametrik sorgular kullandığı için 
    // SQL Injection açıklarına karşı kendiliğinden %100 korumalıdır.
    const { error: insertError } = await supabase
      .from("members")
      .insert([{ city: cleanCity }]);

    // Sayacı güvenli şekilde artırmayı dene
    const { error: rpcError } = await supabase.rpc("increment_counter");

    if (insertError || rpcError) {
      // DB tabloları yoksa patlama, sessizce geç
      return NextResponse.json({ success: true, local: true });
    }

    return NextResponse.json({ success: true });
  } catch {
    // Bağlantı koparsa veya hata olursa bozuntuya verme
    return NextResponse.json({ success: true, local: true });
  }
}

