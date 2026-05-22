# Yeter La - Gençlik İnisiyatifi

Bu repo, "Yeter La" inisiyatifinin web tarafındaki kayıt ve yönlendirme platformunu barındırır. Basit, net ve hızlı olması için kurguladık. Örgütlenmek isteyenlerin hızlıca şehir seçip kendi bölgelerindeki gruplara dahil olmasını sağlıyor.

Projeyi açık kaynak yapma amacımız gayet basit: Saklayacak hiçbir şeyimiz yok, her şey şeffaf ve ortada. Kodlar nasıl çalışıyor, arka planda ne var, isteyen açıp bakabilir.

## Teknoloji Stack

- **Framework**: Next.js (App Router kullanıyoruz)
- **Stil**: Tailwind CSS (biraz agresif ve brutalist tasarım)
- **Animasyonlar**: Framer Motion
- **Database/Backend**: Supabase (Kayıt olan üyeleri ve sayacı tutuyoruz)

## Lokal Kurulum

Projeyi kendi bilgisayarında çalıştırıp incelemek istersen şu adımları izleyebilirsin:

1. **Repoyu klonla ve paketleri kur:**
   ```bash
   git clone <repo-url>
   cd yeter-la
   npm install
   # veya pnpm install
   ```

2. **Çevre (Env) Değişkenleri:**
   Proje dizininde bir `.env.local` dosyası oluşturman lazım. İçine şu değişkenleri eklemelisin:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=senin_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=senin_anon_key
   ```
   Eğer elinde bir Supabase projesi yoksa sorun değil; sistem bu değişkenleri bulamadığında otomatik olarak "mock" bir client ile çalışır, hata vermez. UI tarafını rahatça test edebilirsin.

3. **Geliştirme Ortamını Başlat:**
   ```bash
   npm run dev
   ```
   Ve `http://localhost:3000` adresinden sayfaya girebilirsin.

## Katkıda Bulunmak İstersen

Platformu iyileştirecek her türlü PR'a kapımız açık. Mimarileri baştan yazmaya, kodları fazla kasmaya gerek yok; çalışan, sade ve anlaşılır çözümler yeterli.

Bir hata bulursan (bug vs.) çekinmeden Issue açabilirsin.

## Güvenlik Notu

`.env` gibi dosyalar zaten gitignore içinde ekli, hiçbir zaman kendi API key'lerinle commit atma lütfen. Ayrıca Supabase tarafını canlıya alırken RLS (Row Level Security) ayarlarını düzgün yapılandırdığına emin ol ki dışarıdan izinsiz müdahalelere açık kalmasın.
