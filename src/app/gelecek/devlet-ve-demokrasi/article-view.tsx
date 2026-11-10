"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import ArticleShell, { ArticleSection, displayFontClass } from "@/components/article-shell";
import { ARTICLE, SECTIONS, SUMMARY } from "@/lib/devlet-demokrasi-article";

/* ---------- İçerik yardımcıları ---------- */

/** Alt başlık (1.1, 2.3 gibi numaralı kısımlar) */
function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-xl font-bold text-ink-strong">{children}</h3>;
}

/** Harfli alt başlık (A) Halkın iradesi gibi) */
function LetterHead({ letter, children }: { letter: string; children: ReactNode }) {
  return (
    <h4 className="pt-2 text-sm font-bold tracking-[0.15em] text-[#FF003C] uppercase">
      {letter}) {children}
    </h4>
  );
}

/** Madde işaretli liste */
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-inside list-disc space-y-2 text-ink">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/** Numaralı liste */
function Numbered({ items }: { items: string[] }) {
  return (
    <ol className="list-inside list-decimal space-y-2 text-ink">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}

/** Terim + açıklama listesi */
function DefList({ items }: { items: { term: string; def: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="text-ink">
          <strong className="font-bold text-ink-strong">{item.term}:</strong> {item.def}
        </li>
      ))}
    </ul>
  );
}

/** Vurgulu soru/alıntı kutusu */
function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3 border-l-4 border-[#FF003C] bg-black/40 p-6">
      <span className="block font-mono text-[11px] font-bold tracking-[0.2em] text-[#FF003C] uppercase">
        {title}
      </span>
      <p className="font-medium text-ink-strong">{children}</p>
    </div>
  );
}

/* ---------- Bölüm içerikleri ---------- */

