"use client";

import type { ReactNode } from "react";
import ArticleShell, {
  ArticleSection,
  bodyText,
  displayFontClass,
} from "@/components/article-shell";
import { ARTICLE, SECTIONS, SUMMARY } from "@/lib/sahiplik-article";

/* ---------- İçerik yardımcıları ---------- */

/** Alt başlık (1.1, 2.3 gibi numaralı kısımlar) */
function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-xl font-bold text-ink-strong">{children}</h3>;
}

/** Harfli alt başlık (A) Altyapı kontrolü gibi) */
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

/** İki kolonlu veri tablosu */
function DataTable({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="border-b border-zinc-800 pr-4 pb-3 font-mono text-[10px] font-bold tracking-widest text-ink-faint uppercase">
              {head[0]}
            </th>
            <th className="border-b border-zinc-800 pb-3 font-mono text-[10px] font-bold tracking-widest text-ink-faint uppercase">
              {head[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={i} className="border-b border-zinc-900/70">
              <td className="py-3 pr-4 align-top font-semibold text-ink-strong">{a}</td>
              <td className="py-3 align-top text-ink">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Bölüm içerikleri ---------- */

const SECTION_CONTENT: ReactNode[] = [
  // Bölüm 01 — Sahiplik ve kontrol
  <>
    <SubHead>1.1. Öncelikle sahiplik ve kontrol nedir?</SubHead>
    <p>
      Sahiplik, bir varlık üzerinde hukuken tanınan mülkiyet hakkına sahip olmak anlamına gelir.
    </p>
    <p>
      Kontrol ise bir varlığın nasıl kullanılacağını, kimlerin erişebileceğini, hangi koşullarda
      çalışacağını ve hangi kararların uygulanacağını belirleyebilme gücüdür.
    </p>
    <p>
      Bu iki kavram çoğu zaman birlikte bulunur. Bir evin sahibi genellikle evin nasıl
      kullanılacağına da karar verir. Ancak ekonomik ve teknolojik sistemler karmaşıklaştıkça
      sahiplik ile kontrol birbirinden ayrılabilir.
    </p>
    <p>Örneğin:</p>
    <Bullets
      items={[
        "Bir şirket bir fabrikanın sahibi olabilir ancak fabrikanın işletmesini başka bir şirkete bırakabilir.",
        "Bir şirket kendi verilerine sahip olabilir ancak bu verilere yalnızca başka bir şirketin altyapısı üzerinden erişebilir.",
        "Bir geliştirici kendi uygulamasını oluşturabilir ancak uygulamasının çalışması için başka bir şirketin bulut hizmetine bağımlı olabilir.",
        "Bir yapay zekâ şirketi modelin ağırlıklarını veya kaynak kodunu paylaşmadan, kullanıcılara yalnızca API üzerinden hizmet sunabilir.",
      ]}
    />
    <p>Bu örneklerde mülkiyet, kullanım ve karar verme gücü farklı aktörler arasında dağılmıştır.</p>

    <SubHead>1.2. Bir şirket nasıl olur da sahibi olmadığı teknolojiyi kontrol edebilir?</SubHead>
    <p>Bunun birkaç temel yolu vardır.</p>

    <LetterHead letter="A">Altyapı kontrolü</LetterHead>
    <p>
      Bir şirketin geliştirdiği ürünün çalışabilmesi için başka bir şirketin altyapısına ihtiyaç
      duyduğunu düşünelim.
    </p>
    <p>
      Örneğin bir yazılım şirketi kendi uygulamasını geliştirmiş olsun. Uygulamanın verileri,
      sunucuları ve işlem gücü başka bir şirketin bulut altyapısında bulunsun.
    </p>
    <p>
      Yazılım şirketi uygulamanın sahibi olabilir. Ancak sunucu altyapısını kendisi yönetmiyorsa,
      altyapı sağlayıcısının kararlarına bağımlıdır.
    </p>
    <p>
      Bu bağımlılık her zaman kötü değildir. Bulut hizmetleri sayesinde küçük şirketler kendi veri
      merkezlerini kurmadan büyük ölçekli işlem gücü kullanabilir. Ancak altyapı sağlayıcısına
      bağımlılık arttıkça başka bir sağlayıcıya geçmek zorlaşabilir.
    </p>

    <LetterHead letter="B">Erişim kontrolü</LetterHead>
    <p>
      Bir teknolojinin kullanılabilmesi için sahibinin veya işletmecisinin izin vermesi gerekebilir.
    </p>
    <p>
      Örneğin bir şirket, geliştirdiği yapay zekâ modelini API aracılığıyla kullanıma açabilir.
      Kullanıcı modelin kendisini satın almaz. Modelin çalıştırıldığı sisteme belirli koşullar
      altında erişim elde eder.
    </p>
    <p>Bu durumda model sağlayıcısı şu konularda söz sahibi olabilir:</p>
    <Bullets
      items={[
        "Hangi kullanıcıların hizmete erişebileceği.",
        "Kullanım miktarının ne kadar olacağı.",
        "Hangi özelliklerin sunulacağı.",
        "Hangi koşullarda erişimin sınırlandırılacağı.",
        "Hizmetin hangi teknik sürümünün kullanılacağı.",
      ]}
    />
    <p>
      Dolayısıyla kullanıcı teknolojiden yararlanabilir ancak teknoloji üzerinde tam karar yetkisine
      sahip olmaz.
    </p>

    <LetterHead letter="C">Standartlar ve ekosistem kontrolü</LetterHead>
    <p>
      Bir şirketin gücü yalnızca sahip olduğu ürünlerden kaynaklanmaz. Diğer şirketlerin ürünlerini
      geliştirirken uymak zorunda kaldığı teknik standartlar ve ekosistemler de kontrol gücü
      oluşturabilir.
    </p>
    <p>
      Örneğin bir işletme belirli bir yazılım ekosistemine yatırım yaptığında çalışanlarını,
      verilerini, uygulamalarını ve iş süreçlerini o ekosisteme göre düzenleyebilir. Zaman içinde
      başka bir sisteme geçmek ciddi maliyet ve zaman gerektirebilir.
    </p>
    <p>
      Burada dikkat edilmesi gereken nokta şudur: Bir şirketin bütün altyapıya sahip olması gerekmez.
      Başkalarının kendi sistemleri üzerinden çalışmasını sağlayan konumu da ekonomik güç yaratabilir.
    </p>

    <SubHead>1.3. Bu durum neden önemli?</SubHead>
    <p>
      Çünkü gelecekte ekonomik güç yalnızca fabrikalara, makinelere veya taşınmazlara sahip olmak
      üzerinden tanımlanmayabilir. Üretimin gerçekleşmesi için gerekli olan sistemlere erişimi
      yönetebilmek de önemli bir güç kaynağı olabilir.
    </p>
    <p>
      Bir şirketin üretim tesisleri başka bir şirkete ait teknolojilere bağımlıysa, kendi mülkünü
      kullanabilme kapasitesi dahi bu bağımlılıktan etkilenebilir.
    </p>
    <p>
      OECD&apos;nin 2026 tarihli yapay zekâ piyasaları araştırması da çipler, bulut altyapısı, veri ve
      yapay zekâ modellerinin farklı aşamalarında yoğunlaşma ve dikey bütünleşme risklerine dikkat
      çekiyor.
    </p>

    <SubHead>1.4. Araştırmamız gereken temel mesele</SubHead>
    <p>Burada henüz bir çözüm önermiyoruz. Önce şu soruların cevaplarını aramalıyız:</p>
    <Numbered
      items={[
        "Gelecekte üretim için gerekli altyapıların hangileri stratejik öneme sahip olacak?",
        "Bir şirket kendi sahip olmadığı altyapıya ne kadar bağımlı hâle gelebilir?",
        "Altyapı sağlayıcısının kararları, o altyapıyı kullanan şirketlerin ekonomik özgürlüğünü ne ölçüde etkileyebilir?",
        "Bir teknolojinin kullanımını kontrol eden kişi, o teknolojiden doğan ekonomik gücü de kontrol etmiş sayılır mı?",
        "Bir toplumun üretim kapasitesi özel şirketlerin sahip olduğu altyapılara bağımlı hâle gelirse ne tür riskler ortaya çıkar?",
      ]}
    />
  </>,

  // Bölüm 02 — Erişim ve haklar
  <>
    <p>
      Bu sorunun önemi, gelecekte insanların ve şirketlerin kullandıkları teknolojilerin giderek daha
      büyük bölümünün kendilerine ait olmayan sistemler üzerinden sunulabilmesidir.
    </p>
    <p>
      Bugün bir yapay zekâ aracını kullanabilmek için onu geliştiren şirketin sahibi olmanız
      gerekmiyor. Bir hesap oluşturmanız, abonelik ödemeniz veya bir API anahtarı edinmeniz yeterli
      olabilir. Ancak burada önemli bir ayrım var:
    </p>
    <p className="text-xl font-bold text-ink-strong">
      Bir teknolojiyi kullanabilmek, o teknoloji üzerinde hak sahibi olmakla aynı şey değildir.
    </p>

    <SubHead>2.1. Yapay zekâ teknolojisine erişmenin farklı yolları nelerdir?</SubHead>
    <p>Bir yapay zekâ modelinin kullanıma sunulmasının birkaç farklı yöntemi vardır.</p>

    <LetterHead letter="A">Hazır bir hizmet üzerinden kullanım</LetterHead>
    <p>
      En yaygın örneklerden biri budur. Kullanıcı bir internet sitesine girer, hesabını açar ve yapay
      zekâ ile konuşmaya başlar.
    </p>
    <p>Bu modelde kullanıcı:</p>
    <Bullets
      items={[
        "Yapay zekâdan hizmet alabilir.",
        "Kendi verilerini sisteme gönderebilir.",
        "Bazı ayarları değiştirebilir.",
        "Abonelik kapsamında belirli özelliklerden yararlanabilir.",
      ]}
    />
    <p>
      Ancak genellikle modelin çalıştığı sunucuları, model ağırlıklarını veya altyapıyı yönetemez.
      Kullanıcıya sunulan şey teknolojinin mülkiyeti değil, hizmetten yararlanma imkânıdır.
    </p>

    <LetterHead letter="B">API üzerinden kullanım</LetterHead>
    <p>
      API, iki farklı yazılımın birbirleriyle iletişim kurmasını sağlayan arayüzdür. Örneğin bir
      yazılımcının kendi uygulamasına yapay zekâ özelliği eklemek istediğini düşünelim.
    </p>
    <p>
      Yapay zekâ modelini sıfırdan geliştirmek yerine başka bir şirketin API hizmetini kullanabilir.
      Böylece kendi uygulamasını geliştirebilir, müşterilerine hizmet verebilir ve yapay zekâyı iş
      süreçlerine entegre edebilir. Ancak modelin kendisi yine başka bir şirkete aittir.
    </p>
    <p>
      Uygulama geliştiricisi kendi yazılımına sahipken kullandığı temel yapay zekâ teknolojisini
      kontrol edemeyebilir. Bu ayrım özellikle gelecekte önem kazanabilir; çünkü çok sayıda işletme
      kendi yapay zekâsını geliştirmek yerine mevcut modellerin üzerine kendi hizmetlerini inşa
      edebilir.
    </p>

    <LetterHead letter="C">Modelin kendisini indirerek kullanmak</LetterHead>
    <p>
      Bazı yapay zekâ modellerinin ağırlıkları indirilebilir ve uygun donanımda çalıştırılabilir. Bu
      yöntemde kullanıcı yalnızca başka bir şirketin sunucusunda çalışan hizmete bağımlı kalmak
      zorunda değildir. Kendi bilgisayarında, sunucusunda veya kiraladığı altyapıda model
      çalıştırabilir.
    </p>
    <p>Bu yöntem daha fazla teknik kontrol sağlayabilir. Örneğin:</p>
    <Bullets
      items={[
        "Modelin hangi sunucuda çalışacağını seçebilir.",
        "Kullanım kapasitesini kendi ihtiyaçlarına göre belirleyebilir.",
        "Uygun lisans koşulları altında modeli özelleştirebilir.",
        "Üçüncü taraf hizmetlerine olan bağımlılığını azaltabilir.",
      ]}
    />
    <p>
      Fakat bu da bütün sorunları ortadan kaldırmaz. Modeli çalıştırmak için gerekli işlem gücü,
      elektrik, donanım, bakım ve teknik uzmanlık hâlâ ciddi maliyetler oluşturabilir. Ayrıca
      indirilebilir model ağırlıkları her zaman sınırsız kullanım hakkı anlamına gelmez; lisans
      koşulları farklılık gösterebilir.
    </p>

    <SubHead>2.2. Kullanıcı hangi haklara sahip olur?</SubHead>
    <p>
      Burada tek bir cevap yoktur. Kullanıcıya verilen haklar, hizmetin türüne, sözleşmeye, lisansa ve
      ilgili hukuka bağlıdır. Bunu birkaç parçaya ayırabiliriz:
    </p>
    <DataTable
      head={["Hak veya yetki", "Ne anlama gelir?"]}
      rows={[
        ["Kullanım hakkı", "Teknolojiyi belirlenen koşullarda kullanabilmek"],
        ["Erişim hakkı", "Hizmete veya sisteme ulaşabilmek"],
        ["Veri taşınabilirliği", "Kendi verilerini başka sisteme aktarabilmek"],
        ["Özelleştirme hakkı", "Teknolojiyi belirlenen sınırlar içinde değiştirebilmek"],
        ["Mülkiyet", "Teknolojinin hukuki sahibi olmak"],
        ["İşletme kontrolü", "Teknolojinin çalışma koşullarını ve altyapısını yönetebilmek"],
      ]}
    />
    <p>
      Bir kullanıcı bunlardan birkaçına sahip olabilir ancak tamamına sahip olmak zorunda değildir.
      Örneğin bir şirket yapay zekâ hizmetini satın alabilir, kendi verilerini sisteme gönderebilir
      ve uygulamasını bu model üzerine kurabilir. Fakat modelin ağırlıklarını alamayabilir, modelin
      nasıl eğitildiğine erişemeyebilir, sunucuları yönetemeyebilir.
    </p>
    <p>
      Burada ortaya çıkan ekonomik ilişki, kullanıcının bir hizmet sağlayıcısına bağımlı olabileceği
      bir yapı oluşturur.
    </p>

    <SubHead>2.3. Kendi verilerimizi başka bir şirkete emanet ettiğimizde ne olur?</SubHead>
    <p>
      Bu mesele yalnızca yapay zekâ modelleriyle sınırlı değil. Bir işletmenin müşteri bilgilerini,
      finansal kayıtlarını, çalışan bilgilerini ve bütün operasyonlarını tek bir bulut sağlayıcısında
      tuttuğunu düşünelim.
    </p>
    <p>
      İşletme bu verilerin hukuki haklarını elinde bulundurabilir. Ancak verilerin saklanması,
      işlenmesi ve aktarılması için altyapı sağlayıcısına ihtiyaç duyabilir. Bu durumda şu sorular
      ortaya çıkar:
    </p>
    <Bullets
      items={[
        "İşletme kendi verilerini istediği zaman dışarı aktarabilir mi?",
        "Veriler başka bir sisteme aktarıldığında aynı şekilde kullanılabilir mi?",
        "Başka bir sağlayıcıya geçildiğinde bütün uygulamalar çalışmaya devam eder mi?",
        "Hizmet sona erdiğinde verilerin silinmesi veya geri alınması nasıl güvence altına alınır?",
        "Sağlayıcı ile müşteri arasında anlaşmazlık çıkarsa ne olur?",
      ]}
    />
    <p>
      Bu konunun gerçek dünyada da hukuki karşılığı bulunuyor. Avrupa Birliği&apos;nin Veri Yasası
      (Data Act), veri işleme ve bulut hizmetlerinde sağlayıcı değiştirmeyi kolaylaştırmak için
      düzenlemeler getiriyor. Kullanıcıların verilerini ve dijital varlıklarını başka sağlayıcılara
      aktarabilmesi, birlikte çalışabilirlik ve sözleşme şeffaflığı bu düzenlemenin önemli başlıkları
      arasında. Yasa 12 Eylül 2025&apos;ten beri uygulanıyor.
    </p>
    <p>
      Bu düzenleme bize önemli bir gerçeği gösteriyor: Bir hizmeti kullanabilmek kadar, o hizmetten
      ayrılabilmek de ekonomik özgürlük açısından önemlidir.
    </p>

    <SubHead>2.4. Açık kaynak ve kapalı kaynak modellerin ekonomik farkı nedir?</SubHead>
    <p>Burada iki farklı teknoloji yaklaşımını incelemeliyiz.</p>
    <p className="font-bold text-ink-strong">Kapalı modeller:</p>
    <p>
      Modelin önemli teknik bileşenleri sağlayıcı tarafından kontrol edilir. Kullanıcılar genellikle
      bir arayüz veya API üzerinden hizmet alır. Bunun avantajları arasında kolay kullanım, sağlayıcı
      tarafından yapılan bakım ve donanım ihtiyacının kullanıcıya bırakılmaması vardır.
      Dezavantajları ise sağlayıcıya bağımlılık, fiyat değişiklikleri ve teknik kararlar üzerinde
      sınırlı söz hakkıdır.
    </p>
    <p className="font-bold text-ink-strong">Açık ağırlıklı veya açık kaynaklı modeller:</p>
    <p>
      Bu modellerde paylaşımın kapsamı modele göre değişmekle birlikte kullanıcıların modeli indirip
      kendi altyapılarında çalıştırabilmesi mümkün olabilir. Bu durum sağlayıcı bağımlılığını
      azaltabilir ve daha fazla teknik özgürlük sağlayabilir.
    </p>
    <p>
      Ancak açık model kullanmak da otomatik olarak ekonomik bağımsızlık getirmez; çünkü güçlü
      donanım, enerji, veri, uzmanlık ve güvenlik altyapısı gereksinimleri devam eder. Burada önemli
      olan açık veya kapalı olmanın tek başına iyi ya da kötü olması değil, kullanıcının gerçek karar
      ve değiştirme kapasitesinin ne olduğudur.
    </p>

    <SubHead>2.5. Gelecekte bu durum nasıl bir probleme dönüşebilir?</SubHead>
    <p>
      2035 yılında milyonlarca insanın ve işletmenin günlük yaşamını yapay zekâ sistemleri üzerinden
      sürdürdüğünü düşünelim. Bir işletmenin muhasebesi, müşteri hizmetleri, üretim planlaması,
      lojistiği ve insan kaynakları yapay zekâ sistemleriyle yönetiliyor olsun.
    </p>
    <p>
      Bu işletme kullandığı teknolojilerin hiçbirinin sahibi değilse ne olur? Teknik açıdan işletme
      hâlâ kendi müşterilerine, çalışanlarına ve ürünlerine sahip olabilir. Fakat günlük faaliyetlerini
      sürdürebilmesi için birden fazla dış teknoloji sağlayıcısına bağımlı hâle gelebilir.
    </p>
    <p>
      Bu bağımlılık arttığında işletmenin başka sistemlere geçebilme kapasitesi önem kazanır. Böylece
      gelecekte ekonomik özgürlük yalnızca sahip olunan mülklerle değil, kullanılmak zorunda olunan
      teknolojilerin değiştirilebilirliğiyle de ilişkili hâle gelebilir.
    </p>

    <SubHead>2.6. Araştırmamız gereken temel mesele</SubHead>
    <Numbered
      items={[
        "Bir insanın kullandığı teknoloji üzerinde ne tür haklara sahip olması gerekir?",
        "İnsanlar ve işletmeler kendi verilerini her zaman başka sağlayıcılara taşıyabilmeli mi?",
        "Yapay zekâ hizmetlerine erişim kesildiğinde işletmelerin faaliyetlerini sürdürmesini sağlayacak güvenceler olmalı mı?",
        "Açık ağırlıklı modeller gelecekte teknoloji üzerindeki gücü daha geniş kesimlere dağıtabilir mi?",
        "Devletler temel dijital altyapılara erişim konusunda hangi sorumlulukları taşımalı?",
        "Bir teknolojiyi kullanabilmek ile onu değiştirebilmek, denetleyebilmek ve alternatifini oluşturabilmek arasında nasıl bir fark var?",
      ]}
    />
  </>,

  // Bölüm 03 — Erişim kapatılabilir mi?
  <>
    <p>
      Bu soru, sahiplik ve kontrol arasındaki ilişkinin en somut sonuçlarından birini ortaya
      çıkarıyor. Bir teknolojiyi kullanabilmek için başka bir şirkete bağımlı olduğunuzda, o şirketin
      aldığı kararlar sizin ekonomik faaliyetlerinizi doğrudan etkileyebilir.
    </p>
    <p>
      Ancak burada önemli bir ayrıntı var: Bir şirketin teknolojiye sahip olması, istediği her şeyi
      hiçbir hukuki sınırlama olmadan yapabileceği anlamına gelmez. Sözleşmeler, tüketici hakları,
      rekabet hukuku, veri koruma düzenlemeleri ve ilgili sektör kuralları bu yetkileri
      sınırlandırabilir.
    </p>
    <p>
      Bu nedenle konuyu hem sağlayıcının sahip olduğu ticari yetkiler hem de kullanıcının sahip
      olması gereken güvenceler açısından incelemeliyiz.
    </p>

    <SubHead>3.1. Bir şirket neden erişimi kapatabilir?</SubHead>
    <p>
      Bir yapay zekâ şirketinin API hizmeti verdiğini düşünelim. Binlerce yazılım geliştirici bu
      API&apos;yi kendi uygulamalarında kullanıyor. Bazı şirketler bütün iş süreçlerini bu sisteme göre
      oluşturmuş. Sağlayıcı çeşitli nedenlerle bir kullanıcının erişimini durdurabilir:
    </p>
    <Bullets
      items={[
        "Kullanıcının sözleşme veya kullanım kurallarını ihlal etmesi.",
        "Güvenlik tehdidi veya kötüye kullanım tespit edilmesi.",
        "Ödeme yapılmaması.",
        "Teknik arıza veya kapasite yetersizliği.",
        "Ürünün veya modelin hizmetten kaldırılması.",
        "Ticari stratejinin değişmesi.",
      ]}
    />
    <p>
      Bunların hepsi aynı şekilde değerlendirilmemelidir. Güvenliği korumak için zararlı kullanımı
      engellemek ile ticari nedenlerle müşteriyi alternatiften yoksun bırakmak farklı meselelerdir.
      Asıl araştırmamız gereken, hizmet sağlayıcının erişimi hangi koşullarda kısıtlayabildiği ve
      müşterinin bu karar karşısında ne tür haklara sahip olduğudur.
    </p>

    <SubHead>3.2. Fiyat değişikliği ekonomik bağımlılık yaratabilir mi?</SubHead>
    <p>
      Biraz daha somut bir örnek üzerinden ilerleyelim. Bir yazılım şirketi, bütün ürününü tek bir
      yapay zekâ sağlayıcısının API&apos;si üzerine kurmuş olsun. Başlangıçta her işlem için ödediği
      ücret oldukça düşük olabilir. Şirket bu düşük maliyeti dikkate alarak fiyatlandırma yapar,
      müşteriler kazanır ve operasyonlarını büyütür.
    </p>
    <p>Fakat bir süre sonra API sağlayıcısı fiyatlarını önemli ölçüde artırırsa ne olur?</p>
    <p>Yazılım şirketinin üç seçeneği vardır:</p>
    <Numbered
      items={[
        "Artan maliyeti kendisi üstlenmek.",
        "Müşterilerine daha yüksek fiyat uygulamak.",
        "Başka bir teknoloji sağlayıcısına geçmek.",
      ]}
    />
    <p>
      Üçüncü seçenek ilk bakışta kolay görünebilir. Ancak yazılımın tamamı belirli bir API&apos;ye
      göre tasarlanmışsa geçiş ciddi teknik ve ekonomik maliyetler doğurabilir. Örneğin:
    </p>
    <Bullets
      items={[
        "Yazılımın kodları yeniden düzenlenmek zorunda kalabilir.",
        "Yeni modelin performansı test edilmelidir.",
        "Önceden oluşturulan veri işleme sistemleri değiştirilmelidir.",
        "Güvenlik kontrolleri yenilenmelidir.",
        "Çalışanlar yeni sisteme adapte edilmelidir.",
        "Müşterilerin hizmetinde kesintiler yaşanabilir.",
      ]}
    />
    <p>
      Dolayısıyla fiyat artışı yalnızca bir hizmetin pahalanması anlamına gelmez. Bir işletmenin
      bütün maliyet yapısını etkileyebilir.
    </p>

    <SubHead>3.3. Bir şirket kullanım koşullarını değiştirebilir mi?</SubHead>
    <p>
      Evet, sağlayıcılar hizmet sözleşmelerinde belirli şartlarla fiyat, teknik özellik ve kullanım
      koşullarını değiştirme hakkı tanıyabilir. Ancak bu hakların kapsamı sözleşmeye ve geçerli
      hukuka bağlıdır. Her değişikliğin tek taraflı ve sınırsız şekilde yapılabileceğini varsayamayız.
    </p>
    <p>
      Örneğin bir şirket kullandığınız yazılımın API&apos;sini tamamen değiştirebilir, eski sürümü
      kullanımdan kaldırabilir veya belirli özellikleri yeni bir abonelik paketine taşıyabilir. Bu
      durumda kullanıcı teknik olarak hizmeti kullanmaya devam ediyor olsa bile daha önce sahip
      olduğu imkânları kaybedebilir.
    </p>
    <p>
      Özellikle işletmeler açısından bu konu önemlidir. Çünkü bir hizmete bağımlı olmak yalnızca o
      hizmetin bugün ne sunduğuyla ilgili değildir; gelecekte ne sunmaya devam edeceğiyle de
      ilgilidir.
    </p>

    <SubHead>3.4. Lock-in: Bir sisteme bağımlı kalma problemi nedir?</SubHead>
    <p>
      Bu konunun ekonomi ve teknoloji literatüründeki önemli kavramlarından biri vendor lock-in olarak
      bilinir. Türkçeye kabaca tedarikçiye veya sağlayıcıya bağımlı kalma şeklinde çevrilebilir. Bir
      kullanıcının başka bir sağlayıcıya geçmesi teknik, ekonomik veya operasyonel nedenlerle
      zorlaştığında bu bağımlılık ortaya çıkar.
    </p>
    <p>Bunun farklı nedenleri olabilir:</p>
    <DefList
      items={[
        {
          term: "Teknik bağımlılık",
          def: "Yazılımınız belirli bir sağlayıcının özel araçlarına ve arayüzlerine göre tasarlanmıştır.",
        },
        {
          term: "Veri bağımlılığı",
          def: "Verileriniz farklı sisteme kolayca aktarılamayan formatlarda tutulmaktadır.",
        },
        {
          term: "Ekonomik bağımlılık",
          def: "Başka sisteme geçmenin maliyeti, mevcut sağlayıcıyla çalışmaya devam etmekten daha yüksek olabilir.",
        },
        {
          term: "Kurumsal bağımlılık",
          def: "Çalışanlarınız, süreçleriniz ve eğitimleriniz mevcut sağlayıcıya göre düzenlenmiştir.",
        },
        {
          term: "Operasyonel bağımlılık",
          def: "Başka sağlayıcıya geçiş sırasında iş süreçlerinizin durması veya hizmet kalitesinin düşmesi mümkündür.",
        },
      ]}
    />
    <p>
      OECD, bulut altyapısında yüksek geçiş maliyetleri, ölçek ekonomileri, mevcut ekosistemlere
      bağımlılık ve hizmetlerin paketlenmesi gibi unsurların rekabeti zorlaştırabileceğine dikkat
      çekiyor. Ayrıca yapay zekâ pazarında bu risklerin birden fazla teknoloji katmanında ortaya
      çıkabileceğini belirtiyor.
    </p>

    <SubHead>3.5. Bu bağımlılık sadece şirketleri mi etkiler?</SubHead>
    <p>
      Hayır. Bir insanın kişisel yaşamını düşünelim. Eğitim belgeleri, fotoğrafları, iş dosyaları,
      kişisel kayıtları ve günlük iletişimi farklı dijital hizmetlerde tutuluyor olabilir. Bu hizmetler
      arasında geçiş yapmak zorlaştığında kişi de belirli platformlara bağımlı hâle gelebilir.
    </p>
    <p>
      Ancak bireysel kullanıcı ile büyük bir işletmenin bağımlılık düzeyi aynı değildir. Bir birey
      birkaç hizmetten vazgeçerek başka platforma geçebilirken, bir şirketin milyonlarca müşteriyi,
      çalışanı ve veri akışını taşıması gerekebilir. Bu nedenle bağımlılık ve geçiş maliyeti yalnızca
      teknolojinin fiyatıyla değil, o teknolojinin hayatın ne kadarına yerleştiğiyle de ölçülmelidir.
    </p>

    <SubHead>3.6. Bugün bu problemi çözmek için neler yapılıyor?</SubHead>
    <p>
      Avrupa Birliği&apos;nin Veri Yasası burada incelenmeye değer somut bir örnektir. Yasa, bulut ve
      diğer veri işleme hizmetlerinde sağlayıcı değiştirmeyi kolaylaştırmayı hedefliyor. Bunun için
      veri aktarımını, teknik birlikte çalışabilirliği ve sözleşme şeffaflığını ele alıyor.
    </p>
    <p>
      Önemli bir ayrıntı da şu: 12 Ocak 2027 itibarıyla kapsama giren sağlayıcıların geçiş işlemleri
      ve veri aktarımı için geçiş ücretlerini tamamen kaldırması gerekiyor. Kasım 2026 itibarıyla ise
      üç yıllık geçiş dönemi henüz tamamlanmadığından belirli maliyetler için ücret alınabilen dönem
      devam ediyor.
    </p>
    <p>
      Bu örnek, ekonomik bağımlılığın yalnızca şirketler arasındaki ticari bir mesele olmadığını,
      kamu politikalarının da konusu olduğunu gösteriyor. Ancak Avrupa Birliği&apos;ndeki bu düzenleme
      Türkiye&apos;de kendiliğinden aynı kapsamda uygulanıyor anlamına gelmez.
    </p>

    <SubHead>3.7. Bir sağlayıcıya bağımlı kalmamak mümkün mü?</SubHead>
    <p>
      Tamamen bağımsız olmak her zaman ekonomik veya teknik açıdan mantıklı olmayabilir. Küçük bir
      şirketin kendi veri merkezini kurması yerine bulut hizmeti satın alması çok daha verimli
      olabilir. Önemli olan her şeyi kendin üretmek değil, gerektiğinde alternatiflere geçebilme
      kapasitesini korumaktır.
    </p>
    <p>Bunun için araştırılabilecek bazı yöntemler vardır:</p>
    <Bullets
      items={[
        "Açık ve yaygın veri formatları kullanmak.",
        "Tek bir sağlayıcıya bağımlı olmayan yazılım mimarileri geliştirmek.",
        "Kritik verilerin yedeklerini tutmak.",
        "Alternatif hizmet sağlayıcılarını önceden belirlemek.",
        "Sözleşmelerde geçiş, veri aktarımı ve hizmet sonlandırma koşullarını açıkça düzenlemek.",
        "Birden fazla model veya altyapıyla çalışabilecek sistemler kurmak.",
      ]}
    />
    <p>
      Bunlar her zaman sorunsuz veya ucuz çözümler değildir. Birden fazla sağlayıcı kullanmak yönetim
      ve güvenlik maliyetlerini artırabilir. Dolayısıyla amaç bütün hizmetleri aynı anda farklı
      şirketlere dağıtmak değil, tek bir sağlayıcının kararlarının kullanıcıyı çaresiz bırakmasını
      önleyecek seçenekleri değerlendirmektir.
    </p>

    <SubHead>3.8. Gelecekte bu mesele ne kadar önemli olabilir?</SubHead>
    <p>
      2035 yılında bir şirketin üretim sisteminin, kullandığı yapay zekâ modelinin sağlayıcısına ne
      ölçüde bağımlı olduğunu düşünelim. Şirketin kendi fabrikası, çalışanları ve müşterileri vardır.
      Fakat kullandığı model hizmet dışı bırakılırsa üretim planlaması aksayabilir.
    </p>
    <p>
      Daha gelişmiş bir senaryoda şirketin kullandığı yapay zekâ, tedarik zincirinden müşteri
      taleplerine kadar birçok süreci yönetiyor olabilir. Bu sistemin değişmesi yalnızca yazılım
      değiştirmek anlamına gelmeyebilir; fabrikanın işleyişini yeniden tasarlamak gerekebilir.
    </p>
    <p>
      Böyle bir gelecekte sağlayıcı değiştirebilme hakkı, basit bir teknolojik tercih olmaktan çıkarak
      işletmelerin ekonomik bağımsızlığının bir parçası hâline gelebilir. Ancak burada da bir denge
      var: Sağlayıcıların güvenlik, kötüye kullanım ve teknik sürdürülebilirlik gerekçeleriyle bazı
      erişim sınırlamaları koyabilmesi gerekir. Kullanıcı özgürlüğü ile hizmet sağlayıcının meşru
      güvenlik sorumlulukları birlikte değerlendirilmelidir.
    </p>

    <SubHead>3.9. Araştırmamız gereken temel mesele</SubHead>
    <Numbered
      items={[
        "Bir şirket, müşterilerinin hizmet sağlayıcı değiştirebilmesini zorlaştıracak teknik sistemler kurabilir mi?",
        "Kritik dijital hizmetlere erişimin kesilmesi durumunda kullanıcıların ne tür güvenceleri olmalı?",
        "Veri taşınabilirliği tek başına başka bir sağlayıcıya geçmek için yeterli midir?",
        "Yapay zekâ modellerinin ve yazılım hizmetlerinin birbiriyle uyumlu çalışması için ortak standartlar gerekli midir?",
        "Sağlayıcıların fiyat ve kullanım koşullarını değiştirme yetkisi hangi sınırlar içinde olmalı?",
        "Güvenlik gerekçesiyle erişimin kısıtlanması ile rekabeti engelleyen uygulamalar nasıl ayrılmalı?",
        "Gelecekte bir işletmenin tek bir teknoloji sağlayıcısına bağımlı kalmaması nasıl güvence altına alınabilir?",
      ]}
    />
  </>,

  // Bölüm 04 — Genel değerlendirme
  <>
    <p>
      Üç soruyu birlikte değerlendirdiğimizde önemli bir sonuç ortaya çıkıyor. Ekonomik güç yalnızca
      bir kaynağa sahip olmakla oluşmaz. O kaynağın kullanılmasını, yönetilmesini, başkalarına
      açılmasını ve değiştirilmesini belirleme kapasitesi de ekonomik gücün bir parçasıdır.
    </p>
    <p>
      Gelecekte yapay zekâ, veri merkezleri, çipler, enerji altyapısı ve robotik sistemler ekonominin
      temel unsurları hâline geldikçe bu ayrım daha önemli olabilir. Bununla birlikte teknoloji
      üzerindeki kontrolün tek bir aktörde toplanması kaçınılmaz değildir. Rekabet, açık standartlar,
      alternatif altyapılar, kamu yatırımları ve farklı mülkiyet modelleri bu yapıyı değiştirebilir.
    </p>
    <p>
      Henüz hangi modelin daha iyi sonuç vereceğine karar vermiyoruz. Önce bu modellerin nasıl
      çalıştığını ve hangi koşullarda başarılı veya başarısız olduğunu anlamalıyız.
    </p>

    <SubHead>Bu bölümden çıkardığımız temel kavramlar</SubHead>
    <DataTable
      head={["Kavram", "Araştırmadaki önemi"]}
      rows={[
        ["Mülkiyet", "Kaynağın hukuki sahibi kim?"],
        ["Kontrol", "Kullanım kararlarını kim veriyor?"],
        ["Erişim", "Kimler teknolojiyi kullanabiliyor?"],
        ["Veri taşınabilirliği", "Kullanıcı kendi verisini taşıyabiliyor mu?"],
        ["Birlikte çalışabilirlik", "Farklı sistemler birlikte çalışabiliyor mu?"],
        ["Sağlayıcı bağımlılığı", "Başka sisteme geçmek ne kadar zor?"],
        [
          "Pazar gücü",
          "Bir aktör diğerlerinin ekonomik seçeneklerini ne ölçüde etkileyebiliyor?",
        ],
      ]}
    />

    <SubHead>Henüz cevaplamadığımız en önemli sorular</SubHead>
    <p>Bu bölümde şu sorulara özellikle kesin cevap vermedik:</p>
    <Numbered
      items={[
        "Geleceğin kritik üretim altyapılarının ne kadarı özel mülkiyette, ne kadarı kamusal veya ortak mülkiyette olmalı?",
        "Bazı teknolojilere erişim temel bir ekonomik gereksinim olarak kabul edilmeli mi?",
        "Teknolojik altyapıyı kontrol eden şirketlerin ekonomik güçleri nasıl sınırlandırılabilir?",
        "Kamuya ait teknoloji altyapısı kurmak hangi durumlarda verimli olabilir?",
        "İnsanlar ve işletmeler ekonomik bağımsızlıklarını korumak için hangi teknolojik haklara sahip olmalı?",
      ]}
    />
    <p>Bunların cevapları sonraki bölümlerin araştırma konusudur.</p>
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
      {/* Giriş */}
      <section aria-label="Giriş" className="scroll-mt-28 space-y-8">
        <div className="space-y-4 border-b border-zinc-900 pb-6">
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
            Giriş
          </span>
          <h2
            className={`${displayFontClass} text-3xl leading-tight tracking-wide text-ink-strong uppercase md:text-4xl`}
          >
            Bir şeyin sahibi olmak, onu kontrol etmek anlamına mı gelir?
          </h2>
        </div>
        <div className={bodyText}>
          <p>
            Bir fabrikayı satın aldığınızı düşünün. Fabrikanın binaları, makineleri ve ekipmanları
            sizin mülkiyetinizdedir. Ancak üretimi gerçekleştirmek için gerekli yazılım başka bir
            şirkete aittir. Enerji tedarikinizi başka bir şirket sağlar. Ürünlerinizi satabilmek için
            başka bir platforma ihtiyaç duyarsınız. Fabrikanın sahibi olmanıza rağmen üretiminizin
            devamlılığı üzerinde tek başınıza karar veremeyebilirsiniz.
          </p>
          <p>
            Şimdi aynı örneği geleceğe taşıyalım. 2035 yılında bir şirketin yüzlerce robotla çalışan,
            büyük ölçüde otomatikleştirilmiş bir fabrikası olduğunu düşünelim. Üretimde kullanılan
            yapay zekâ modeli başka bir şirket tarafından geliştirilmiş olsun. Fabrikanın robotları,
            üretim planlaması ve lojistik sistemi bu modele bağlı çalışsın.
          </p>
          <p>
            Bu durumda fabrikanın sahibi kimdir? Fabrikayı kim yönetmektedir? Üretimin devam edip
            etmeyeceğine kim karar verebilir? Bu soruların cevapları aynı olmayabilir.
          </p>
          <p>
            Dolayısıyla geleceğin ekonomisini anlayabilmek için mülkiyet, kontrol ve erişim
            kavramlarını birbirinden ayırmamız gerekiyor. Bir kaynağın sahibi olmak ile o kaynağın
            nasıl kullanılacağına karar verebilmek aynı şey değildir.
          </p>
        </div>
      </section>

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
