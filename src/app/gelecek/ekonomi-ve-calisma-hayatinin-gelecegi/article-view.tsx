"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import ArticleShell, { ArticleSection, displayFontClass } from "@/components/article-shell";
import { ARTICLE, SECTIONS, SUMMARY } from "@/lib/gelecek-article";

/** Her bölümün gövde içeriği (Bölüm başlığı ArticleSection tarafından eklenir) */
const SECTION_CONTENT: ReactNode[] = [
  // Bölüm 01
  <>
    <p>
      Yapay zeka ve otomasyonun ilerleyişini düz bir çizgi olarak görmek hata olur. Yapay zeka ve
      otomasyonların ilerleyişi, bazen içine yeni bir kendisi büyüklüğünde kartopu giren kartopu
      gibidir.
    </p>
    <p>
      İlerledikçe hızlanır ama beklenmeyen bir anda çok hızlı büyüyebilir. İlk olarak bunu bilmek
      lazım ve buna göre çıkarım yapmak lazımdır.
    </p>
    <p>
      Aralık 2022&apos;de ChatGPT tüm dünyada popüler oldu ve o zamandan bu zamana değişimi ve
      işimizi elimizden alma eğrisini (işsizliği sadece yapay zekaya bağlamak çok doğru olmasa da
      ekonomik krizle birleşince resmen kriz oldu) incelediğimizde, bu kartopu eğrisinin avuç kadar
      bir kütle iken nasıl bir bina büyüklüğüne geldiğini gördük.
    </p>
    <p>
      Biz önümüzdeki 5 yılı değil, 10-20 yılı düşünmek istiyoruz. O yüzden tarım ile uğraşmak gibi
      mantıklı görünen düşünceler bile yanlıştır; çünkü bir raddede, 10 yıl içinde yapay zeka
      tarafından ve hatta şimdi bile kolaylıkla yapılabilir.
    </p>

    <div className="my-8 space-y-4 border-l-4 border-[#FF003C] bg-black/40 p-6">
      <h3 className="text-sm font-bold tracking-widest text-ink-strong uppercase">
        Tahmin edilen meslek kolları
      </h3>
      <ul className="list-inside list-disc space-y-2 text-ink-faint">
        <li>
          Ofis işlerini unutun artık, eskisi gibi özellikle virüs zamanındaki gibi o işler bize para
          kazandırmaz.
        </li>
        <li>
          Yazılımın tamamen biteceği söylenebilir; sadece bu tür olayların mühendislik ve derin
          düşünme, ihtiyaca uygun ürün yaratma kolunda insanlar olacaktır.
        </li>
        <li>
          Birçok mühendislik bitecektir; mühendislerin onda sekiz-dokuzunun işsiz kalacağını söylemek
          yanlış olmaz.
        </li>
        <li>
          Doktorluk ve öğretmenlik gibi meslekler devam edecektir ama özel ders alma gibi olayların
          yarı yarıya düşeceğini söyleyebiliriz.
        </li>
      </ul>
    </div>

    <p className="text-xl font-bold text-ink-strong">Robotlar vs. İnsan</p>
    <p>
      Robot ve insan çalışan arasında belirgin bir fark olacak. Robot, büyük oranda işini
      profesyonel yapan, katı, başarı oranı yüksek, üretim hızı yüksek, maliyetinin belli bir
      ortalaması olan iken; insan, daha esnek ve ucuza kullanılabilecek bir işçiye dönüşebilir.
    </p>
    <p>
      Mesela arabanda ağır bir hasar olunca aracın fabrikanın robotlar tarafından işletilen yetkili
      servisine gidersen işin tam ve profesyonel şekilde hallolur ama maliyeti daha fazla olur. Bunun
      yanında, eğer mahalle aralarındaki küçük sanayiye gidersen işi daha ucuza ve daha kolay,
      pratik yollu tamirlerle halledebilirsin.
    </p>
    <p>
      Yani zanaat ve el işleri, ustalık işleri tamamen yok olmayıp bir tercih haline gelebilir. Kim
      bilir, belki insanlar gelecekte satın alacakları ürünlerde &quot;İnsan Emeğidir / El
      Yapımı&quot; ibaresi arayacak ve buna fazladan para ödeyecekler.
    </p>
  </>,

  // Bölüm 02
  <>
    <p>
      Basit iş gücü olarak sanayide, tarlada, fabrikada çalışabilirler. Zanaat yapıp belki bundan
      para kazanabilirler. Gelecekte zanaat ve sanat gibi konuların, eğlence kültürünün artmasını
      bekliyorum.
    </p>
    <p>
      Eğer eğlence kültürü haddinden fazla artarsa, sosyal medyadan kaynaklı zehirlenmiş,
      &quot;hayatsız&quot; diye tabir edilen depresif arkadaşlar çıkabilir. Bu evreyi tamamlayan ve
      &quot;Yeter la!&quot; diyen insanlar her şeyden uzaklaşıp kendi hayatını yaşamaya çalışabilir.
    </p>
    <blockquote className="border-l-2 border-[#FF003C]/60 bg-white/[0.03] py-4 pl-5 text-ink-strong italic">
      &quot;Her şeyi boşverip yapay zeka şirketlerinin diktatörlüğünü kırmak adına kitlesel
      örgütlenmelerle uğraşabilirler.&quot;
    </blockquote>
    <p>
      Eğer evrensel temel gelir (maaş) verilmezse insanlara, olaylar çok daha kaotik bir duruma
      gelebilir. Devletler sırf işsiz insan olmasın diye herkesi bir işe bağlamaya çalışabilir.
      Askerlik oranları artabilir ve dünyadaki gerilimle savaşlar çıkabilir.
    </p>
  </>,

  // Bölüm 03
  <>
    <p>
      İnsan emeğinin değeri, eğer nüfusta bir düşüş olmazsa kesin olarak düşecektir. Son zamanlarda
      insana değer sağlayan şey masa başı işlerdi ama bu işleri artık yapay zeka yapabilir hale
      geldi.
    </p>
    <p>
      İnsanlar diğer işlere yönelecekler ve herkes yöneldiği için o işlerin değeri düşecektir. Eğer
      uzay keşifleri ve kolonizasyonu başlarsa bunda şans var; insanlar belki bundan maaş alabilir
      ve birçok insan gitmesine rağmen değerli bir iş olarak görülebilir bu.
    </p>
    <p>
      Gelecekte sanatçılık ve zanaatkarlık önemli bir yere sahip olacak; bu işi yapan ve başarılı
      olan insanların değeri yüksek olacaktır. Ama genel olarak bu nüfusla seyredersek kesinlikle
      &quot;ekonomik&quot; değerimiz düşecektir.
    </p>
  </>,

  // Bölüm 04
  <>
    <p>
      Üretim artarken, üretimi sağlayan gücü kimlerin elinde tuttuğu çok önemlidir. Bu gücü elde
      tutanlar yapay zekanın halledebileceği her sektörde tekel haline gelebilir.
    </p>

    <div className="space-y-6 border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
      <h3 className={`${displayFontClass} text-2xl tracking-widest text-[#FF003C] uppercase`}>
        YAPAY ZEKA VE KÜRESEL DENETİM ÇIKMAZI
      </h3>
      <p className="text-sm">
        Yapay zekayı şirketlerden alıp insanlığa mal etmek mümkün mü? Teoride bu, tıpkı bilim gibi
        düşünülebilir; ancak pratikte gerçekleşmesinin önünde devasa engeller vardır:
      </p>
      <div className="space-y-4">
        <div>
          <span className="mb-1 block font-bold text-ink-strong">1. Jeopolitik Rekabet:</span>
          <p className="text-sm text-ink-faint">
            &quot;Eğer ben durursam onlar beni geçer&quot; korkusu, ulus-devletleri bu teknolojide
            fren yapmaktan alıkoyar.
          </p>
        </div>
        <div>
          <span className="mb-1 block font-bold text-ink-strong">2. Sermaye ve Mülkiyet:</span>
          <p className="text-sm text-ink-faint">
            Büyük sermayenin &quot;insanlık namına&quot; değil, kâr etmek için yatırıldığı bir
            sistemde kamuya devir hayalcilik olur.
          </p>
        </div>
        <div>
          <span className="mb-1 block font-bold text-ink-strong">3. Hızın Fiyatı:</span>
          <p className="text-sm text-ink-faint">
            Denetim mekanizmaları inovasyonu yavaşlatır. Şu anki ilerleme, kuralsızlığın bir
            ürünüdür.
          </p>
        </div>
      </div>
    </div>
  </>,

  // Bölüm 05
  <div className="grid gap-6 md:grid-cols-2">
    <div className="border border-zinc-900 bg-black/40 p-6">
      <h3 className="mb-4 text-xs font-bold tracking-widest text-emerald-500 uppercase">
        Neden mümkün?
      </h3>
      <p className="text-sm">
        Yapay zeka verimliliği patlatırsa, bir kişinin 8 saatte ürettiği değeri 4 saatte
        üretebiliriz. Bu, kârlılıktan ödün vermeden çalışma süresini kısaltabilir.
      </p>
    </div>
    <div className="border border-zinc-900 bg-black/40 p-6">
      <h3 className="mb-4 text-xs font-bold tracking-widest text-[#FF003C] uppercase">
        Neden değil?
      </h3>
      <p className="text-sm">
        İnsan emeği ucuzladıkça, hayatta kalabilmek için daha fazla çalışmak gerekebilir. Birim saat
        başına alım gücü azaldığı için kölelik benzeri bir zorunluluk doğabilir.
      </p>
    </div>
  </div>,

  // Bölüm 06
  <>
    <p>
      Eğer insanlar baskı yapıp yapay zeka şirketleri ve devletlerle kendi haklarını koruyacak
      mücadeleler verirse, gelecekte insan hala kendi ülkesinde egemen olabilir.
    </p>
    <p>
      Peki ya insanların yüzde 90&apos;ından fazlasının vergi vermediği bir dünya düzenine
      geçersek, devletin bizi umursama sebebi ne olacak? Bunun tek kitlesel çözümü mücadele vermek
      ve gerekirse şirketleri regüle etmektir.
    </p>
    <div className="my-12 border-y border-zinc-900 py-10 text-center">
      <p className={`${displayFontClass} text-4xl text-ink-strong uppercase md:text-6xl`}>
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
  </>,
];

export default function ArticleView() {
  return (
    <ArticleShell
      fileNo={ARTICLE.fileNo}
      kicker={ARTICLE.kicker}
      h1={ARTICLE.h1}
      readingTime={ARTICLE.readingTime}
      category={ARTICLE.category}
      lastUpdated={ARTICLE.lastUpdated}
      lastUpdatedLabel={ARTICLE.lastUpdatedLabel}
      origin={ARTICLE.origin}
      originTone={ARTICLE.originTone}
      summary={SUMMARY}
      sections={SECTIONS}
    >
      {SECTIONS.map((s, i) => (
        <ArticleSection
          key={s.id}
          id={s.id}
          number={i + 1}
          total={SECTIONS.length}
          heading={s.heading}
        >
          {SECTION_CONTENT[i]}
        </ArticleSection>
      ))}
    </ArticleShell>
  );
}
