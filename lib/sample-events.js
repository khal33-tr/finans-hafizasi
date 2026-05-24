export const tickers = [
  "THYAO",
  "TUPRS",
  "SASA",
  "HEKTS",
  "KCHOL",
  "SAHOL",
  "ASELS",
  "EREGL",
  "SISE",
  "BIMAS",
  "AKBNK",
  "GARAN",
  "YKBNK",
  "ISCTR",
  "TCELL",
  "FROTO",
  "TOASO",
  "KONTR",
  "ASTOR",
  "KOZAL"
];

export const sampleEvents = [
  {
    ticker: "THYAO",
    company: "Türk Hava Yolları",
    date: "2024-08-09",
    type: "Bilanco",
    title: "THYAO 2024 ikinci çeyrek finansal sonuçları",
    summary:
      "Şirket ikinci çeyrek finansal sonuçlarını açıkladı. Olay sayfası, açıklama sonrası standart zaman pencerelerindeki fiyat ve hacim tepkisini gösterir.",
    sourceLabel: "KAP bildirimi",
    returns: { d1: 1.8, d3: 3.2, w1: 2.4, w2: -1.1, d30: 4.6 },
    bistRelative: 1.3,
    volumeMultiple: 1.7,
    sentiment: { positive: 42, neutral: 36, negative: 22 }
  },
  {
    ticker: "TUPRS",
    company: "Tüpraş",
    date: "2024-03-28",
    type: "Temettu",
    title: "TUPRS temettü dağıtım kararı",
    summary:
      "Yönetim kurulunun kar payı dağıtım önerisi kamuya açıklandı. Olay, temettü verimi ve sonraki fiyat tepkisiyle birlikte arşivlenir.",
    sourceLabel: "KAP bildirimi",
    returns: { d1: -0.9, d3: 0.6, w1: 1.4, w2: 3.8, d30: 5.1 },
    bistRelative: 2.0,
    volumeMultiple: 1.4,
    sentiment: { positive: 47, neutral: 40, negative: 13 }
  },
  {
    ticker: "ASELS",
    company: "Aselsan",
    date: "2024-05-17",
    type: "Sözleşme",
    title: "ASELS yeni sözleşme açıklaması",
    summary:
      "Şirket yeni bir iş ilişkisine dair kamuya açık duyuru paylaştı. Olay, sözleşme haberlerinin kısa ve orta vadeli etkisini izlemek için sınıflandırılır.",
    sourceLabel: "KAP bildirimi",
    returns: { d1: 2.6, d3: 4.1, w1: 6.8, w2: 3.5, d30: 8.2 },
    bistRelative: 4.7,
    volumeMultiple: 2.3,
    sentiment: { positive: 58, neutral: 31, negative: 11 }
  }
];
