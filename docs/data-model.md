# Finans Hafizasi Veri Modeli

## Amac

Bu dokuman, Finans Hafizasi MVP'sinde tutulmasi gereken ana veri varliklarini ve iliskilerini tanimlar. Modelin hedefi, olaylari kaynaklariyla birlikte guvenilir sekilde yayinlamak ve standart fiyat tepkisi hesaplarini tekrar uretilebilir hale getirmektir.

## Ana Varliklar

### Company

Sirketin temel kimligi.

Alanlar:

- `id`
- `ticker`
- `name`
- `market`
- `sector`
- `industry`
- `is_active`
- `created_at`
- `updated_at`

Notlar:

- `ticker` benzersiz olmalidir.
- MVP pazari BIST oldugu icin `market` varsayilan olarak `BIST` olabilir.

### Event

Arsivde yayinlanan veya editor onayinda bekleyen ana olay kaydi.

Alanlar:

- `id`
- `company_id`
- `title`
- `slug`
- `summary`
- `category`
- `event_date`
- `market_reaction_start_date`
- `status`
- `importance_score`
- `editor_note`
- `data_quality_note`
- `published_at`
- `created_at`
- `updated_at`

Durumlar:

- `candidate`
- `needs_review`
- `approved`
- `published`
- `archived`
- `rejected`

Notlar:

- `event_date`, bilginin kamuya aciklandigi tarihtir.
- `market_reaction_start_date`, fiyat tepkisinin baz alinacagi ilk islem tarihidir.
- Seans sonrasi aciklamalarda bu iki tarih farkli olabilir.

### EventSource

Bir olayi destekleyen kaynak kaydi.

Alanlar:

- `id`
- `event_id`
- `source_type`
- `title`
- `url`
- `publisher`
- `published_at`
- `accessed_at`
- `is_primary`
- `created_at`

Kaynak tipleri:

- `kap`
- `company_ir`
- `bist`
- `spk`
- `news`
- `other_official`

Notlar:

- Her yayinlanmis olayda en az bir kaynak olmalidir.
- KAP veya resmi sirket duyurusu varsa `is_primary` isaretlenmelidir.

### PriceBar

Gunluk fiyat ve hacim verisi.

Alanlar:

- `id`
- `symbol`
- `date`
- `open`
- `high`
- `low`
- `close`
- `adjusted_close`
- `volume`
- `source`
- `created_at`

Notlar:

- Hesaplarda mumkunse `adjusted_close` kullanilmalidir.
- Temettu, bolunme ve sermaye artirimi sonrasi duzeltmeler izlenmelidir.

### MarketIndexBar

BIST 100 veya ilgili endeks verisi.

Alanlar:

- `id`
- `index_symbol`
- `date`
- `open`
- `high`
- `low`
- `close`
- `adjusted_close`
- `volume`
- `source`
- `created_at`

### EventReturn

Bir olay icin hesaplanmis fiyat tepkisi.

Alanlar:

- `id`
- `event_id`
- `window`
- `base_date`
- `end_date`
- `base_price`
- `end_price`
- `stock_return_pct`
- `index_return_pct`
- `relative_return_pct`
- `calculation_status`
- `calculation_note`
- `created_at`

Pencere degerleri:

- `event_day`
- `d1`
- `d3`
- `w1`
- `w2`
- `d30`

Notlar:

- Pencere sonu tatil gunune denk gelirse en yakin uygun islem gunu kullanilmalidir.
- Hesap tekrar calistirilirse onceki sonuc versiyonlanabilir veya audit log'a yazilabilir.

### VolumeReaction

Olay sonrasi hacim tepkisi.

Alanlar:

- `id`
- `event_id`
- `event_volume`
- `avg_volume_20d`
- `volume_multiple`
- `calculation_note`
- `created_at`

### SentimentSnapshot

Kamuya acik soylem ozeti.

Alanlar:

- `id`
- `event_id`
- `method`
- `positive_pct`
- `neutral_pct`
- `negative_pct`
- `sample_size`
- `source_scope`
- `summary`
- `confidence`
- `created_at`

Notlar:

- MVP'de `method` degeri `editorial_observation` olabilir.
- Otomatik duygu analizi daha sonraki faza birakilabilir.
- `confidence` dusukse public sayfada veri siniri gosterilmelidir.

### EditorialReview

Editor onay sureci kaydi.

Alanlar:

- `id`
- `event_id`
- `reviewer_name`
- `status_from`
- `status_to`
- `comment`
- `created_at`

Notlar:

- MVP'de kullanici sistemi yoksa `reviewer_name` metin olarak tutulabilir.
- Daha sonra `User` tablosuna baglanabilir.

## Iliskiler

```text
Company 1 - N Event
Event 1 - N EventSource
Event 1 - N EventReturn
Event 1 - 1 VolumeReaction
Event 1 - 0..1 SentimentSnapshot
Event 1 - N EditorialReview
```

## Olay Kategorileri

Ilk kategori listesi:

- `earnings`
- `dividend`
- `capital_increase`
- `contract`
- `investment`
- `regulation`
- `legal_penalty`
- `management_change`
- `macro_sector`

Public gorunumde Turkce karsiliklar kullanilir:

- Bilanco
- Temettu
- Sermaye artirimi
- Ihale veya sozlesme
- Yatirim karari
- Regulasyon
- Dava, ceza veya sorusturma
- Yonetim degisikligi
- Makro veya sektorel etki

## Yayinlama Kurallari

Bir olay `published` durumuna gecmeden once:

- En az bir kaynak baglanmis olmali.
- `event_date` ve `market_reaction_start_date` onaylanmis olmali.
- Olay kategorisi secilmis olmali.
- Baslik ve ozet yatirim tavsiyesi icermemeli.
- En az `d1`, `d3`, `w1`, `w2`, `d30` fiyat tepkileri hesaplanmis olmali.
- Hacim tepkisi hesaplanmis veya veri eksikligi notu girilmis olmali.

## Ornek Event JSON

```json
{
  "ticker": "THYAO",
  "title": "THYAO 2024 ikinci ceyrek finansal sonuclari",
  "category": "earnings",
  "event_date": "2024-08-09",
  "market_reaction_start_date": "2024-08-12",
  "status": "published",
  "sources": [
    {
      "source_type": "kap",
      "publisher": "KAP",
      "url": "https://www.kap.org.tr/",
      "is_primary": true
    }
  ],
  "returns": [
    {
      "window": "d1",
      "stock_return_pct": 1.8,
      "index_return_pct": 0.5,
      "relative_return_pct": 1.3
    }
  ]
}
```
