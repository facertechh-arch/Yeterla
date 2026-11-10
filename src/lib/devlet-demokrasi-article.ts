export const DEVLET_PATH = "/gelecek/devlet-ve-demokrasi";

export const ARTICLE = {
  title: "Devlet ve Demokrasinin Geleceği",
  kicker: "STRATEJİK ANALİZ // 003",
  fileNo: "DOSYA #03: DEVLET VE DEMOKRASİ",
  category: "Devlet ve Demokrasi",
  readingTime: "15 dk",
  lastUpdated: "2026-11-10",
  lastUpdatedLabel: "10.11.2026",
  origin: "Yapay zekâdan destek alınarak yazılmıştır",
  originTone: "ai" as "human" | "ai",
  h1: { lead: "DEVLET VE DEMOKRASİNİN", accent: "GELECEĞİ" },
  description:
    "Yapay zekâ, dijital teknolojiler ve gözetimin devletin işleyişini ve demokrasiyi nasıl dönüştürebileceğini; veri-gözetim dengesi, kamu yönetiminde yapay zekâ, vatandaş katılımı, meşruiyetin kaynağı ve özgürlük-güvenlik dengesi üzerinden inceleyen 6 soruluk araştırma dosyası.",
  keywords: [
    "devlet ve demokrasinin geleceği",
    "teknoloji ve demokrasi",
    "dijital gözetim",
    "veri toplama ve mahremiyet",
    "kamu yönetiminde yapay zeka",
    "yapay zeka karar verme",
    "vatandaş katılımı",
    "katılımcı bütçeleme",
    "devlet meşruiyeti",
    "hukukun üstünlüğü",
    "özgürlük ve güvenlik dengesi",
    "gelecek analizleri",
  ],
};

export const SUMMARY = {
  eyebrow: "60 saniyede özet",
  title: "Bu dosyada ne var?",
  points: [
    "Teknoloji demokrasiyi daha katılımcı ve şeffaf yapabilir; ama yanlış bilgi, dijital eşitsizlik ve manipülasyon riskini de büyütür.",
    "Devletin güvenlik için veri toplama yetkisi sınırsız olamaz; güvenlik ile mahremiyet arasında hukuki bir denge gerekir.",
    "Kamu yönetiminde yapay zekâ hız ve verimlilik sağlar; ancak insanların haklarını etkileyen kararlarda insan denetimi şarttır.",
    "Katılım yalnızca oy vermek değildir: dijital danışma, vatandaş meclisleri ve katılımcı bütçe gibi yolların gerçek bir etkisi olmalıdır.",
    "Bir devletin meşruiyeti sadece seçim kazanmak değil; hukukun üstünlüğü, temel haklar ve hesap verebilirliktir.",
    "Güvenlik uğruna bütün özgürlükleri kısmak çözüm değildir; müdahaleler hukuka uygun, gerekli, ölçülü ve denetlenebilir olmalıdır.",
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
    label: "Demokrasi teknolojiye ayak uydurur mu?",
    heading: "Bugünkü demokratik sistemler teknolojik dönüşüme ayak uydurabilecek mi?",
    question: "Bugünkü demokratik sistemler teknolojik dönüşüme ayak uydurabilecek mi?",
    answer:
      "Teknoloji demokrasiyi daha katılımcı ve şeffaf hâle getirebilir. Ancak yanlış bilgi, dijital eşitsizlik ve manipülasyon gibi sorunlar da yaratabilir. Geleceğin demokratik sistemi teknolojiyi kullanmayı öğrenirken bu riskleri de yönetebilmelidir.",
  },
  {
    id: "q2",
    label: "Veri ve gözetim gücü ne olmalı?",
    heading: "Devletlerin vatandaşlar üzerindeki veri ve gözetim gücü ne kadar olmalı?",
    question: "Devletlerin vatandaşlar üzerindeki veri ve gözetim gücü ne kadar olmalı?",
    answer:
      "Devletin vatandaşları korumak için belirli bilgileri toplaması gerekebilir. Ancak bu yetki sınırsız olmamalıdır. Güvenlik sağlanırken insanların özel hayatı, düşünceleri ve özgürlükleri de korunmalıdır.",
  },
  {
    id: "q3",
    label: "Yapay zekâ karar verici olmalı mı?",
    heading: "Yapay zekâ kamu yönetiminde karar verici olarak kullanılmalı mı?",
    question: "Yapay zekâ kamu yönetiminde karar verici olarak kullanılmalı mı?",
    answer:
      "Yapay zekâ kamu hizmetlerini hızlandırabilir ve devletin iş yükünü azaltabilir. Ancak özellikle insanların haklarını ve hayatlarını etkileyen kararlarda yapay zekânın hatalarını denetleyecek, hesap verecek ve gerektiğinde kararı değiştirebilecek bir insan mekanizması bulunmalıdır.",
  },
  {
    id: "q4",
    label: "Katılım nasıl artırılır?",
    heading: "Vatandaşlar siyasi kararlara daha doğrudan nasıl katılabilir?",
    question: "Vatandaşlar siyasi kararlara daha doğrudan nasıl katılabilir?",
    answer:
      "Vatandaşların siyasi kararlara katılımı yalnızca seçimlerle sınırlı kalmayabilir. Dijital danışmalar, vatandaş meclisleri, katılımcı bütçeler ve yerel toplantılar bu katılımı artırabilir. Ancak katılımın gerçek bir etkisi olmalı ve toplumun farklı kesimlerini kapsamalıdır.",
  },
  {
    id: "q5",
    label: "Meşruiyetin kaynağı ne olmalı?",
    heading: "Bir devletin meşruiyetinin temel kaynağı ne olmalı?",
    question: "Bir devletin meşruiyetinin temel kaynağı ne olmalı?",
    answer:
      "Bir devletin meşruiyeti yalnızca seçim kazanmasına veya ekonomik başarı sağlamasına bağlı olmamalıdır. Halkın iradesi, hukukun üstünlüğü, temel haklar ve hesap verebilirlik birlikte değerlendirilmelidir.",
  },
  {
    id: "q6",
    label: "Özgürlük ve güvenlik dengesi",
    heading: "Gelecekte bireysel özgürlük ile toplumsal güvenlik nasıl dengelenmeli?",
    question: "Gelecekte bireysel özgürlük ile toplumsal güvenlik nasıl dengelenmeli?",
    answer:
      "Güvenlik, insanların özgür yaşayabilmesi için gereklidir. Ancak güvenlik gerekçesiyle bütün özgürlükleri sınırlandırmak kabul edilebilir bir çözüm değildir. Devletin müdahaleleri hukuka uygun, gerekli, ölçülü ve denetlenebilir olmalıdır.",
  },
];
