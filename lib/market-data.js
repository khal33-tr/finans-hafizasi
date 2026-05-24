export const windows = [
  ["d1", "1G"],
  ["d3", "3G"],
  ["w1", "1H"],
  ["w2", "2H"],
  ["d30", "30G"]
];

export const companies = [
  {
    ticker: "THYAO",
    name: "Türk Hava Yolları",
    sector: "Ulaştırma",
    description: "Küresel havacılık, yolcu trafiği ve yakıt maliyeti gelişmelerine duyarlı BIST şirketi."
  },
  {
    ticker: "TUPRS",
    name: "Tüpraş",
    sector: "Enerji",
    description: "Rafineri marjları, temettü kararları ve enerji fiyatlarıyla yakından izlenen sanayi şirketi."
  },
  {
    ticker: "SASA",
    name: "Sasa Polyester",
    sector: "Kimya",
    description: "Yatırım, kapasite artışı ve sermaye işlemleriyle yüksek yatırımcı ilgisi gören şirket."
  },
  {
    ticker: "HEKTS",
    name: "Hektaş",
    sector: "Tarım ve Kimya",
    description: "Tarım teknolojileri, bilanço ve sermaye işlemleriyle takip edilen şirket."
  },
  {
    ticker: "KCHOL",
    name: "Koç Holding",
    sector: "Holding",
    description: "Çeşitlendirilmiş iştirak yapısı nedeniyle BIST genel algısı için önemli gösterge."
  },
  {
    ticker: "SAHOL",
    name: "Sabancı Holding",
    sector: "Holding",
    description: "Finans, enerji ve sanayi iştirakleriyle çok sektörlü haber akışına sahip holding."
  },
  {
    ticker: "ASELS",
    name: "Aselsan",
    sector: "Savunma",
    description: "Sözleşme açıklamaları ve savunma sanayi gelişmeleriyle sık izlenen şirket."
  },
  {
    ticker: "EREGL",
    name: "Ereğli Demir Çelik",
    sector: "Demir Çelik",
    description: "Çelik fiyatları, temettü beklentisi ve küresel sanayi döngüsüyle takip edilir."
  },
  {
    ticker: "SISE",
    name: "Şişecam",
    sector: "Cam ve Kimya",
    description: "Küresel talep, enerji maliyeti ve kapasite yatırımları açısından izlenen şirket."
  },
  {
    ticker: "BIMAS",
    name: "BİM",
    sector: "Perakende",
    description: "Gıda enflasyonu, mağaza büyümesi ve tüketici harcamalarıyla ilişkili savunmacı hisse."
  },
  { ticker: "AKBNK", name: "Akbank", sector: "Bankacılık", description: "Faiz, kredi büyümesi ve banka bilançoları ile takip edilir." },
  { ticker: "GARAN", name: "Garanti BBVA", sector: "Bankacılık", description: "Banka karlılığı ve yabancı yatırımcı ilgisi açısından önemli hisse." },
  { ticker: "YKBNK", name: "Yapı Kredi", sector: "Bankacılık", description: "Kredi, mevduat ve sermaye yeterliliği haberleriyle izlenir." },
  { ticker: "ISCTR", name: "İş Bankası C", sector: "Bankacılık", description: "BIST bankacılık endeksi için ana takip hisselerinden biridir." },
  { ticker: "TCELL", name: "Turkcell", sector: "Telekom", description: "Telekom gelirleri, regülasyon ve temettü gündemiyle izlenir." },
  { ticker: "FROTO", name: "Ford Otosan", sector: "Otomotiv", description: "İhracat, üretim ve yatırım kararlarıyla takip edilen otomotiv şirketi." },
  { ticker: "TOASO", name: "Tofaş", sector: "Otomotiv", description: "Üretim anlaşmaları ve otomotiv pazarı verileriyle izlenir." },
  { ticker: "KONTR", name: "Kontrolmatik", sector: "Teknoloji ve Enerji", description: "Enerji teknolojileri ve sözleşme haberleriyle yüksek ilgi görür." },
  { ticker: "ASTOR", name: "Astor Enerji", sector: "Enerji Ekipmanları", description: "Sipariş, yatırım ve ihracat haberleriyle takip edilen şirket." },
  { ticker: "KOZAL", name: "Koza Altın", sector: "Madencilik", description: "Altın fiyatları, operasyon ve hukuki gelişmelerle izlenir." }
];

