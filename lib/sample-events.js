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
    company: "Turk Hava Yollari",
    date: "2024-08-09",
    type: "Bilanco",
    title: "THYAO 2024 ikinci ceyrek finansal sonuclari",
    summary:
      "Sirket ikinci ceyrek finansal sonuclarini acikladi. Olay sayfasi, aciklama sonrasi standart zaman pencerelerindeki fiyat ve hacim tepkisini gosterir.",
    sourceLabel: "KAP bildirimi",
    returns: { d1: 1.8, d3: 3.2, w1: 2.4, w2: -1.1, d30: 4.6 },
    bistRelative: 1.3,
    volumeMultiple: 1.7,
    sentiment: { positive: 42, neutral: 36, negative: 22 }
  },
  {
    ticker: "TUPRS",
    company: "Tupras",
    date: "2024-03-28",
    type: "Temettu",
    title: "TUPRS temettu dagitim karari",
    summary:
      "Yonetim kurulunun kar payi dagitim onerisi kamuya aciklandi. Olay, temettu verimi ve sonraki fiyat tepkisiyle birlikte arsivlenir.",
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
    type: "Sozlesme",
    title: "ASELS yeni sozlesme aciklamasi",
    summary:
      "Sirket yeni bir is iliskisine dair kamuya acik duyuru paylasti. Olay, sozlesme haberlerinin kisa ve orta vadeli etkisini izlemek icin siniflandirilir.",
    sourceLabel: "KAP bildirimi",
    returns: { d1: 2.6, d3: 4.1, w1: 6.8, w2: 3.5, d30: 8.2 },
    bistRelative: 4.7,
    volumeMultiple: 2.3,
    sentiment: { positive: 58, neutral: 31, negative: 11 }
  }
];
