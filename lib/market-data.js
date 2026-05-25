import candidateEvents from "@/data/candidate-events.json";

export const windows = [
  ["d1", "1G"],
  ["d3", "3G"],
  ["w1", "1H"],
  ["w2", "2H"],
  ["d30", "30G"]
];

export const longMonitoringWindows = [
  ["d90", "90G"],
  ["d180", "180G"],
  ["y1", "1Y"]
];

export const eventCategories = {
  earnings: "Bilanço",
  dividend: "Temettü",
  capital_increase: "Sermaye işlemi",
  contract: "Sözleşme",
  investment: "Yatırım",
  regulation: "Regülasyon",
  legal_penalty: "Dava veya ceza",
  management_change: "Yönetim",
  macro_sector: "Makro/sektör"
};

export const verificationStatuses = {
  sample: {
    label: "Örnek veri",
    tone: "muted"
  },
  candidate: {
    label: "Aday kayıt",
    tone: "amber"
  },
  review: {
    label: "Editör kontrolünde",
    tone: "amber"
  },
  verified: {
    label: "Doğrulanmış",
    tone: "green"
  }
};

export const dataStatuses = {
  sample: {
    label: "Örnek oranlar",
    tone: "muted",
    description: "Bu karttaki oranlar MVP arayüzünü göstermek içindir; gerçek fiyat serisi bekleniyor."
  },
  source_found: {
    label: "Kaynak bulundu",
    tone: "amber",
    description: "Birincil KAP kaynağı bulundu; fiyat, hacim ve BIST 100 kıyası için lisanslı veri bekleniyor."
  },
  awaiting_price_data: {
    label: "Fiyat verisi bekleniyor",
    tone: "amber",
    description: "Lisansı ve kaynağı doğrulanmış fiyat, hacim ve düzeltilmiş kapanış serisi bekleniyor."
  },
  awaiting_future_window: {
    label: "Pencere oluşmadı",
    tone: "amber",
    description: "İleri pencere tarihi henüz gelmediği için hesap tamamlanmadı."
  },
  calculated: {
    label: "Hesaplandı",
    tone: "green",
    description: "Fiyat pencereleri hesaplandı; editör kontrolü beklenir."
  },
  verified: {
    label: "Doğrulandı",
    tone: "green",
    description: "Kaynak, fiyat serisi ve hesap çıktısı tekrar üretilebilir durumda."
  }
};

export const sourceTypeLabels = {
  kap: "KAP",
  company_ir: "Şirket IR",
  bist: "Borsa İstanbul",
  spk: "SPK",
  news: "Haber kaynağı",
  data_provider: "Piyasa verisi"
};

