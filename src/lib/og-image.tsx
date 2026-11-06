import { ImageResponse } from "next/og";

/**
 * Open Graph / Twitter kart görselleri için ortak üretici.
 *
 * Aynı brutalist kart tasarımını site geneli ve her analiz dosyası için
 * tekrar tekrar yazmak yerine tek bir fonksiyondan üretir. Böylece bir
 * bağlantı paylaşıldığında (sosyal medya, mesajlaşma uygulamaları veya
 * yapay zekâ sohbetleri) sayfaya özel, okunur bir önizleme çıkar.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgImageInput = {
  /** Sol üstteki küçük marka/etiket satırı */
  kicker: string;
  /** Sağ üstteki rozet metni */
  badge: string;
  /** Büyük başlığın beyaz satırı */
  titleLead: string;
  /** Büyük başlığın siyah zeminli vurgu satırı */
  titleAccent: string;
  /** Altta yer alan açıklama */
  description: string;
  /** Sağ alttaki adres */
  footer?: string;
};

export function createOgImage({
  kicker,
  badge,
  titleLead,
  titleAccent,
  description,
  footer = "yeterla.com",
}: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#060608",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Arka plan aksan halkası */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        />
        {/* Kırmızı vurgu */}
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -140,
            width: 420,
            height: 420,
            borderRadius: "50%",
            backgroundColor: "#FF003C",
            opacity: 0.16,
          }}
        />

        {/* Üst şerit */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: 5,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              border: "1px solid #27272a",
              color: "#a1a1aa",
              fontSize: 18,
              letterSpacing: 4,
            }}
          >
            {badge}
          </div>
        </div>

        {/* Büyük başlık */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1,
              color: "#ffffff",
              letterSpacing: -2,
            }}
          >
            {titleLead}
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#060608",
              backgroundColor: "#ffffff",
              padding: "0 24px",
              marginTop: 10,
            }}
          >
            {titleAccent}
          </div>
        </div>

        {/* Alt şerit */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: 760,
              fontSize: 24,
              lineHeight: 1.45,
              color: "#a1a1aa",
            }}
          >
            {description}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: "#FF003C",
              letterSpacing: 2,
            }}
          >
            {footer}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    }
  );
}
