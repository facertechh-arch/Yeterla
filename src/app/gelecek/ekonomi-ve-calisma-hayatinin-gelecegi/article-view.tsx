"use client";

import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArticleSummary from "@/components/article-summary";
import useReadingProgress from "@/hooks/use-reading-progress";
import { ARTICLE, SECTIONS, SUMMARY } from "@/lib/gelecek-article";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

/** Gövde metni: yumuşak kontrast + rahat satır yüksekliği */
const bodyText = `${spaceGrotesk.className} text-[17px] leading-[1.95] text-ink space-y-6`;

export default function ArticleView() {
  const [activeId, setActiveId] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const progress = useReadingProgress();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-96px 0px -50% 0px" }
    );

    SECTIONS.forEach((q) => {
      const el = document.getElementById(q.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#060608] font-sans text-ink selection:bg-[#FF003C] selection:text-white">
      {/* Arka plan dokusu */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.06]" />

      {/* Üst başlık — mobilde de her zaman görünür kalır */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/90 backdrop-blur-xl">
        {/* Okuma ilerlemesi çubuğu */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-full bg-zinc-900/70"
          role="progressbar"
          aria-label="Okuma ilerlemesi"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-full bg-gradient-to-r from-[#FF003C] to-[#ff6b8f] shadow-[0_0_12px_rgba(255,0,60,0.6)] transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link
            href="/gelecek"
            className="flex items-center gap-2 font-mono text-[10px] font-bold text-ink-faint transition-colors hover:text-white md:text-xs"
          >
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" /> GELECEK ANALİZLERİ
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] font-bold tracking-widest text-ink-faint sm:inline">
              %{Math.round(progress)} OKUNDU
            </span>
            <span
              className={`${bebasNeue.className} hidden text-lg tracking-widest text-zinc-400 md:inline`}
            >
              {ARTICLE.fileNo}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="article-mobile-menu"
              className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-zinc-300 transition-all hover:border-zinc-700 hover:text-white lg:hidden"
            >
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                {isMobileMenuOpen ? "Kapat" : "Sorular"}
              </span>
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:flex-row lg:py-12">
        {/* Sol kenar — masaüstü içindekiler */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-28 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-ink-faint uppercase">
                İçindekiler
              </span>
              <div className="h-px w-full bg-zinc-900" />
            </div>
            <nav className="flex flex-col gap-1">
              {SECTIONS.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => scrollToSection(q.id)}
                  className={`flex items-start gap-3 border-l-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                    activeId === q.id
                      ? "border-[#FF003C] bg-zinc-900/50 text-white"
                      : "border-transparent text-ink-faint hover:bg-zinc-900/30 hover:text-zinc-300"
                  }`}
                >
                  <span className="pt-0.5 font-mono text-[10px] text-[#FF003C]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{q.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobil menü */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="article-mobile-menu"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed inset-0 z-40 overflow-y-auto bg-black px-6 pt-24 pb-12 lg:hidden"
            >
              <div className="space-y-6">
                <span className="block font-mono text-xs font-bold tracking-widest text-ink-faint uppercase">
                  Sorular
                </span>
                <nav className="flex flex-col gap-4">
                  {SECTIONS.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => scrollToSection(q.id)}
                      className="flex items-center justify-between border-b border-zinc-900 py-4 text-left text-xl font-bold text-zinc-200"
                    >
                      {q.label} <ChevronRight className="h-5 w-5 shrink-0 text-[#FF003C]" />
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Makale */}
        <article className="w-full max-w-3xl flex-1">
          <div className="space-y-16 rounded-2xl border border-zinc-900/80 bg-surface px-5 py-10 sm:px-8 md:px-12 md:py-14">
            {/* Başlık */}
            <header className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-ink-faint"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF003C]" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                  {ARTICLE.kicker}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`${bebasNeue.className} text-5xl leading-tight font-black tracking-tight text-ink-strong uppercase md:text-7xl lg:text-8xl`}
              >
                YAPAY ZEKA VE <span className="text-[#FF003C]">İŞİN GELECEĞİ</span>
              </motion.h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                <span>Okuma süresi: {ARTICLE.readingTime}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-800" />
                <span>Kategori: {ARTICLE.category}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-800" />
                <span>
                  Son güncelleme: <time dateTime={ARTICLE.lastUpdated}>{ARTICLE.lastUpdatedLabel}</time>
                </span>
              </div>

              <ArticleSummary
                eyebrow={SUMMARY.eyebrow}
                title={SUMMARY.title}
                points={SUMMARY.points}
                fontClassName={spaceGrotesk.className}
              />
            </header>

            {/* Bölüm 1 */}
            <section id="q1" className="scroll-mt-28 space-y-8">
              <div className="space-y-4 border-b border-zinc-900 pb-6">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
                  Bölüm 01 / 06
                </span>
                <h2
                  className={`${bebasNeue.className} text-3xl leading-tight tracking-wide text-ink-strong uppercase md:text-5xl`}
                >
                  {SECTIONS[0].heading}
                </h2>
              </div>
              <div className={bodyText}>
                <p>
                  Yapay zeka ve otomasyonun ilerleyişini düz bir çizgi olarak görmek hata olur. Yapay
                  zeka ve otomasyonların ilerleyişi, bazen içine yeni bir kendisi büyüklüğünde
                  kartopu giren kartopu gibidir.
                </p>
                <p>
                  İlerledikçe hızlanır ama beklenmeyen bir anda çok hızlı büyüyebilir. İlk olarak bunu
                  bilmek lazım ve buna göre çıkarım yapmak lazımdır.
                </p>
                <p>
                  Aralık 2022&apos;de ChatGPT tüm dünyada popüler oldu ve o zamandan bu zamana
                  değişimi ve işimizi elimizden alma eğrisini (işsizliği sadece yapay zekaya bağlamak
                  çok doğru olmasa da ekonomik krizle birleşince resmen kriz oldu) incelediğimizde, bu
                  kartopu eğrisinin avuç kadar bir kütle iken nasıl bir bina büyüklüğüne geldiğini
                  gördük.
                </p>
                <p>
                  Biz önümüzdeki 5 yılı değil, 10-20 yılı düşünmek istiyoruz. O yüzden tarım ile
                  uğraşmak gibi mantıklı görünen düşünceler bile yanlıştır; çünkü bir raddede, 10 yıl
                  içinde yapay zeka tarafından ve hatta şimdi bile kolaylıkla yapılabilir.
                </p>

                <div className="my-8 space-y-4 border-l-4 border-[#FF003C] bg-black/40 p-6">
                  <h3 className="text-sm font-bold tracking-widest text-ink-strong uppercase">
                    Tahmin edilen meslek kolları
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-ink-faint">
                    <li>
                      Ofis işlerini unutun artık, eskisi gibi özellikle virüs zamanındaki gibi o
                      işler bize para kazandırmaz.
                    </li>
                    <li>
                      Yazılımın tamamen biteceği söylenebilir; sadece bu tür olayların mühendislik ve
                      derin düşünme, ihtiyaca uygun ürün yaratma kolunda insanlar olacaktır.
                    </li>
                    <li>
                      Birçok mühendislik bitecektir; mühendislerin onda sekiz-dokuzunun işsiz
                      kalacağını söylemek yanlış olmaz.
                    </li>
                    <li>
                      Doktorluk ve öğretmenlik gibi meslekler devam edecektir ama özel ders alma gibi
                      olayların yarı yarıya düşeceğini söyleyebiliriz.
                    </li>
                  </ul>
                </div>

                <p className="text-xl font-bold text-ink-strong">Robotlar vs. İnsan</p>
                <p>
                  Robot ve insan çalışan arasında belirgin bir fark olacak. Robot, büyük oranda işini
                  profesyonel yapan, katı, başarı oranı yüksek, üretim hızı yüksek, maliyetinin belli
                  bir ortalaması olan iken; insan, daha esnek ve ucuza kullanılabilecek bir işçiye
                  dönüşebilir.
                </p>
                <p>
                  Mesela arabanda ağır bir hasar olunca aracın fabrikanın robotlar tarafından
                  işletilen yetkili servisine gidersen işin tam ve profesyonel şekilde hallolur ama
                  maliyeti daha fazla olur. Bunun yanında, eğer mahalle aralarındaki küçük sanayiye
                  gidersen işi daha ucuza ve daha kolay, pratik yollu tamirlerle halledebilirsin.
                </p>
                <p>
                  Yani zanaat ve el işleri, ustalık işleri tamamen yok olmayıp bir tercih haline
                  gelebilir. Kim bilir, belki insanlar gelecekte satın alacakları ürünlerde &quot;İnsan
                  Emeğidir / El Yapımı&quot; ibaresi arayacak ve buna fazladan para ödeyecekler.
                </p>
              </div>
            </section>

            {/* Bölüm 2 */}
            <section id="q2" className="scroll-mt-28 space-y-8">
              <div className="space-y-4 border-b border-zinc-900 pb-6">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
                  Bölüm 02 / 06
                </span>
                <h2
                  className={`${bebasNeue.className} text-3xl leading-tight tracking-wide text-ink-strong uppercase md:text-5xl`}
                >
                  {SECTIONS[1].heading}
                </h2>
              </div>
              <div className={bodyText}>
                <p>
                  Basit iş gücü olarak sanayide, tarlada, fabrikada çalışabilirler. Zanaat yapıp belki
                  bundan para kazanabilirler. Gelecekte zanaat ve sanat gibi konuların, eğlence
                  kültürünün artmasını bekliyorum.
                </p>
                <p>
                  Eğer eğlence kültürü haddinden fazla artarsa, sosyal medyadan kaynaklı zehirlenmiş,
                  &quot;hayatsız&quot; diye tabir edilen depresif arkadaşlar çıkabilir. Bu evreyi tamamlayan
                  ve &quot;Yeter la!&quot; diyen insanlar her şeyden uzaklaşıp kendi hayatını yaşamaya
                  çalışabilir.
                </p>
                <blockquote className="border-l-2 border-[#FF003C]/60 bg-white/[0.03] py-4 pl-5 text-ink-strong italic">
                  &quot;Her şeyi boşverip yapay zeka şirketlerinin diktatörlüğünü kırmak adına kitlesel
                  örgütlenmelerle uğraşabilirler.&quot;
                </blockquote>
                <p>
                  Eğer evrensel temel gelir (maaş) verilmezse insanlara, olaylar çok daha kaotik bir
                  duruma gelebilir. Devletler sırf işsiz insan olmasın diye herkesi bir işe bağlamaya
                  çalışabilir. Askerlik oranları artabilir ve dünyadaki gerilimle savaşlar çıkabilir.
                </p>
              </div>
            </section>

            {/* Bölüm 3 */}
            <section id="q3" className="scroll-mt-28 space-y-8">
              <div className="space-y-4 border-b border-zinc-900 pb-6">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
                  Bölüm 03 / 06
                </span>
                <h2
                  className={`${bebasNeue.className} text-3xl leading-tight tracking-wide text-ink-strong uppercase md:text-5xl`}
                >
                  {SECTIONS[2].heading}
                </h2>
              </div>
              <div className={bodyText}>
                <p>
                  İnsan emeğinin değeri, eğer nüfusta bir düşüş olmazsa kesin olarak düşecektir. Son
                  zamanlarda insana değer sağlayan şey masa başı işlerdi ama bu işleri artık yapay
                  zeka yapabilir hale geldi.
                </p>
                <p>
                  İnsanlar diğer işlere yönelecekler ve herkes yöneldiği için o işlerin değeri
                  düşecektir. Eğer uzay keşifleri ve kolonizasyonu başlarsa bunda şans var; insanlar
                  belki bundan maaş alabilir ve birçok insan gitmesine rağmen değerli bir iş olarak
                  görülebilir bu.
                </p>
                <p>
                  Gelecekte sanatçılık ve zanaatkarlık önemli bir yere sahip olacak; bu işi yapan ve
                  başarılı olan insanların değeri yüksek olacaktır. Ama genel olarak bu nüfusla
                  seyredersek kesinlikle &quot;ekonomik&quot; değerimiz düşecektir.
                </p>
              </div>
            </section>

            {/* Bölüm 4 */}
            <section id="q4" className="scroll-mt-28 space-y-8">
              <div className="space-y-4 border-b border-zinc-900 pb-6">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
                  Bölüm 04 / 06
                </span>
                <h2
                  className={`${bebasNeue.className} text-3xl leading-tight tracking-wide text-ink-strong uppercase md:text-5xl`}
                >
                  {SECTIONS[3].heading}
                </h2>
              </div>
              <div className={bodyText}>
                <p>
                  Üretim artarken, üretimi sağlayan gücü kimlerin elinde tuttuğu çok önemlidir. Bu
                  gücü elde tutanlar yapay zekanın halledebileceği her sektörde tekel haline
                  gelebilir.
                </p>

                <div className="space-y-6 border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
                  <h3
                    className={`${bebasNeue.className} text-2xl tracking-widest text-[#FF003C]`}
                  >
                    YAPAY ZEKA VE KÜRESEL DENETİM ÇIKMAZI
                  </h3>
                  <p className="text-sm">
                    Yapay zekayı şirketlerden alıp insanlığa mal etmek mümkün mü? Teoride bu, tıpkı
                    bilim gibi düşünülebilir; ancak pratikte gerçekleşmesinin önünde devasa engeller
                    vardır:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <span className="mb-1 block font-bold text-ink-strong">
                        1. Jeopolitik Rekabet:
                      </span>
                      <p className="text-sm text-ink-faint">
                        &quot;Eğer ben durursam onlar beni geçer&quot; korkusu, ulus-devletleri bu teknolojide
                        fren yapmaktan alıkoyar.
                      </p>
                    </div>
                    <div>
                      <span className="mb-1 block font-bold text-ink-strong">
                        2. Sermaye ve Mülkiyet:
                      </span>
                      <p className="text-sm text-ink-faint">
                        Büyük sermayenin &quot;insanlık namına&quot; değil, kâr etmek için yatırıldığı bir
                        sistemde kamuya devir hayalcilik olur.
                      </p>
                    </div>
                    <div>
                      <span className="mb-1 block font-bold text-ink-strong">3. Hızın Fiyatı:</span>
                      <p className="text-sm text-ink-faint">
                        Denetim mekanizmaları inovasyonu yavaşlatır. Şu anki ilerleme, kuralsızlığın
                        bir ürünüdür.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bölüm 5 */}
            <section id="q5" className="scroll-mt-28 space-y-8">
              <div className="space-y-4 border-b border-zinc-900 pb-6">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
                  Bölüm 05 / 06
                </span>
                <h2
                  className={`${bebasNeue.className} text-3xl leading-tight tracking-wide text-ink-strong uppercase md:text-5xl`}
                >
                  {SECTIONS[4].heading}
                </h2>
              </div>
              <div className={bodyText}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="border border-zinc-900 bg-black/40 p-6">
                    <h3 className="mb-4 text-xs font-bold tracking-widest text-emerald-500 uppercase">
                      Neden mümkün?
                    </h3>
                    <p className="text-sm">
                      Yapay zeka verimliliği patlatırsa, bir kişinin 8 saatte ürettiği değeri 4
                      saatte üretebiliriz. Bu, kârlılıktan ödün vermeden çalışma süresini
                      kısaltabilir.
                    </p>
                  </div>
                  <div className="border border-zinc-900 bg-black/40 p-6">
                    <h3 className="mb-4 text-xs font-bold tracking-widest text-[#FF003C] uppercase">
                      Neden değil?
                    </h3>
                    <p className="text-sm">
                      İnsan emeği ucuzladıkça, hayatta kalabilmek için daha fazla çalışmak gerekebilir.
                      Birim saat başına alım gücü azaldığı için kölelik benzeri bir zorunluluk
                      doğabilir.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bölüm 6 */}
            <section id="q6" className="scroll-mt-28 space-y-8">
              <div className="space-y-4 border-b border-zinc-900 pb-6">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
                  Bölüm 06 / 06
                </span>
                <h2
                  className={`${bebasNeue.className} text-3xl leading-tight tracking-wide text-ink-strong uppercase md:text-5xl`}
                >
                  {SECTIONS[5].heading}
                </h2>
              </div>
              <div className={bodyText}>
                <p>
                  Eğer insanlar baskı yapıp yapay zeka şirketleri ve devletlerle kendi haklarını
                  koruyacak mücadeleler verirse, gelecekte insan hala kendi ülkesinde egemen
                  olabilir.
                </p>
                <p>
                  Peki ya insanların yüzde 90&apos;ından fazlasının vergi vermediği bir dünya düzenine
                  geçersek, devletin bizi umursama sebebi ne olacak? Bunun tek kitlesel çözümü
                  mücadele vermek ve gerekirse şirketleri regüle etmektir.
                </p>
                <div className="my-12 border-y border-zinc-900 py-10 text-center">
                  <p
                    className={`${bebasNeue.className} text-4xl text-ink-strong uppercase md:text-6xl`}
                  >
                    KİMSEYE GÜVENMEYİN VE <br />
                    <span className="text-[#FF003C]">SİZ DE BİZE KATILIN.</span>
                  </p>
                  <Link
                    href="/#join"
                    className="mt-8 inline-block bg-white px-8 py-4 font-black tracking-widest text-black uppercase transition-all hover:bg-[#FF003C] hover:text-white"
                  >
                    Harekete geç
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>

      {/* Alt bilgi */}
      <footer className="w-full border-t border-zinc-900 bg-black/50 px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <span
            className={`${spaceGrotesk.className} font-mono text-xs tracking-widest text-ink-faint uppercase`}
          >
            © 2026 YETER LA // DOSYA ANALİZ SİSTEMİ
          </span>
          <div className="flex gap-8">
            <Link
              href="/gelecek"
              className="text-sm font-bold tracking-widest text-ink-faint uppercase transition-colors hover:text-white"
            >
              DİĞER DOSYALAR
            </Link>
            <Link
              href="/"
              className="text-sm font-bold tracking-widest text-ink-faint uppercase transition-colors hover:text-white"
            >
              ANA SAYFA
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
