// 81 Turkish cities
export const TURKISH_CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
].sort((a, b) => a.localeCompare(b, 'tr-TR'));

// Mapping to 10 generic telegram groups (placeholders)
export const REGION_LINKS: Record<string, string> = {
  marmara: "https://t.me/yeterla_marmara",
  ege: "https://t.me/yeterla_ege",
  akdeniz: "https://t.me/yeterla_akdeniz",
  icanadolu: "https://t.me/yeterla_icanadolu",
  karadeniz: "https://t.me/yeterla_karadeniz",
  doguanadolu: "https://t.me/yeterla_doguanadolu",
  guneydogu: "https://t.me/yeterla_guneydogu",
  istanbul: "https://t.me/yeterla_istanbul",
  ankara: "https://t.me/yeterla_ankara",
  izmir: "https://t.me/yeterla_izmir"
};

export function getRegionalLink(city: string): string {
  const normalizedCity = city.toLocaleLowerCase("tr-TR").trim();
  
  if (normalizedCity === "istanbul" || normalizedCity === "i̇stanbul") return REGION_LINKS.istanbul;
  if (normalizedCity === "ankara") return REGION_LINKS.ankara;
  if (normalizedCity === "izmir" || normalizedCity === "i̇zmir") return REGION_LINKS.izmir;
  
  if (["edirne", "kırklareli", "tekirdağ", "kocaeli", "sakarya", "yalova", "bursa", "balıkesir", "çanakkale", "bilecik"].includes(normalizedCity)) return REGION_LINKS.marmara;
  if (["manisa", "aydın", "denizli", "muğla", "afyonkarahisar", "kütahya", "uşak"].includes(normalizedCity)) return REGION_LINKS.ege;
  if (["antalya", "burdur", "isparta", "mersin", "adana", "hatay", "osmaniye", "kahramanmaraş"].includes(normalizedCity)) return REGION_LINKS.akdeniz;
  if (["eskişehir", "konya", "karaman", "aksaray", "niğde", "nevşehir", "yozgat", "kayseri", "kırşehir", "kırıkkale", "çankırı", "sivas"].includes(normalizedCity)) return REGION_LINKS.icanadolu;
  if (["bolu", "düzce", "zonguldak", "karabük", "bartın", "kastamonu", "sinop", "çorum", "amasya", "samsun", "tokat", "ordu", "giresun", "trabzon", "gümüşhane", "bayburt", "rize", "artvin"].includes(normalizedCity)) return REGION_LINKS.karadeniz;
  if (["ardahan", "kars", "ığdır", "erzurum", "erzincan", "tunceli", "bingöl", "muş", "ağrı", "bitlis", "van", "hakkari", "şırnak", "elazığ", "malatya"].includes(normalizedCity)) return REGION_LINKS.doguanadolu;
  if (["gaziantep", "kilis", "adıyaman", "şanlıurfa", "diyarbakır", "mardin", "batman", "siirt"].includes(normalizedCity)) return REGION_LINKS.guneydogu;

  return REGION_LINKS.marmara; 
}
