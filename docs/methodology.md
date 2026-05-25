# Finans Hafızası Metodoloji Taslağı

## Olay Seçimi

Bir olay arşive girebilmek için en az bir güvenilir kaynakla doğrulanmalıdır. MVP döneminde olay adayları otomatik veya yarı otomatik toplanabilir, ancak yayınlanmadan önce editör tarafından onaylanır.

Öncelikli kaynak tipleri:

- KAP bildirimleri
- Şirket yatırımcı ilişkileri duyuruları
- Borsa İstanbul duyuruları
- SPK ve resmi kurum açıklamaları
- Güvenilir finans haber kaynakları

## Olay Sınıfları

- Bilanço
- Temettü
- Bedelli veya bedelsiz sermaye artırımı
- İhale veya sözleşme
- Yatırım kararı
- Regülasyon
- Dava, ceza veya soruşturma
- Yönetim değişikliği
- Makro veya sektörel etki

## Olay Tarihi

Olay tarihi, bilginin kamuya açık hale geldiği ilk zaman olarak belirlenir. Bildirim seans kapandıktan sonra geldiyse ilk piyasa tepkisi bir sonraki işlem günü üzerinden değerlendirilebilir.

## Fiyat Tepkisi

Kısa tepki pencereleri:

- 1 işlem günü
- 3 işlem günü
- 1 hafta
- 2 hafta
- 30 takvim günü veya en yakın işlem günü

Uzun izleme pencereleri:

- 90 takvim günü veya en yakın işlem günü
- 180 takvim günü veya en yakın işlem günü
- 365 takvim günü veya en yakın işlem günü

Kısa tepki, yayın olgunluğunu belirleyen ana settir. Uzun izleme, olayın kalıcı etkisini ayrı katmanda göstermek için tutulur.

Temel hesap:

```text
Getiri = (Pencere sonu düzeltilmiş kapanış - baz düzeltilmiş kapanış) / baz düzeltilmiş kapanış
```

Relatif getiri:

```text
Relatif getiri = Hisse getirisi - BIST 100 getirisi
```

## Hacim Tepkisi

Hacim tepkisi, olay sonrası işlem hacminin önceki 20 işlem günü ortalamasına göre değişimiyle ölçülür.

```text
Hacim çarpanı = Olay günü hacmi / Önceki 20 gün ortalama hacim
```

## Söylem Özeti

Kamuya açık yorumlar yalnızca toplu eğilim göstergesi olarak kullanılır. Tekil yorumlar yatırım sinyali gibi sunulmaz. Sistem pozitif, negatif ve nötr söylem oranlarını gösterir; manipülasyon riski veya veri yetersizliği varsa bunu ayrıca belirtir.

## Yayıncılık Standardı

Her olay sayfasında şu bilgiler bulunmalıdır:

- Olay tarihi
- Olay tipi
- İlgili hisse
- Kaynaklar
- Tarafsız özet
- Kısa fiyat tepkisi
- Uzun izleme pencereleri
- Endeks karşılaştırması
- Hacim tepkisi
- Veri sınırı veya notlar
