import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

type TelegramUser = {
  id: number;
  first_name?: string;
  username?: string;
};

type TelegramMessage = {
  message_id: number;
  from?: TelegramUser;
  chat: { id: number };
  text?: string;
};

type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
};

async function sendTelegramReply(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(request: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret) {
    const headerSecret = request.headers.get("x-telegram-bot-api-secret-token");
    if (headerSecret !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let update: TelegramUpdate;
  try {
    update = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const message = update.message;
  if (!message?.from || !message.text) {
    return NextResponse.json({ ok: true });
  }

  const trimmedText = message.text.trim();

  // /start veya /bilgilendirme komutu kontrolü
  if (
    trimmedText.startsWith("/start") ||
    trimmedText.startsWith("/bilgilendirme") ||
    trimmedText.startsWith("/yardim") ||
    trimmedText.startsWith("/help")
  ) {
    await sendTelegramReply(
      message.chat.id,
      "📢 YETER LA - BİLGİLENDİRME SİSTEMİ\n\n" +
      "Bu bot, yerel gençlik hücrelerindeki aktif katılımcı sayısını doğrulamak ve koordinasyon sağlamak amacıyla kurulmuştur.\n\n" +
      "⚙️ Komutlar ve Kullanım:\n" +
      "• /kayit <kod_adi> : Belirttiğiniz takma ad (kod adı) ile kayıt olursunuz veya isminizi güncellersiniz.\n" +
      "• /buradayim : Yoklama verirsiniz (aktif olduğunuzu bildirmek için).\n" +
      "• /bilgilendirme : Bot hakkındaki bu bilgilendirme mesajını görüntülersiniz.\n\n" +
      "🔒 Gizlilik & Güvenlik:\n" +
      "• Telefon numaranız veya gerçek adınız kesinlikle veritabanına kaydedilmez.\n" +
      "• Kayıtlar tamamen şifreli veritabanında tutulur ve üçüncü taraflarla paylaşılmaz.\n" +
      "• İstediğiniz an kaydınızı sildirmek için inisiyatif kanallarından bize ulaşabilirsiniz."
    );
    return NextResponse.json({ ok: true });
  }

  // Komut kontrolü (yoklama, kayit, buradayim)
  let argument: string | undefined = undefined;
  let isCommandFound = false;

  const matchYoklama = trimmedText.match(/^\/yoklama(?:@\w+)?(?:\s+(.+))?$/i);
  const matchKayit = trimmedText.match(/^\/kayit(?:@\w+)?(?:\s+(.+))?$/i);
  const matchBuradayim = trimmedText.match(/^\/buradayim(?:@\w+)?(?:\s+(.+))?$/i);

  if (matchYoklama) {
    isCommandFound = true;
    argument = matchYoklama[1]?.trim();
  } else if (matchKayit) {
    isCommandFound = true;
    argument = matchKayit[1]?.trim();
  } else if (matchBuradayim) {
    isCommandFound = true;
    argument = matchBuradayim[1]?.trim();
  }

  if (!isCommandFound) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const telegramId = message.from.id;

  // Kullanıcı zaten kayıtlı mı kontrol et
  const { data: existingUser, error: fetchError } = await supabase
    .from("yoklama")
    .select("kod_adi")
    .eq("telegram_id", telegramId)
    .maybeSingle();

  if (fetchError) {
    console.error("Failed to fetch existing yoklama user:", fetchError.message);
    await sendTelegramReply(
      message.chat.id,
      "Sistem hatası. Lütfen daha sonra tekrar deneyin."
    );
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  let finalKodAdi = "";
  let isNewRegistration = false;

  if (existingUser) {
    if (argument) {
      // Zaten kayıtlıysa ve yeni bir isim yazdıysa ismini güncelle
      finalKodAdi = argument.slice(0, 64);
    } else {
      // İsim yazmadıysa mevcut kayıtlı ismini koru
      finalKodAdi = existingUser.kod_adi;
    }
  } else {
    // Yeni kayıt
    isNewRegistration = true;
    if (argument) {
      finalKodAdi = argument.slice(0, 64);
    } else {
      // Eğer argüman yoksa gerçek kullanıcı adı veya ad-soyadını kullan
      if (message.from.username) {
        finalKodAdi = message.from.username;
      } else if (message.from.first_name) {
        finalKodAdi = message.from.first_name;
      } else {
        await sendTelegramReply(
          message.chat.id,
          "Kayıt bulunamadı. Kayıt olmak için lütfen bir kod adı belirtin.\nÖrnek: `/kayit Ahmet` veya `/kayit kod-adiniz`"
        );
        return NextResponse.json({ ok: true });
      }
    }
  }

  const { error: upsertError } = await supabase.from("yoklama").upsert(
    {
      telegram_id: telegramId,
      kod_adi: finalKodAdi,
      son_yoklama: new Date().toISOString(),
    },
    { onConflict: "telegram_id" }
  );

  if (upsertError) {
    console.error("Yoklama upsert failed:", upsertError.message);
    await sendTelegramReply(
      message.chat.id,
      "Yoklama kaydedilemedi. Lütfen daha sonra tekrar dene."
    );
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  if (isNewRegistration) {
    await sendTelegramReply(
      message.chat.id,
      `Yoklama kaydınız "${finalKodAdi}" ismiyle başarıyla oluşturuldu. ` +
      `Bundan sonra sadece "/buradayim" yazarak yoklama verebilirsiniz!`
    );
  } else {
    await sendTelegramReply(
      message.chat.id,
      `Yoklama alındı, ${finalKodAdi}. Son güncelleme: ${new Date().toLocaleString("tr-TR")}`
    );
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ status: "telegram webhook active" });
}
