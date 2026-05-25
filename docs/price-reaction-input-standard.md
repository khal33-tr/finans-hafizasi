# Fiyat Tepkisi Girdi Standardı

Bu doküman, candidate olayların fiyat, hacim ve BIST 100 kıyası hesaplanmadan önce hangi girdilere ihtiyaç duyduğunu tanımlar.

Ana dosya:

- `data/calculation-inputs.json`

## Temel İlke

Finans Hafızası'nda bir olay `verified` statüsüne ancak hesaplar tekrar üretilebilir hale geldiğinde geçebilir. Bu yüzden her olayda aynı girdi sözleşmesi kullanılır.

Hesaplar iki gruba ayrılır:

- Kısa tepki: olay sonrası ilk piyasa tepkisini gösterir ve MVP yayın olgunluğunu belirler.
- Uzun izleme: olayın daha uzun vadeli izini gösterir; kısa tepki yayına hazırsa kaydı bekletmez.

## Zorunlu Seriler

Her olay için iki piyasa serisi gerekir:

- İlgili hisse: örnek `THYAO`
- Karşılaştırma endeksi: `XU100`

Hisse serisinde hacim zorunludur. Endeks serisinde hacim zorunlu değildir, fakat kapanış ve düzeltilmiş kapanış alanları gereklidir.

## Zorunlu Fiyat Alanları

Her günlük fiyat satırı şu alanları taşımalıdır:

- `symbol`
- `date`
- `open`
- `high`
- `low`
- `close`
- `adjustedClose`
- `volume`
- `source`

Hesaplarda mümkünse `adjustedClose` kullanılır. Temettü, bölünme ve sermaye işlemi etkileri bu alana yansıtılmalıdır.

## Baz Tarih

`baseDate`, olaydan sonra piyasa tepkisinin ölçülmeye başlanacağı işlem günüdür.

Kural:

- Bildirim seans içinde yayımlandıysa `reactionStartDate` aynı gün olabilir.
- Bildirim seans kapanışı sonrasında yayımlandıysa `reactionStartDate` sonraki işlem günü olmalıdır.
- Resmi tatil veya hafta sonu varsa BIST işlem günü takvimi kullanılır.

## Zaman Pencereleri

Kısa tepki pencereleri:

| Anahtar | Etiket | Kural |
|---|---|---|
| `d1` | 1G | Baz tarihten sonraki 1. işlem günü |
| `d3` | 3G | Baz tarihten sonraki 3. işlem günü |
| `w1` | 1H | Baz tarihten 7 takvim günü sonrası, işlem günü değilse sonraki işlem günü |
| `w2` | 2H | Baz tarihten 14 takvim günü sonrası, işlem günü değilse sonraki işlem günü |
| `d30` | 30G | Baz tarihten 30 takvim günü sonrası, işlem günü değilse sonraki işlem günü |

Uzun izleme pencereleri:

| Anahtar | Etiket | Kural |
|---|---|---|
| `d90` | 90G | Baz tarihten 90 takvim günü sonrası, işlem günü değilse sonraki işlem günü |
| `d180` | 180G | Baz tarihten 180 takvim günü sonrası, işlem günü değilse sonraki işlem günü |
| `y1` | 1Y | Baz tarihten 365 takvim günü sonrası, işlem günü değilse sonraki işlem günü |

Pencere bitiş tarihleri hesap motoru tarafından işlem takvimiyle çözülür.

## Getiri Hesabı

```text
hisse_getirisi = (pencere_sonu_adjustedClose / baz_adjustedClose - 1) * 100
endeks_getirisi = (pencere_sonu_XU100_adjustedClose / baz_XU100_adjustedClose - 1) * 100
göreli_getiri = hisse_getirisi - endeks_getirisi
```

## Hacim Tepkisi

```text
hacim_çarpanı = olay_günü_hacmi / önceki_20_işlem_günü_ortalama_hacim
```

Önceki 20 işlem günü hesabına `baseDate` dahil edilmez. Veri eksikse kayıt `verified` yapılmaz; `qualityNote` alanına eksik veri yazılır.

## Pilot Ayrımı

Kısa tepki pilotu şu dosyaları kullanır:

- `data/imports/pilot-price-data-requirements.json`
- `data/imports/today-completable-price-data-requirements.json`
- `data/imports/future-window-price-data-requirements.json`

Uzun izleme pilotu ayrı tutulur:

- `data/imports/long-monitoring-price-data-requirements.json`

Bu ayrım sayesinde 90G, 180G ve 1Y pencereleri ürünün değerini büyütür; fakat ilk yayın için gerekli kısa tepki akışını gereksiz yere bekletmez.
