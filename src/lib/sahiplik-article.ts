export const SAHIPLIK_PATH = "/gelecek/sahiplik-ile-kontrol-arasindaki-fark";

export const ARTICLE = {
  title: "Sahiplik ile Kontrol Arasındaki Fark",
  kicker: "STRATEJİK ANALİZ // 002",
  fileNo: "DOSYA #02: TEKNOLOJİ VE GÜÇ",
  category: "Teknoloji ve Ekonomik Güç",
  readingTime: "14 dk",
  lastUpdated: "2026-11-06",
  lastUpdatedLabel: "06.11.2026",
  origin: "Yapay zekâdan destek alınarak yazılmıştır",
  originTone: "ai" as "human" | "ai",
  h1: { lead: "SAHİPLİK İLE", accent: "KONTROL ARASINDAKİ FARK" },
  description:
    "Mülkiyet, kontrol ve erişim kavramlarını birbirinden ayırarak; bir şirketin sahip olmadığı teknolojiyi nasıl kontrol edebildiğini, bir yapay zekâ modeline erişmenin hangi hakları verdiğini ve tedarikçiye bağımlılığın (lock-in) ekonomik özgürlüğü nasıl etkilediğini inceleyen araştırma dosyası.",
  keywords: [
    "sahiplik ve kontrol farkı",
    "mülkiyet ve kontrol",
    "erişim hakkı",
    "yapay zeka erişimi",
    "altyapı kontrolü",
    "tedarikçi bağımlılığı",
    "vendor lock-in",
    "veri taşınabilirliği",
    "dijital egemenlik",
    "ekonomik bağımsızlık",
  ],
};

export const SUMMARY = {
  eyebrow: "60 saniyede özet",
  title: "Bu dosyada ne var?",
  points: [
    "Bir şeyin sahibi olmak, onu kontrol etmek anlamına gelmez: mülkiyet, kontrol ve erişim ayrı şeylerdir.",
    "Bir şirket teknolojiye sahip olmadan da onu kontrol edebilir; altyapı, erişim ve ekosistem gücü yeterlidir.",
    "Bir yapay zekâ hizmetini kullanmak, o teknoloji üzerinde hak sahibi olmakla aynı şey değildir.",
    "Kendi verinizi başka bir sağlayıcıda tutmak, o veriyi istediğiniz an taşıyabileceğiniz anlamına gelmez.",
    "Sağlayıcıya bağımlılık (lock-in) fiyatı, erişimi ve kullanım koşullarını dışarıdan belirleyebilir.",
    "Ekonomik özgürlük; sahip olunan mülk kadar, kullanılan teknolojinin değiştirilebilirliğine de bağlıdır.",
  ],
};

export type ArticleSection = {
  /** Sayfa içi çapa kimliği */
  id: string;
  /** Yan menüde görünen kısa etiket */
  label: string;
  /** Bölüm başlığı (yapay zekâ botları ve arama motorları için soru metni) */
  heading: string;
  /** Yapılandırılmış veri (FAQPage) için soru */
  question: string;
  /** Yapılandırılmış veri (FAQPage) için kısa cevap */
  answer: string;
};

export const SECTIONS: ArticleSection[] = [
  {
    id: "q1",
    label: "Sahiplik ve kontrol nedir?",
    heading: "Bir şirketin sahibi olmadığı bir teknolojiyi kontrol etmesi mümkün mü?",
    question: "Bir şirketin sahibi olmadığı bir teknolojiyi kontrol etmesi mümkün mü?",
    answer:
      "Evet. Sahiplik hukuken tanınan mülkiyet hakkı, kontrol ise bir varlığın nasıl kullanılacağına karar verebilme gücüdür. Bir şirket altyapıyı, erişimi veya ekosistem standartlarını elinde tutarak sahibi olmadığı teknoloji üzerinde kontrol sağlayabilir. Bu nedenle geleceğin ekonomisinde güç yalnızca mülkiyetle değil, kullanımı yönetme kapasitesiyle de tanımlanır.",
  },
  {
    id: "q2",
    label: "Erişim ne kadar hak verir?",
    heading:
      "Bir yapay zekâ modeline erişim sağlayan kişi, o teknoloji üzerinde ne kadar hakka sahiptir?",
    question:
      "Bir yapay zekâ modeline erişim sağlayan kişi, o teknoloji üzerinde ne kadar hakka sahiptir?",
    answer:
      "Bir teknolojiyi kullanabilmek, üzerinde hak sahibi olmakla aynı şey değildir. Kullanıcı kullanım, erişim veya veri taşınabilirliği hakkına sahip olabilir; ancak mülkiyeti ve işletme kontrolünü genellikle elinde tutmaz. Hizmet üzerinden erişim, API kullanımı ve modeli indirerek çalıştırma farklı düzeylerde kontrol sağlar; ayrıca açık ağırlıklı modeller sağlayıcı bağımlılığını azaltabilir ama tek başına ekonomik bağımsızlık getirmez.",
  },
  {
    id: "q3",
    label: "Erişim kapatılabilir mi?",
    heading:
      "Bir şirket erişimi kapatabilir, fiyatı değiştirebilir veya kullanım koşullarını tek taraflı belirleyebilir mi?",
    question:
      "Bir şirket erişimi kapatabilir, fiyatı değiştirebilir veya kullanım koşullarını tek taraflı belirleyebilir mi?",
    answer:
      "Sözleşme, tüketici hakları, rekabet hukuku ve veri koruma düzenlemeleri bu yetkileri sınırlasa da sağlayıcılar bazı koşullarda erişimi kısıtlayabilir, fiyatı değiştirebilir ve kullanım koşullarını güncelleyebilir. Bu da tedarikçiye bağımlılık (vendor lock-in) yaratır. Avrupa Birliği Veri Yasası gibi düzenlemeler sağlayıcı değiştirmeyi ve veri aktarımını kolaylaştırmayı hedefler; ancak asıl korunma, alternatiflere geçebilme kapasitesini korumaktır.",
  },
  {
    id: "q4",
    label: "Genel değerlendirme",
    heading: "Bölümün genel değerlendirmesi",
    question: "Sahiplik, kontrol ve erişim arasındaki fark bize ne anlatıyor?",
    answer:
      "Ekonomik güç yalnızca bir kaynağa sahip olmakla oluşmaz; o kaynağın kullanılmasını, yönetilmesini, başkalarına açılmasını ve değiştirilmesini belirleme kapasitesi de gücün parçasıdır. Yapay zekâ, veri merkezleri, çipler ve enerji altyapısı ekonominin temeli hâline geldikçe bu ayrım önem kazanır. Kontrolün tek aktörde toplanması kaçınılmaz değildir; rekabet, açık standartlar, alternatif altyapılar ve kamu yatırımları bu yapıyı değiştirebilir.",
  },
];