export const events = [
  {
    slug: "thyao-2024-ikinci-ceyrek-finansal-sonuclari",
    ticker: "THYAO",
    date: "2024-08-09",
    type: "Bilanço",
    title: "THYAO 2024 ikinci çeyrek finansal sonuçları",
    summary:
      "Şirket ikinci çeyrek finansal sonuçlarını açıkladı. Bu kayıt, açıklama sonrası standart zaman pencerelerindeki fiyat ve hacim tepkisini gösterir.",
    sourceLabel: "KAP bildirimi",
    sourceUrl: "https://www.kap.org.tr/",
    returns: { d1: 1.8, d3: 3.2, w1: 2.4, w2: -1.1, d30: 4.6 },
    bistRelative: 1.3,
    volumeMultiple: 1.7,
    sentiment: { positive: 42, neutral: 36, negative: 22 },
    note: "Veriler örnek MVP datasıdır; gerçek yayın öncesi kaynak ve fiyat serisi doğrulaması gerekir."
  },
  {
    slug: "tuprs-temettu-dagitim-karari",
    ticker: "TUPRS",
    date: "2024-03-28",
    type: "Temettü",
    title: "TUPRS temettü dağıtım kararı",
    summary:
      "Yönetim kurulunun kar payı dağıtım önerisi kamuya açıklandı. Kayıt, temettü kararından sonraki fiyat tepkisini arşivler.",
    sourceLabel: "KAP bildirimi",
    sourceUrl: "https://www.kap.org.tr/",
    returns: { d1: -0.9, d3: 0.6, w1: 1.4, w2: 3.8, d30: 5.1 },
    bistRelative: 2.0,
    volumeMultiple: 1.4,
    sentiment: { positive: 47, neutral: 40, negative: 13 },
    note: "Temettü ve fiyat düzeltmeleri gerçek veri sağlayıcıyla doğrulanmalıdır."
  },
  {
    slug: "asels-yeni-sozlesme-aciklamasi",
    ticker: "ASELS",
    date: "2024-05-17",
    type: "Sözleşme",
    title: "ASELS yeni sözleşme açıklaması",
    summary:
      "Şirket yeni bir iş ilişkisine dair kamuya açık duyuru paylaştı. Bu kayıt, sözleşme haberlerinin kısa ve orta vadeli etkisini izlemek için sınıflandırılır.",
    sourceLabel: "KAP bildirimi",
    sourceUrl: "https://www.kap.org.tr/",
    returns: { d1: 2.6, d3: 4.1, w1: 6.8, w2: 3.5, d30: 8.2 },
    bistRelative: 4.7,
    volumeMultiple: 2.3,
    sentiment: { positive: 58, neutral: 31, negative: 11 },
    note: "Sözleşme büyüklüğü, teslim takvimi ve gelir etkisi editör kontrolünden geçmelidir."
  }
];

export const tickers = companies.map((company) => company.ticker);
export const sampleEvents = events.map((event) => ({
  ...event,
  company: getCompany(event.ticker)?.name ?? event.ticker
}));

export function getCompany(ticker) {
  return companies.find((company) => company.ticker.toLowerCase() === ticker.toLowerCase());
}

export function getEventsByTicker(ticker) {
  return sampleEvents.filter((event) => event.ticker.toLowerCase() === ticker.toLowerCase());
}

export function getEventBySlug(slug) {
  return sampleEvents.find((event) => event.slug === slug);
}

export function formatReturn(value) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
}

export function returnClass(value) {
  return value >= 0 ? "positive" : "negative";
}