export const companies = [
  {
    ticker: "THYAO",
    name: "Türk Hava Yolları",
    sector: "Ulaştırma",
    priority: 1,
    description: "Küresel havacılık, yolcu trafiği ve yakıt maliyeti gelişmelerine duyarlı BIST şirketi.",
    watchReason: "Yüksek yatırımcı ilgisi, bilanço duyarlılığı ve güçlü haber akışı.",
    eventTargets: ["Bilanço", "Trafik verisi", "Yakıt ve filo gelişmeleri"]
  },
  {
    ticker: "TUPRS",
    name: "Tüpraş",
    sector: "Enerji",
    priority: 2,
    description: "Rafineri marjları, temettü kararları ve enerji fiyatlarıyla yakından izlenen sanayi şirketi.",
    watchReason: "Temettü, rafineri marjı ve emtia döngüsü etkileri net izlenebilir.",
    eventTargets: ["Temettü", "Bilanço", "Rafineri marjı"]
  },
  {
    ticker: "ASELS",
    name: "Aselsan",
    sector: "Savunma",
    priority: 3,
    description: "Sözleşme açıklamaları ve savunma sanayi gelişmeleriyle sık izlenen şirket.",
    watchReason: "Sözleşme açıklamaları fiyat ve hacim tepkisi için iyi örnekler üretir.",
    eventTargets: ["Sözleşme", "Bilanço", "Sipariş büyüklüğü"]
  },
  {
    ticker: "KCHOL",
    name: "Koç Holding",
    sector: "Holding",
    priority: 4,
    description: "Çeşitlendirilmiş iştirak yapısı nedeniyle BIST genel algısı için önemli gösterge.",
    watchReason: "Holding iskonto algısı ve iştirak haberleri geniş kullanıcı ilgisi çeker.",
    eventTargets: ["Bilanço", "İştirak gelişmesi", "Temettü"]
  },
  {
    ticker: "SAHOL",
    name: "Sabancı Holding",
    sector: "Holding",
    priority: 5,
    description: "Finans, enerji ve sanayi iştirakleriyle çok sektörlü haber akışına sahip holding.",
    watchReason: "Banka, enerji ve sanayi etkilerini tek hisse altında izleme imkanı verir.",
    eventTargets: ["Bilanço", "İştirak gelişmesi", "Portföy değişimi"]
  },
  {
    ticker: "EREGL",
    name: "Ereğli Demir Çelik",
    sector: "Demir çelik",
    priority: 6,
    description: "Çelik fiyatları, temettü beklentisi ve küresel sanayi döngüsüyle takip edilir.",
    watchReason: "Temettü ve küresel çelik döngüsü nedeniyle geçmiş reaksiyon analizi değerlidir.",
    eventTargets: ["Temettü", "Bilanço", "Emtia etkisi"]
  },
  {
    ticker: "SISE",
    name: "Şişecam",
    sector: "Cam ve kimya",
    priority: 7,
    description: "Küresel talep, enerji maliyeti ve kapasite yatırımları açısından izlenen şirket.",
    watchReason: "Yatırım ve enerji maliyeti haberleri piyasa tepkisi açısından açıklayıcıdır.",
    eventTargets: ["Yatırım", "Bilanço", "Enerji maliyeti"]
  },
  {
    ticker: "BIMAS",
    name: "BİM",
    sector: "Perakende",
    priority: 8,
    description: "Gıda enflasyonu, mağaza büyümesi ve tüketici harcamalarıyla ilişkili savunmacı hisse.",
    watchReason: "Perakende ve enflasyon algısı bireysel yatırımcı için anlaşılır bir örnek sunar.",
    eventTargets: ["Bilanço", "Mağaza büyümesi", "Regülasyon"]
  },
  {
    ticker: "AKBNK",
    name: "Akbank",
    sector: "Bankacılık",
    priority: 9,
    description: "Faiz, kredi büyümesi ve banka bilançoları ile takip edilir.",
    watchReason: "Bankacılık endeksi ve faiz beklentileriyle güçlü karşılaştırma zemini verir.",
    eventTargets: ["Bilanço", "Sermaye yeterliliği", "Regülasyon"]
  },
  {
    ticker: "GARAN",
    name: "Garanti BBVA",
    sector: "Bankacılık",
    priority: 10,
    description: "Banka karlılığı ve yabancı yatırımcı ilgisi açısından önemli hisse.",
    watchReason: "Yabancı yatırımcı algısı ve banka bilançosu tepkisi için izlenir.",
    eventTargets: ["Bilanço", "Kredi büyümesi", "Regülasyon"]
  },
  {
    ticker: "YKBNK",
    name: "Yapı Kredi",
    sector: "Bankacılık",
    priority: 11,
    description: "Kredi, mevduat ve sermaye yeterliliği haberleriyle izlenir.",
    watchReason: "Banka haberlerinin farklı vadelerdeki fiyat etkisini izlemek için kullanışlıdır.",
    eventTargets: ["Bilanço", "Sermaye yeterliliği", "Regülasyon"]
  },
  {
    ticker: "ISCTR",
    name: "İş Bankası C",
    sector: "Bankacılık",
    priority: 12,
    description: "BIST bankacılık endeksi için ana takip hisselerinden biridir.",
    watchReason: "Likidite ve yaygın yatırımcı ilgisi sebebiyle ilk evren içinde tutulur.",
    eventTargets: ["Bilanço", "Temettü", "Regülasyon"]
  },
  {
    ticker: "TCELL",
    name: "Turkcell",
    sector: "Telekom",
    priority: 13,
    description: "Telekom gelirleri, regülasyon ve temettü gündemiyle izlenir.",
    watchReason: "Savunmacı yapı, temettü ve regülasyon etkileri için karşılaştırmalı örnek sağlar.",
    eventTargets: ["Bilanço", "Temettü", "Regülasyon"]
  },
  {
    ticker: "FROTO",
    name: "Ford Otosan",
    sector: "Otomotiv",
    priority: 14,
    description: "İhracat, üretim ve yatırım kararlarıyla takip edilen otomotiv şirketi.",
    watchReason: "İhracat, üretim adedi ve yatırım açıklamaları fiyat tepkisi yaratabilir.",
    eventTargets: ["Bilanço", "Yatırım", "Üretim verisi"]
  },
  {
    ticker: "TOASO",
    name: "Tofaş",
    sector: "Otomotiv",
    priority: 15,
    description: "Üretim anlaşmaları ve otomotiv pazarı verileriyle izlenir.",
    watchReason: "Model, üretim ve ortaklık haberleri net olay sınıfları oluşturur.",
    eventTargets: ["Bilanço", "Üretim anlaşması", "Temettü"]
  },
  {
    ticker: "SASA",
    name: "Sasa Polyester",
    sector: "Kimya",
    priority: 16,
    description: "Yatırım, kapasite artışı ve sermaye işlemleriyle yüksek yatırımcı ilgisi gören şirket.",
    watchReason: "Yüksek oynaklık, sermaye işlemleri ve yatırım haberleri sebebiyle arşiv değeri taşır.",
    eventTargets: ["Sermaye işlemi", "Yatırım", "Bilanço"]
  },
  {
    ticker: "HEKTS",
    name: "Hektaş",
    sector: "Tarım ve kimya",
    priority: 17,
    description: "Tarım teknolojileri, bilanço ve sermaye işlemleriyle takip edilen şirket.",
    watchReason: "Sermaye işlemleri ve yüksek yatırımcı ilgisi nedeniyle olay hafızası güçlüdür.",
    eventTargets: ["Sermaye işlemi", "Bilanço", "Yatırım"]
  },
  {
    ticker: "KONTR",
    name: "Kontrolmatik",
    sector: "Teknoloji ve enerji",
    priority: 18,
    description: "Enerji teknolojileri ve sözleşme haberleriyle yüksek ilgi görür.",
    watchReason: "Sözleşme ve yatırım haberlerinin kısa vadeli etkisi sık izlenir.",
    eventTargets: ["Sözleşme", "Yatırım", "Bilanço"]
  },
  {
    ticker: "ASTOR",
    name: "Astor Enerji",
    sector: "Enerji ekipmanları",
    priority: 19,
    description: "Sipariş, yatırım ve ihracat haberleriyle takip edilen şirket.",
    watchReason: "Sipariş ve ihracat açıklamaları standart olay sınıfı olarak izlenebilir.",
    eventTargets: ["Sözleşme", "İhracat", "Bilanço"]
  },
  {
    ticker: "PETKM",
    name: "Petkim",
    sector: "Petrokimya",
    priority: 20,
    description: "Petrokimya marjları, döviz ve emtia döngüsüyle yakından izlenen sanayi şirketi.",
    watchReason: "Yüksek yatırımcı ilgisi ve emtia/döviz hassasiyeti nedeniyle fiyat tepkisi arşivine uygundur.",
    eventTargets: ["Bilanço", "Emtia etkisi", "Operasyonel gelişme"]
  }
];

