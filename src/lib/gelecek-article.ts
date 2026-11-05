export const GELECEK_BASE = "/gelecek";

export const ARTICLE_PATH = "/gelecek/ekonomi-ve-calisma-hayatinin-gelecegi";

export const ARTICLE = {
  title: "Yapay Zeka ve İşin Geleceği",
  kicker: "STRATEJİK ANALİZ // 001",
  fileNo: "DOSYA #01: EKONOMİ",
  category: "Ekonomi",
  readingTime: "8 dk",
  lastUpdated: "2026-11-06",
  lastUpdatedLabel: "06.11.2026",
  description:
    "Yapay zeka ve otomasyonun önümüzdeki 10-20 yılda meslekleri, insan emeğinin değerini, çalışma saatlerini ve ekonomik bağımsızlığı nasıl dönüştüreceğine dair 6 soruluk stratejik analiz.",
  keywords: [
    "yapay zeka ve işin geleceği",
    "otomasyon hangi meslekleri etkiler",
    "insan emeğinin değeri",
    "evrensel temel gelir",
    "çalışma saatlerinin azaltılması",
    "ekonomik bağımsızlık",
    "gelecek analizleri",
  ],
};

export const SUMMARY = {
  eyebrow: "60 saniyede özet",
  title: "Bu dosyada ne var?",
  points: [
    "Yapay zeka düz bir çizgi değil, kartopu gibi büyür: 5 yılı değil 10-20 yılı planlamak gerekir.",
    "Ofis işleri, yazılımın büyük bölümü ve mühendisliğin çoğu daralır; doktorluk ve öğretmenlik sürer ama talep düşer.",
    "Zanaat ve el işi 'tercih edilen' bir değere dönüşür; sanat, eğlence ve kültür üretimi öne çıkar.",
    "Üretim artsa da zenginlik eşit dağılmaz; tek çıkış örgütlenme ve regülasyon mücadelesidir.",
  ],
};

export type ArticleSection = {
  /** Sayfa içi çapa kimliği */
  id: string;
  /** Yan menüde görünen kısa etiket */
  label: string;
  /** Bölüm başlığı (yapay zeka botları ve arama motorları için soru metni) */
  heading: string;
  /** Yapılandırılmış veri (FAQPage) için soru */
  question: string;
  /** Yapılandırılmış veri (FAQPage) için kısa cevap */
  answer: string;
};

export const SECTIONS: ArticleSection[] = [
  {
    id: "q1",
    label: "Hangi meslekler dönüşecek?",
    heading:
      "Yapay zeka ve otomasyon önümüzdeki 10-20 yılda hangi meslekleri dönüştürebilir?",
    question:
      "Yapay zeka ve otomasyon önümüzdeki 10-20 yılda hangi meslekleri dönüştürebilir?",
    answer:
      "Ofis işleri, yazılımın büyük bölümü ve mühendisliğin önemli bir kısmı otomasyondan güçlü şekilde etkilenecek. Doktorluk ve öğretmenlik gibi meslekler sürecek ancak özel ders gibi alanlarda talep azalabilir. Zanaat, el işi ve sanat ise yok olmayıp tercih edilen bir değere dönüşebilir.",
  },
  {
    id: "q2",
    label: "Eski çalışanlara ne olacak?",
    heading:
      "Yeni meslekler ortaya çıksa bile, eski mesleklerin çalışanları ne olacak?",
    question:
      "Yeni meslekler ortaya çıksa bile, eski mesleklerin çalışanları ne olacak?",
    answer:
      "Basit iş gücü, zanaat, sanat ve eğlence alanlarına yönelebilirler. Evrensel temel gelir sağlanmazsa tablo sertleşebilir: devletin herkesi bir işe bağlama çabası, artan askerlik oranları ve büyüyen jeopolitik gerilim riski doğar.",
  },
  {
    id: "q3",
    label: "İnsan emeğinin değeri",
    heading: "İnsan emeğinin ekonomik değeri nasıl değişebilir?",
    question: "İnsan emeğinin ekonomik değeri nasıl değişebilir?",
    answer:
      "Nüfus düşmezse insan emeğinin ekonomik değeri düşer. Masa başı işleri yapay zekaya geçtiği için herkesin yöneldiği yeni alanların da değeri azalır. Sanat, zanaat ve uzay kolonizasyonu gibi alanlar istisna olabilir.",
  },
  {
    id: "q4",
    label: "Üretim ve zenginlik",
    heading: "Üretim artarken neden herkes aynı ölçüde zenginleşmeyebilir?",
    question: "Üretim artarken neden herkes aynı ölçüde zenginleşmeyebilir?",
    answer:
      "Üretimi elinde tutan güç tekelleştiği için artan üretim herkese eşit yansımaz. Yapay zekayı kamuya mal etmek teoride mümkün görünse de jeopolitik rekabet, sermaye yapısı ve hızın maliyeti bunu pratikte çok zorlaştırır.",
  },
  {
    id: "q5",
    label: "Çalışma saatleri",
    heading: "Çalışma saatlerinin azaltılması ekonomik olarak mümkün olabilir mi?",
    question: "Çalışma saatlerinin azaltılması ekonomik olarak mümkün olabilir mi?",
    answer:
      "Yapay zeka verimliliği artırırsa çalışma süresi kârlılıktan ödün vermeden kısalabilir. Ancak insan emeği ucuzladıkça geçinmek için daha fazla çalışmak gerekebilir; bu da köleliğe benzer bir zorunluluk doğurabilir.",
  },
  {
    id: "q6",
    label: "Ekonomik bağımsızlık",
    heading:
      "Gelecekte bir insanın ekonomik bağımsızlığa sahip olması için neye ihtiyacı olacak?",
    question:
      "Gelecekte bir insanın ekonomik bağımsızlığa sahip olması için neye ihtiyacı olacak?",
    answer:
      "Örgütlenme ve baskı ile haklar korunur ve şirketler regüle edilirse insan kendi ülkesinde egemenliğini sürdürebilir. Aksi halde vergi dengesi bozuldukça devletin bireyi umursama sebebi azalır. Kitlesel çözüm mücadele etmek ve birlikte hareket etmektir.",
  },
];