const SECTION_CONTENT: ReactNode[] = [
  // Bölüm 01 — Demokrasi teknolojiye ayak uydurur mu?
  <>
    <p>
      Demokrasi, vatandaşların kendilerini yöneten kişiler ve yönetim biçimi üzerinde söz sahibi
      olmasını sağlayan bir sistemdir.
    </p>
    <p>
      Günümüzde bu katılımın en yaygın yollarından biri seçimlerdir. Vatandaşlar belirli aralıklarla
      oy kullanarak kendilerini yönetecek temsilcileri seçer.
    </p>
    <p>
      Ancak teknoloji artık insanların iletişim kurma, bilgi edinme ve karar verme biçimlerini hızla
      değiştiriyor. Eskiden bir insanın siyasi bir gelişmeden haberdar olması için televizyon, gazete
      veya başka geleneksel iletişim kanallarına ihtiyacı vardı. Bugün aynı kişi dünyanın farklı
      yerlerindeki gelişmeleri saniyeler içerisinde takip edebiliyor.
    </p>
    <p>Bu değişim demokrasinin önüne hem yeni fırsatlar hem de yeni sorunlar çıkarıyor.</p>

    <SubHead>1.1. Teknoloji demokrasiyi nasıl geliştirebilir?</SubHead>
    <DefList
      items={[
        {
          term: "Daha kolay bilgi edinme",
          def: "Vatandaşlar devletin yaptığı harcamalara, aldığı kararlara ve hazırladığı düzenlemelere dijital ortamda daha kolay ulaşabilir.",
        },
        {
          term: "Daha kolay katılım",
          def: "İnsanlar internet üzerinden görüş bildirebilir, kamu kurumlarına öneriler sunabilir ve tartışmalara katılabilir.",
        },
        {
          term: "Daha şeffaf yönetim",
          def: "Devletin faaliyetleri dijital ortamda yayımlanırsa vatandaşlar alınan kararları daha kolay inceleyebilir.",
        },
      ]}
    />

    <SubHead>1.2. Peki teknoloji demokrasiyi nasıl zayıflatabilir?</SubHead>
    <p>
      Teknoloji sayesinde doğru bilgiye ulaşmak kolaylaşırken yanlış bilgiye ulaşmak da
      kolaylaşabiliyor. Sosyal medya üzerinden yayılan sahte haberler, manipüle edilmiş görüntüler ve
      yapay zekâyla üretilen içerikler insanların siyasi kararlarını etkileyebilir.
    </p>
    <p>
      Bir başka sorun ise algoritmaların insanlara sürekli kendi görüşlerine yakın içerikler
      göstermesidir. Bu durum farklı görüşlerle karşılaşmayı zorlaştırabilir.
    </p>

    <Callout title="Bir düşünelim">
      Bir ülkede milyonlarca insanın siyasi kararları, ne kadar doğru olduğu bilinmeyen sosyal medya
      içeriklerinden etkileniyorsa demokratik karar alma süreci bundan nasıl etkilenir?
    </Callout>

    <p>
      Bir diğer konu da teknolojik erişim eşitsizliğidir. Herkesin aynı internet imkânlarına, dijital
      becerilere ve bilgi kaynaklarına sahip olmadığı bir toplumda yalnızca internet üzerinden
      katılım sağlamak bazı insanları dışarıda bırakabilir.
    </p>
    <p>
      OECD ve Birleşmiş Milletler Kalkınma Programı, dijital teknolojilerin katılımı ve şeffaflığı
      artırabileceğini, ancak yanlış bilgi ve manipülasyon gibi risklerin demokratik kurumlara zarar
      verebileceğini vurguluyor.
    </p>
  </>,

  // Bölüm 02 — Veri ve gözetim gücü ne olmalı?
  <>
    <p>
      Bir devletin vatandaşlarını koruyabilmesi için belirli bilgilere ve denetim mekanizmalarına
      ihtiyacı vardır. Örneğin suçların önlenmesi, kamu güvenliğinin sağlanması ve ciddi tehditlerin
      araştırılması için bazı bilgilerin toplanması gerekebilir.
    </p>
    <p>
      Ancak teknoloji geliştikçe devletlerin vatandaşları hakkında toplayabileceği bilgi miktarı da
      artıyor. Bugün akıllı telefonlar, güvenlik kameraları, dijital ödeme sistemleri ve internet
      hizmetleri büyük miktarda veri üretebiliyor. Bu veriler kullanılarak bir insanın nerede
      bulunduğu, hangi hizmetleri kullandığı veya hangi davranışları sergilediği hakkında çeşitli
      çıkarımlar yapılabilir.
    </p>

    <Callout title="Burada önemli bir soru ortaya çıkıyor">
      Devlet vatandaşlarını korumak için ne kadar bilgi toplamalı ve bu bilgileri hangi sınırlar
      içerisinde kullanmalı?
    </Callout>

    <SubHead>2.1. Devletlerin veri toplaması neden gerekli olabilir?</SubHead>
    <p>
      Bir şehirde ciddi bir suç işlendiğinde yetkililer olayın aydınlatılması için güvenlik kamerası
      kayıtlarını ve ilgili dijital kanıtları inceleyebilir. Bu tür çalışmalar kamu güvenliğine katkı
      sağlayabilir.
    </p>
    <p>
      Benzer şekilde dijital sistemler sayesinde afet yönetimi, salgınların takibi ve acil durum
      koordinasyonu daha etkili yürütülebilir. Ancak burada toplanan bilgilerin yalnızca belirli
      amaçlarla ve gerekli sınırlar içerisinde kullanılması önemlidir.
    </p>

    <SubHead>2.2. Peki gözetim aşırıya kaçarsa ne olur?</SubHead>
    <p>
      Bir devletin bütün vatandaşlarının sürekli izlendiğini düşünelim. İnsanlar hangi sitelere
      girdiklerinin, kimlerle iletişim kurduklarının veya hangi düşünceleri paylaştıklarının sürekli
      takip edildiğini hissedebilir.
    </p>
    <p>
      Böyle bir ortamda insanlar düşüncelerini açıklamaktan, farklı görüşleri savunmaktan veya
      toplumsal faaliyetlere katılmaktan çekinebilir. Yani gözetim yalnızca özel hayatı etkilemez;
      ifade özgürlüğünü ve insanların toplumsal yaşama katılma biçimini de etkileyebilir.
    </p>
    <p>
      Bu nedenle devletin güvenlik amacıyla bilgi toplama yetkisi ile vatandaşların mahremiyet hakkı
      arasında bir denge kurulmalıdır.
    </p>

    <SubHead>2.3. Bu dengenin temel kuralları ne olabilir?</SubHead>
    <Bullets
      items={[
        "Devletin hangi bilgileri, hangi amaçla topladığı açık olmalı.",
        "Veri toplama işlemi yasal bir dayanağa sahip olmalı.",
        "Toplanan bilgiler amaçla sınırlı ve gerekli olmalı.",
        "Gözetim faaliyetleri bağımsız denetime açık olmalı.",
        "Vatandaşlar haklarının ihlal edildiğini düşündüklerinde itiraz edebilmeli.",
        "Güvenlik gerekçesiyle verilen yetkiler sınırsız olmamalı.",
      ]}
    />
    <p>
      Avrupa İnsan Hakları Sözleşmesi&apos;nin 8. maddesi özel hayatın ve haberleşmenin korunmasını
      güvence altına alır. Kamu makamlarının bu hakka müdahalesi ancak belirli hukuki koşullarla ve
      demokratik toplumda gerekli olduğunda mümkün olabilir.
    </p>
  </>,

  // Bölüm 03 — Yapay zekâ karar verici olmalı mı?
  <>
    <p>
      Devletler her gün milyonlarca işlem gerçekleştiriyor. Vergilerin hesaplanması, sosyal
      yardımların değerlendirilmesi, hastanelerin yönetilmesi, kamu kaynaklarının dağıtılması ve
      vatandaşların başvurularının incelenmesi bunlardan bazıları. Bu kadar büyük bir işlem hacmini
      yönetmek ciddi miktarda insan gücü ve zaman gerektiriyor.
    </p>
    <p>
      Yapay zekâ sistemleri bu süreçlerin bir bölümünü daha hızlı gerçekleştirebilir. Ancak önemli bir
      ayrım var:
    </p>

    <Callout title="Temel ayrım">
      Bir işin yapay zekâ tarafından daha hızlı yapılabilmesi, o işi yapay zekânın tek başına yapması
      gerektiği anlamına gelir mi?
    </Callout>

    <SubHead>3.1. Yapay zekâ kamu yönetimine ne kazandırabilir?</SubHead>
    <p>
      Bir devlet kurumuna her gün binlerce başvuru geldiğini düşünelim. Bu başvuruların belgelerini
      sınıflandırmak, eksik evrakları tespit etmek ve ilgili birimlere yönlendirmek ciddi zaman
      alabilir. Yapay zekâ bu işlemleri otomatikleştirerek çalışanların üzerindeki yükü azaltabilir.
    </p>
    <p>Başka örnekler de verilebilir:</p>
    <Bullets
      items={[
        "Hastanelerde hasta yoğunluğunun tahmin edilmesi.",
        "Trafik akışının analiz edilmesi.",
        "Kamu harcamalarında şüpheli işlemlerin tespit edilmesi.",
        "Vatandaşların bilgi taleplerinin yanıtlanması.",
        "Afetlerde kaynakların ve ekiplerin yönlendirilmesine destek verilmesi.",
      ]}
    />
    <p>
      OECD&apos;nin 2026 Dijital Devlet Görünümü raporuna göre incelenen OECD ülkelerinde kamu
      hizmetlerinde yapay zekâ kullanımının yaygınlığı 2023 ile 2025 arasında artmıştır. Ancak
      politika oluşturma ve hesap verebilirlik gibi daha yüksek riskli alanlarda kullanım daha
      sınırlıdır.
    </p>

    <SubHead>3.2. Peki yapay zekâ kendi başına karar vermeli mi?</SubHead>
    <p>
      Bir vatandaşın sosyal yardım başvurusu incelendiğini düşünelim. Yapay zekâ sistemi bu kişinin
      gelirini, yaşadığı bölgeyi ve sunduğu belgeleri değerlendirir ve başvuruyu reddeder. Ancak
      kullanılan veriler eksik veya hatalıysa ne olacak? Belki kişinin gerçek geliri sistemde yanlış
      görünüyor, belki başvuru sahibinin özel koşulları algoritma tarafından dikkate alınamıyor.
    </p>
    <p>
      Kişinin başvurusu yalnızca bir algoritmanın verdiği kararla reddedilirse, hatayı açıklayacak ve
      sorumluluk üstlenecek bir mekanizma bulunması gerekir. Burada üç farklı kullanım biçimini
      ayırmalıyız:
    </p>
    <Numbered
      items={[
        "Yapay zekânın bilgi toplaması ve analiz yapması.",
        "Yapay zekânın insanlara karar önerileri sunması.",
        "Yapay zekânın insanlar adına doğrudan ve nihai karar vermesi.",
      ]}
    />
    <p>
      İlk iki kullanım belirli güvencelerle kamu yönetimine yardımcı olabilir. Üçüncü kullanım ise
      özellikle insanların temel haklarını etkileyen kararlarda daha ciddi riskler doğurur.
    </p>

    <SubHead>3.3. Geleceğin kamu yönetimi nasıl olabilir?</SubHead>
    <p>
      Yapay zekânın bütün kararları verdiği bir devlet hayal etmek yerine, insanlarla teknolojinin
      birlikte çalıştığı bir sistem de tasarlanabilir. Örneğin yapay zekâ binlerce başvuruyu inceleyip
      olası sonuçları gösterebilir. Ancak vatandaşın yaşamını ciddi şekilde etkileyen nihai karar,
      yetkili ve sorumluluğu belirli bir insan tarafından gözden geçirilebilir.
    </p>
    <p>
      Bunun yanında vatandaşın karara itiraz edebilmesi ve kararın hangi gerekçelerle alındığını
      öğrenebilmesi gerekir.
    </p>
  </>,

  // Bölüm 04 — Katılım nasıl artırılır?
  <>
    <p>
      Günümüzde birçok demokratik sistemde vatandaşların siyasi kararlar üzerindeki en önemli
      etkilerinden biri seçimlerde oy kullanmaktır. Seçimler, vatandaşların temsilcilerini
      belirlemesini sağlar.
    </p>
    <p>
      Ancak bir vatandaşın yaşadığı sorunlar veya savunduğu fikirler yalnızca seçim dönemlerinde
      önemli değildir. Bir şehirde toplu taşıma düzenlemesi yapılacağını düşünelim. Bu karar doğrudan
      o şehirde yaşayan insanları ilgilendirir. Ancak vatandaşların önemli bir bölümü karar
      hazırlanmadan önce görüş bildirme imkânına sahip değilse, ortaya çıkan düzenleme toplumun
      gerçek ihtiyaçlarını yeterince yansıtmayabilir.
    </p>
    <p>Bu nedenle seçimlerin yanında başka katılım yöntemlerine de ihtiyaç duyulabilir.</p>

    <SubHead>4.1. Vatandaşlar hangi yollarla daha fazla katılabilir?</SubHead>
    <LetterHead letter="A">Dijital danışma sistemleri</LetterHead>
    <p>
      Devlet bir düzenleme hazırlamadan önce vatandaşların görüşlerini internet üzerinden alabilir.
      Örneğin yeni bir eğitim düzenlemesi hazırlanırken öğrenciler, öğretmenler ve veliler görüşlerini
      paylaşabilir. Ancak yalnızca görüş toplamak yeterli değildir; bu görüşlerin nasıl
      değerlendirildiği de açıklanmalıdır.
    </p>
    <LetterHead letter="B">Vatandaş meclisleri</LetterHead>
    <p>
      Farklı yaşlardan, mesleklerden ve toplumsal kesimlerden seçilen vatandaşlar belirli sorunları
      tartışmak için bir araya gelebilir. Bu kişiler uzmanlardan bilgi alır, farklı çözümleri inceler
      ve ortak öneriler geliştirir. Burada önemli olan, yalnızca en yüksek sesle konuşan insanların
      değil, toplumun farklı kesimlerinin temsil edilmesidir.
    </p>
    <LetterHead letter="C">Katılımcı bütçeleme</LetterHead>
    <p>
      Bir belediyenin belirli bir bütçeyi vatandaşların önerilerine göre kullanacağını düşünelim.
      Vatandaşlar yeni parklar, kütüphaneler, ulaşım düzenlemeleri veya sosyal hizmetler önerebilir.
      Belirlenen kurallar çerçevesinde hangi projelerin destekleneceğine katılabilirler.
    </p>
    <LetterHead letter="D">Yerel toplantılar ve açık tartışmalar</LetterHead>
    <p>
      Vatandaşlar yaşadıkları bölgeleri ilgilendiren konularda yöneticilerle doğrudan görüşebilir. Bu
      yöntem özellikle yerel sorunların anlaşılmasını kolaylaştırabilir.
    </p>

    <SubHead>4.2. Herkesin internette oy kullanması yeterli mi?</SubHead>
    <p>
      İlk bakışta her vatandaşın internet üzerinden her konuda oy kullanabilmesi demokratik katılımı
      artıracak gibi görünebilir. Ancak bazı sorunlar vardır:
    </p>
    <Numbered
      items={[
        "Herkesin dijital hizmetlere erişimi ve bu hizmetleri kullanma becerisi aynı değildir.",
        "Karmaşık konularda insanlar yeterli bilgi edinmeden karar verebilir.",
        "Dijital oylamalar manipülasyon ve güvenlik sorunlarına açık olabilir.",
        "Çoğunluğun tercihi her zaman azınlıkların haklarını korumayabilir.",
      ]}
    />
    <p>
      Bu nedenle doğrudan katılımın yalnızca internet üzerinden oylama biçiminde tasarlanması yeterli
      olmayacaktır. OECD, vatandaş katılımının bilgiye dayalı tartışma, farklı görüşlerin temsil
      edilmesi ve kamu kurumlarının vatandaş önerilerine cevap vermesiyle daha anlamlı hâle
      geldiğini belirtiyor.
    </p>
  </>,

  // Bölüm 05 — Meşruiyetin kaynağı ne olmalı?
  <>
    <p>
      Bir devletin meşru olması, yalnızca ülkeyi yönetiyor olması anlamına gelmez. Meşruiyet, bir
      yönetimin karar verme ve yönetme yetkisinin toplum ve hukuk düzeni tarafından kabul edilebilir
      bir temele dayanmasıdır.
    </p>
    <p>
      Bir ülkede bir yönetim seçimleri kazanarak iktidara gelebilir. Ancak seçim kazanmış olması,
      bundan sonra aldığı her kararın otomatik olarak doğru veya hukuka uygun olduğu anlamına gelmez.
      Benzer şekilde bir yönetim ekonomik büyüme sağlayabilir; ancak ekonomik başarı da tek başına
      sınırsız yönetme yetkisi oluşturmaz.
    </p>
    <p>Peki bir devlet yönetme hakkını nereden almalıdır?</p>

    <LetterHead letter="A">Halkın iradesi</LetterHead>
    <p>
      Demokratik sistemlerde yönetimin temel meşruiyet kaynaklarından biri vatandaşların iradesidir.
      Vatandaşlar seçimler aracılığıyla kendilerini yönetecek temsilcileri belirleyebilir. Ancak bunun
      anlamlı olabilmesi için seçimlerin özgür, adil ve güvenilir olması gerekir. Ayrıca vatandaşların
      seçimler arasında da düşüncelerini açıklayabilmesi ve siyasi faaliyetlere katılabilmesi
      önemlidir.
    </p>

    <LetterHead letter="B">Hukukun üstünlüğü</LetterHead>
    <p>
      Bir ülkede devletin en üst makamında bulunan kişiler de hukuk kurallarına bağlı olmalıdır. Bir
      yönetimin seçim kazanmış olması, hukukun üzerinde bulunduğu anlamına gelmez. Bir hükümet kendi
      çıkarına uygun bir karar almak isteyebilir; ancak bu karar vatandaşların temel haklarını ihlal
      ediyorsa bağımsız yargı ve diğer hukuki denetim mekanizmaları devreye girebilmelidir.
    </p>
    <p>
      Avrupa Konseyi Venedik Komisyonu&apos;nun 2025 sonunda kabul ettiği ve 2026&apos;da onaylanan
      güncel Hukukun Üstünlüğü Kontrol Listesi; hukuka bağlılık, güçler ayrılığı, temel haklar,
      eşitlik ve yargı bağımsızlığı gibi konuları devlet yönetiminin değerlendirilmesinde temel
      ölçütler arasında ele alıyor.
    </p>

    <LetterHead letter="C">Hesap verebilirlik</LetterHead>
    <p>
      Bir devlet vatandaşlarından vergi topluyorsa ve kamu kaynaklarını kullanıyorsa, bu kaynakların
      nasıl harcandığını açıklayabilmelidir. Bir belediyenin büyük miktarda bütçeyi bir projeye
      ayırdığını düşünelim. Vatandaşlar bu projenin neden seçildiğini, ne kadara mal olduğunu ve nasıl
      sonuçlandığını öğrenebilmelidir. Yöneticiler yalnızca yetki sahibi olmamalı; kullandıkları
      yetkinin sonuçlarından da sorumlu tutulabilmelidir.
    </p>

    <LetterHead letter="D">Kamu yararı ve hizmet kalitesi</LetterHead>
    <p>
      Devletin eğitim, sağlık, güvenlik, adalet ve altyapı gibi temel hizmetleri yerine getirmesi
      toplumun yaşamını doğrudan etkiler. Bir devletin bu görevleri etkili biçimde yerine getirmesi,
      vatandaşların yönetime duyduğu güveni destekleyebilir. Ancak burada önemli bir ayrım var: Bir
      devletin başarılı hizmetler sunması önemlidir; fakat bu başarı, temel hakların ve hukukun ihlal
      edilmesini haklı çıkarmaz.
    </p>

    <SubHead>5.1. Öyleyse meşruiyetin temeli ne olmalı?</SubHead>
    <p>
      Bu soruya tek bir unsurla cevap vermek yeterli değildir. Seçimle gelen bir yönetimin hukuka
      bağlı olması, vatandaşların haklarını koruması ve hesap verebilir olması gerekir. Bunlardan biri
      eksik olduğunda diğerlerinin varlığı tek başına yeterli olmayabilir.
    </p>
  </>,

  // Bölüm 06 — Özgürlük ve güvenlik dengesi
  <>
    <p>
      İnsanların özgür yaşayabilmesi için güvenli bir topluma ihtiyaç vardır. Ancak güvenliği
      sağlamak amacıyla insanların özgürlüklerini aşırı derecede sınırlandırmak da başka sorunlara yol
      açabilir. Bu nedenle devletlerin en önemli görevlerinden biri, bireysel haklar ile toplumun
      güvenliği arasında denge kurmaktır.
    </p>

    <SubHead>6.1. Güvenlik neden gerekli?</SubHead>
    <p>
      Bir toplumda insanlar şiddet, hırsızlık, terör, dolandırıcılık veya başka suçlardan korunmak
      ister. Devletin temel görevlerinden biri vatandaşların can ve mal güvenliğini sağlamaktır.
    </p>
    <p>
      Bir ülkede organize suç faaliyetleri yürütüldüğünü düşünelim. Devlet bu faaliyetleri araştırmak
      ve suçları önlemek için kolluk kuvvetlerini, yargı sistemini ve belirli soruşturma yöntemlerini
      kullanabilir. Ancak bu faaliyetlerin hukuka uygun şekilde yürütülmesi gerekir.
    </p>

    <SubHead>6.2. Güvenlik amacıyla özgürlükler sınırlandırılırsa ne olur?</SubHead>
    <p>
      Bir devletin kamu güvenliğini gerekçe göstererek bütün vatandaşlarının iletişimlerini sürekli
      takip ettiğini düşünelim. Bu uygulama suçların tespit edilmesine yardımcı olabilir gibi görünse
      de insanların özel hayatını ciddi biçimde etkiler.
    </p>
    <p>
      Ayrıca insanlar sürekli takip edildiklerini düşünürlerse düşüncelerini açıklamaktan veya
      toplumsal faaliyetlere katılmaktan çekinebilir. Böylece güvenlik için oluşturulan mekanizmalar
      özgürlükleri zayıflatabilir.
    </p>

    <SubHead>6.3. Peki özgürlükler sınırsız olmalı mı?</SubHead>
    <p>
      Özgürlüklerin de başkalarının haklarıyla birlikte değerlendirilmesi gerekir. Bir kişinin ifade
      özgürlüğü, başka bir insana yönelik doğrudan tehditte bulunma veya suç işlemeye teşvik etme
      hakkı anlamına gelmez. Ancak bir düşüncenin rahatsız edici veya yönetimi eleştiren nitelikte
      olması tek başına onu yasaklamak için yeterli bir gerekçe oluşturmamalıdır.
    </p>
    <p>
      Burada önemli olan, özgürlüklere getirilen sınırlamaların hukuki dayanağının bulunması ve
      demokratik toplumda gerçekten gerekli olmasıdır.
    </p>

    <SubHead>6.4. Gelecekte teknoloji bu dengeyi nasıl değiştirebilir?</SubHead>
    <p>
      Yapay zekâ ve gelişmiş gözetim sistemleri sayesinde devletler bazı güvenlik tehditlerini daha
      erken tespit edebilir. Örneğin şehirlerdeki güvenlik kameralarından elde edilen görüntüler
      belirli suçların araştırılmasında kullanılabilir. Ancak aynı sistemler yanlış kişileri şüpheli
      olarak işaretleyebilir veya insanların hareketlerini sürekli takip etmek için kullanılabilir.
    </p>
    <p>Bu nedenle teknolojinin güvenlik amacıyla kullanılması şu güvenceleri gerektirir:</p>
    <Bullets
      items={[
        "Kullanımın açık bir hukuki dayanağı olmalı.",
        "Müdahale gerçekten gerekli olmalı.",
        "Amaçla orantılı olmalı ve daha az kısıtlayıcı seçenekler değerlendirilmelidir.",
        "Bağımsız denetim bulunmalı.",
        "İnsanlar haksız uygulamalara karşı itiraz edebilmelidir.",
      ]}
    />
    <p>
      Burada bir başka önemli nokta da güvenliğin yalnızca suçların önlenmesinden ibaret olmamasıdır.
      Ekonomik güvenlik, sağlık, barınma, doğal afetlere hazırlık ve toplumsal istikrar da insanların
      güvenli bir hayat sürebilmesi açısından önemlidir. Dolayısıyla geleceğin güvenlik anlayışını
      yalnızca daha fazla gözetim veya daha fazla kolluk gücü üzerinden düşünmemeliyiz.
    </p>
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

      {/* Sonuç — dosyanın genel değerlendirmesi ve harekete geçme çağrısı */}
      <section className="space-y-8 border-t border-zinc-900 pt-12">
        <div className="space-y-4 border-b border-zinc-900 pb-6">
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
            Sonuç
          </span>
          <h2
            className={`${displayFontClass} text-3xl leading-tight tracking-wide text-ink-strong uppercase md:text-5xl`}
          >
            BU DOSYADAN NE ANLAMALIYIZ?
          </h2>
        </div>

        <div className="space-y-6 text-ink">
          <p>
            Altı soruyu birlikte değerlendirdiğimizde geleceğin devletinin çözmesi gereken temel
            meseleleri görebiliyoruz. Teknoloji devletlerin daha hızlı çalışmasını sağlayabilir; ancak
            teknolojik güç, devletlerin vatandaşlar üzerindeki etkisini de artırabilir.
          </p>
          <p>
            Yapay zekâ kamu hizmetlerini geliştirebilir; ancak hatalı kararlar ve sorumluluk sorunları
            ortaya çıkarabilir. Dijital sistemler vatandaşların siyasi katılımını kolaylaştırabilir;
            ancak yanlış bilgi, manipülasyon ve dijital eşitsizlik gibi sorunları da beraberinde
            getirebilir.
          </p>
          <div className="space-y-3 border-l-4 border-[#FF003C] bg-black/40 p-6">
            <p className="font-medium text-ink-strong">
              Geleceğin devleti yalnızca daha teknolojik olmak zorunda değil. Aynı zamanda daha
              şeffaf, hesap verebilir, denetlenebilir ve vatandaşların haklarını koruyabilir olmalı.
            </p>
          </div>
          <p>
            Bu noktada henüz nasıl bir devlet modeli oluşturulması gerektiğine karar vermedik. Öncelikle
            mevcut demokratik sistemlerin güçlü ve zayıf yönlerini, farklı yönetim modellerinin
            sonuçlarını ve teknolojik dönüşümün yaratabileceği yeni sorunları araştırmamız gerekiyor.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-ink-strong">
              Bir sonraki araştırma için cevaplanmamış sorular
            </h3>
            <ol className="list-inside list-decimal space-y-2">
              <li>Gelecekte seçim sistemleri bugünkü şeklini korumalı mı?</li>
              <li>Vatandaşlar yasaların hazırlanmasında ne ölçüde söz sahibi olmalı?</li>
              <li>Devletin bütün kararlarının kamuya açık olması mümkün mü?</li>
              <li>
                Yapay zekâ destekli bir devlet yönetiminde insan denetimi nasıl güvence altına
                alınmalı?
              </li>
              <li>
                Bir devletin vatandaşlarına karşı sorumlulukları nerede başlamalı ve nerede bitmeli?
              </li>
              <li>
                Geleceğin demokrasisi temsil sistemine mi dayanmalı, doğrudan katılıma mı, yoksa
                ikisinin farklı bir birleşimine mi?
              </li>
            </ol>
          </div>
        </div>

        <div className="border-y border-zinc-900 py-10 text-center">
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
      </section>
    </ArticleShell>
  );
}