export const demoEvents = [
  {
    slug: "thyao-2024-ikinci-ceyrek-finansal-sonuclari",
    ticker: "THYAO",
    date: "2024-08-09",
    reactionStartDate: "2024-08-12",
    category: "earnings",
    title: "THYAO 2024 ikinci çeyrek finansal sonuçları",
    summary:
      "Şirketin finansal sonuçları sonrasında fiyat, hacim ve BIST 100'e göre göreli performansın nasıl değiştiğini gösteren örnek kayıt.",
    verificationStatus: "sample",
    dataStatus: "sample",
    sources: [
      {
        type: "kap",
        label: "KAP bildirim araması",
        publisher: "Kamuyu Aydınlatma Platformu",
        url: "https://www.kap.org.tr/tr/",
        isPrimary: true
      },
      {
        type: "data_provider",
        label: "BIST piyasa verisi",
        publisher: "Borsa İstanbul",
        url: "https://www.borsaistanbul.com/veriler",
        isPrimary: false
      }
    ],
    returns: { d1: 1.8, d3: 3.2, w1: 2.4, w2: -1.1, d30: 4.6, d90: 6.9, d180: 8.4, y1: 12.7 },
    bistRelative: 1.3,
    volumeMultiple: 1.7,
    sentiment: { positive: 42, neutral: 36, negative: 22 },
    qualityNote:
      "Örnek MVP kaydıdır. Yayın öncesinde doğrudan KAP bildirim linki, açıklama saati ve düzeltilmiş fiyat serisi doğrulanmalıdır.",
    editorChecklist: ["Doğrudan bildirim linki", "İlk işlem günü", "Düzeltilmiş fiyat", "BIST 100 kıyası"]
  },
  {
    slug: "tuprs-temettu-dagitim-karari",
    ticker: "TUPRS",
    date: "2024-03-28",
    reactionStartDate: "2024-03-29",
    category: "dividend",
    title: "TUPRS temettü dağıtım kararı",
    summary:
      "Kar payı kararının ardından standart zaman pencerelerinde fiyat, hacim ve endeks göreli tepkiyi gösteren örnek kayıt.",
    verificationStatus: "sample",
    dataStatus: "sample",
    sources: [
      {
        type: "kap",
        label: "KAP bildirim araması",
        publisher: "Kamuyu Aydınlatma Platformu",
        url: "https://www.kap.org.tr/tr/",
        isPrimary: true
      },
      {
        type: "data_provider",
        label: "BIST piyasa verisi",
        publisher: "Borsa İstanbul",
        url: "https://www.borsaistanbul.com/veriler",
        isPrimary: false
      }
    ],
    returns: { d1: -0.9, d3: 0.6, w1: 1.4, w2: 3.8, d30: 5.1, d90: 7.3, d180: 9.1, y1: 10.6 },
    bistRelative: 2.0,
    volumeMultiple: 1.4,
    sentiment: { positive: 47, neutral: 40, negative: 13 },
    qualityNote:
      "Temettü etkisi için fiyat düzeltmesi özellikle kontrol edilmelidir. Oranlar gerçek yayın datası değildir.",
    editorChecklist: ["Temettü düzeltmesi", "Hak kullanım tarihi", "Doğrudan kaynak", "Endeks karşılaştırması"]
  },
  {
    slug: "asels-yeni-sozlesme-aciklamasi",
    ticker: "ASELS",
    date: "2024-05-17",
    reactionStartDate: "2024-05-20",
    category: "contract",
    title: "ASELS yeni sözleşme açıklaması",
    summary:
      "Yeni iş ilişkisi açıklamasının ardından piyasa tepkisini sınıflandırmak için kullanılan kaynaklı örnek olay kaydı.",
    verificationStatus: "sample",
    dataStatus: "sample",
    sources: [
      {
        type: "kap",
        label: "KAP bildirim araması",
        publisher: "Kamuyu Aydınlatma Platformu",
        url: "https://www.kap.org.tr/tr/",
        isPrimary: true
      },
      {
        type: "data_provider",
        label: "BIST piyasa verisi",
        publisher: "Borsa İstanbul",
        url: "https://www.borsaistanbul.com/veriler",
        isPrimary: false
      }
    ],
    returns: { d1: 2.6, d3: 4.1, w1: 6.8, w2: 3.5, d30: 8.2, d90: 10.5, d180: 13.8, y1: 18.4 },
    bistRelative: 4.7,
    volumeMultiple: 2.3,
    sentiment: { positive: 58, neutral: 31, negative: 11 },
    qualityNote:
      "Sözleşme büyüklüğü, teslim takvimi ve açıklama saati editör tarafından doğrulanmadan yayın statüsüne alınmamalıdır.",
    editorChecklist: ["Sözleşme tutarı", "Teslim takvimi", "Açıklama saati", "Hacim ortalaması"]
  }
];

