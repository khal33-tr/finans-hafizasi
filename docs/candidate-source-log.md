# Candidate Kaynak Günlüğü

Bu dosya, ilk araştırma kuyruğundan gerçek kaynak linki bulunan olay adaylarını özetler. Kayıtlar henüz `verified` değildir; fiyat, hacim ve BIST 100 hesapları tamamlanmadan yayına alınmamalıdır.

## Durum Özeti

- Kaynak bulunan candidate kayıt: 10
- Kapsanan hisse: 10
- Ana kaynak: KAP bildirimleri
- Piyasa verisi kaynağı: Borsa İstanbul veri sayfaları
- Sonraki iş: 1G, 3G, 1H, 2H, 30G hesaplarını üretmek

## Candidate Kayıtlar

| # | Hisse | Kategori | Olay | KAP bildirimi | Tepki başlangıcı | Not |
|---:|---|---|---|---|---|---|
| 1 | THYAO | Bilanço | 2026 ilk çeyrek finansal sonuçları | [1598902](https://www.kap.org.tr/tr/Bildirim/1598902) | 2026-04-30 | Seans sonrası açıklama |
| 2 | TUPRS | Temettü | 2025 kar dağıtım önerisi | [1570793](https://www.kap.org.tr/tr/Bildirim/1570793) | 2026-03-12 | Temettü düzeltmesi gerekir |
| 3 | ASELS | Sözleşme | Sözleşme imzalanması | [1609287](https://www.kap.org.tr/tr/Bildirim/1609287) | 2026-05-21 | Aynı gün tepki adayı |
| 4 | KCHOL | Bilanço | Finansal raporların açıklanması | [1603638](https://www.kap.org.tr/tr/Bildirim/1603638) | 2026-05-11 | Cuma seans sonrası açıklama |
| 5 | SAHOL | Yatırım | Akçansa pay devri için Rekabet Kurumu izni | [1610797](https://www.kap.org.tr/tr/Bildirim/1610797) | 2026-05-25 | Cuma seans sonrası açıklama |
| 6 | EREGL | Temettü | Nakit kar payı ödeme tarihi | [1598409](https://www.kap.org.tr/tr/Bildirim/1598409) | 2026-04-29 | Hak kullanım takvimi kontrol edilmeli |
| 7 | SISE | Yatırım | ABD Stockton Liman Projesinin sonlandırılması | [1610722](https://www.kap.org.tr/tr/Bildirim/1610722) | 2026-05-25 | Cuma seans sonrası açıklama |
| 8 | BIMAS | Bilanço | 2026 ilk çeyrek faaliyet raporu | [1605795](https://www.kap.org.tr/tr/Bildirim/1605795) | 2026-05-12 | Finansal tablo bildirimi ayrıca eşleştirilmeli |
| 9 | AKBNK | Bilanço | 2026 ilk çeyrek konsolide raporlama paketi | [1598268](https://www.kap.org.tr/tr/Bildirim/1598268) | 2026-04-29 | Finansal tablo bildirimi ayrıca eşleştirilmeli |
| 10 | GARAN | Bilanço | 2026 ilk çeyrek finansal sonuç sunumu | [1598912](https://www.kap.org.tr/tr/Bildirim/1598912) | 2026-04-30 | Sunum eki kontrol edilmeli |

## Doğrulama Notları

- KAP bildirim sayfalarında şirket kodu, bildirim tarihi ve özet bilgi kontrol edildi.
- Borsa İstanbul veri linki her kayda ikincil piyasa veri kaynağı olarak eklendi.
- `candidate` statüsü, yalnızca kaynak bulunduğunu gösterir.
- `verified` statüsü için hesapların tekrar üretilebilir olması gerekir.

## Sonraki İş Sırası

1. Her candidate için baz fiyat ve pencere sonu fiyatlarını seç.
2. Tatil ve hafta sonu durumlarını işlem takvimine göre çöz.
3. BIST 100 aynı pencere getirilerini hesapla.
4. Hacim çarpanını 20 günlük ortalama hacme göre üret.
5. Eksik veya tartışmalı veri varsa `qualityNote` içinde açıkça göster.
