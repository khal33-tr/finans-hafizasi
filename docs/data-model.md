# Finans Hafızası Veri Modeli

Bu doküman, Finans Hafızası MVP'sinde olayların güvenilir ve tekrar üretilebilir biçimde yayınlanması için kullanılacak veri standardını tanımlar.

## Temel İlke

Bir kayıt haber başlığı değil, olay hafızasıdır. Bu yüzden her olayda üç şey ayrı tutulur:

- Olayın kendisi: şirket, tarih, kategori, başlık, özet.
- Piyasa tepkisi: kısa tepki, uzun izleme, BIST 100 kıyası ve hacim çarpanı.
- Güven standardı: kaynaklar, doğrulama durumu, veri notu ve editör kontrol listesi.

## Event

Arşivde gösterilen ana olay kaydı.

Zorunlu alanlar:

- `slug`
- `ticker`
- `date`
- `reactionStartDate`
- `category`
- `title`
- `summary`
- `verificationStatus`
- `dataStatus`
- `sources`
- `returns`
- `bistRelative`
- `volumeMultiple`
- `sentiment`
- `qualityNote`
- `editorChecklist`

Notlar:

- `date`, olayın kamuya açıklandığı tarihtir.
- `reactionStartDate`, fiyat tepkisinin baz alınacağı ilk işlem tarihidir.
- Seans sonrası açıklamalarda `date` ve `reactionStartDate` farklı olabilir.

## EventReturn

Bir olay için hesaplanan fiyat tepkisi.

Kısa tepki pencereleri:

- `d1`: 1 işlem günü
- `d3`: 3 işlem günü
- `w1`: 1 hafta
- `w2`: 2 hafta
- `d30`: 30 gün

Uzun izleme pencereleri:

- `d90`: 90 gün
- `d180`: 180 gün
- `y1`: 1 yıl

Hesap standardı:

```text
hisse getirisi = (pencere sonu düzeltilmiş kapanış / baz düzeltilmiş kapanış - 1) * 100
göreli getiri = hisse getirisi - BIST 100 getirisi
```

Notlar:

- Pencere sonu tatil gününe denk gelirse en yakın uygun işlem günü kullanılır.
- Temettü, bölünme ve sermaye artırımı etkileri için düzeltilmiş kapanış kullanılır.
- Kısa tepki pencereleri yayın olgunluğunu belirler.
- Uzun izleme pencereleri ayrı katmandır ve kısa tepki verisi hazır olan kaydı bekletmez.
- Hesap tekrar üretilemiyorsa kayıt `verified` olamaz.

## EventSource

Bir olayı destekleyen kaynak kaydı.

Zorunlu alanlar:

- `type`
- `label`
- `publisher`
- `url`
- `isPrimary`

Kaynak tipleri:

- `kap`
- `company_ir`
- `bist`
- `spk`
- `news`
- `data_provider`

## PriceCalculationInput

Candidate olayların hesap motoruna verilmeden önceki girdi sözleşmesi.

Ana dosya:

- `data/calculation-inputs.json`

Alanlar:

- `slug`
- `ticker`
- `kapDisclosureId`
- `eventDate`
- `publishDateTime`
- `baseDate`
- `baseDateSource`
- `requiredSeries`
- `priceRangeStart`
- `priceRangeEnd`
- `windowStatus`
- `calculationStatus`
- `specialHandling`

Notlar:

- `requiredSeries`, ilgili hisse ve `XU100` endeksini birlikte içermelidir.
- `priceRangeEnd`, uzun izleme dahil edildiği için 365 günlük pencereyi kapsar.
- Kısa pilot gereksinimleri `requiredShortReactionRangeEnd` ile ayrıca daraltılır.
- Temettü veya sermaye işlemi varsa `specialHandling` içinde ayrıca işaretlenir.

## Yayınlama Kuralları

Bir olay `verified` statüsüne geçmeden önce:

- Doğrudan kaynak linki eklenmiş olmalı.
- Olay tarihi ve tepki başlangıç tarihi kontrol edilmiş olmalı.
- Kısa fiyat pencereleri tekrar üretilebilir olmalı.
- BIST 100 karşılaştırması hesaplanmış olmalı.
- Hacim çarpanı hesaplanmış veya veri eksikliği açıkça notlanmış olmalı.
- Başlık ve özet yatırım tavsiyesi dili içermemeli.

## Örnek Event JSON

```json
{
  "slug": "thyao-2024-ikinci-ceyrek-finansal-sonuclari",
  "ticker": "THYAO",
  "date": "2024-08-09",
  "reactionStartDate": "2024-08-12",
  "category": "earnings",
  "title": "THYAO 2024 ikinci çeyrek finansal sonuçları",
  "verificationStatus": "sample",
  "dataStatus": "sample",
  "sources": [
    {
      "type": "kap",
      "label": "KAP bildirim araması",
      "publisher": "Kamuyu Aydınlatma Platformu",
      "url": "https://www.kap.org.tr/tr/",
      "isPrimary": true
    }
  ],
  "returns": {
    "d1": 1.8,
    "d3": 3.2,
    "w1": 2.4,
    "w2": -1.1,
    "d30": 4.6,
    "d90": 6.9,
    "d180": 8.4,
    "y1": 12.7
  },
  "bistRelative": 1.3,
  "volumeMultiple": 1.7,
  "qualityNote": "Örnek MVP kaydıdır; doğrudan kaynak ve fiyat serisi doğrulanmalıdır."
}
```