export const tickers = companies.map((company) => company.ticker);

export const publicCandidateEvents = candidateEvents.map((event) => ({
  ...event,
  displayGroup: "candidate"
}));

export const events = [...publicCandidateEvents, ...demoEvents];

export const sampleEvents = events.map((event) => {
  const company = getCompany(event.ticker);
  const primarySource = getPrimarySource(event);

  return {
    ...event,
    company: company?.name ?? event.ticker,
    type: eventCategories[event.category] ?? event.category,
    sourceLabel: primarySource.label,
    sourceUrl: primarySource.url
  };
});

export function getCompany(ticker) {
  return companies.find((company) => company.ticker.toLowerCase() === ticker.toLowerCase());
}

export function getEventsByTicker(ticker) {
  return sampleEvents.filter((event) => event.ticker.toLowerCase() === ticker.toLowerCase());
}

export function getEventBySlug(slug) {
  return sampleEvents.find((event) => event.slug === slug);
}

export function getEventStatus(event) {
  return verificationStatuses[event.verificationStatus] ?? verificationStatuses.candidate;
}

export function getEventDataStatus(event) {
  return dataStatuses[event.dataStatus] ?? dataStatuses.awaiting_price_data;
}

export function getPrimarySource(event) {
  return (
    event.sources?.find((source) => source.isPrimary) ??
    event.sources?.[0] ?? {
      label: event.sourceLabel ?? "Kaynak bekliyor",
      url: event.sourceUrl ?? "#"
    }
  );
}

export function formatReturn(value) {
  if (typeof value !== "number") return "Yok";
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
}

export function returnClass(value) {
  if (typeof value !== "number") return "neutral-return";
  return value >= 0 ? "positive" : "negative";
}
