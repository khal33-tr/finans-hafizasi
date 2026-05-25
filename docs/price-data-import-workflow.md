# Fiyat Verisi İçe Aktarma Akışı

Bu doküman, Finans Hafızası'nın fiyat ve işlem takvimi verisini gerçek veri sağlayıcısına bağlamadan önce nasıl standartlaştıracağını tanımlar.

## Karar

MVP için ilk ara katman CSV içe aktarma akışıdır. Bu karar, veri sağlayıcı değişse bile hesap motorunun aynı dosya sözleşmesiyle çalışmasını sağlar.

Bu akış yatırım tavsiyesi üretmez; yalnızca geçmiş fiyat, hacim ve BIST 100 kıyasını tekrar üretilebilir hale getirir.

## Dosyalar

- `data/price-import-template.csv`: hisse ve XU100 günlük fiyat verisi şablonu
- `data/trading-calendar-import-template.csv`: BIST işlem takvimi şablonu
- `data/price-data-requirements.json`: ilk 10 candidate için gereken veri aralığı
- `data/price-import-validation-report.json`: mevcut CSV dosyaları için doğrulama raporu
- `scripts/generate-price-data-requirements.mjs`: gerekli fiyat aralıklarını üretir
- `scripts/validate-price-import.mjs`: fiyat ve takvim CSV dosyalarını doğrular

## Fiyat CSV Alanları

| Alan | Zorunlu | Açıklama |
|---|---:|---|
| `symbol` | Evet | Hisse sembolü veya `XU100` |
| `date` | Evet | `YYYY-MM-DD` |
| `open` | Evet | Açılış fiyatı |
| `high` | Evet | Gün içi en yüksek |
| `low` | Evet | Gün içi en düşük |
| `close` | Evet | Kapanış fiyatı |
| `adjustedClose` | Evet | Temettü ve sermaye işlemleriyle düzeltilmiş kapanış |
| `volume` | Hisse için evet | Endeks satırında boş kalabilir |
| `source` | Evet | Veri kaynağı veya içe aktarma notu |

## Takvim CSV Alanları

| Alan | Zorunlu | Açıklama |
|---|---:|---|
| `date` | Evet | `YYYY-MM-DD` |
| `isTradingDay` | Evet | `true` veya `false` |
| `sessionType` | Evet | `full`, `half`, `closed` |
| `note` | Evet | Tatil, yarım gün veya veri notu |

## Kullanım

Gerekli veri aralıklarını yeniden üret:

```bash
node scripts/generate-price-data-requirements.mjs
```

CSV dosyalarını doğrula:

```bash
node scripts/validate-price-import.mjs
```

Farklı dosyalarla doğrulama:

```bash
node scripts/validate-price-import.mjs --prices=data/imports/prices.csv --calendar=data/imports/calendar.csv
```

## Kabul Kuralı

Bir candidate olay `price_data_ready` durumuna ancak şu koşullarda alınabilir:

- Fiyat CSV dosyasında ilgili hisse ve `XU100` satırları eksiksizdir.
- Takvim CSV dosyası ilgili aralığı kapsar.
- `adjustedClose` alanı veri sağlayıcıyla veya editör notuyla doğrulanır.
- Temettü içeren olaylarda düzeltilmiş fiyat kontrolü ayrıca yapılır.
- `data/price-import-validation-report.json` içinde ilgili olay `ready` görünür.

## Mevcut Durum

Şablon dosyaları gerçek piyasa verisi içermez. Bu yüzden doğrulama raporunun `valid_schema_with_coverage_gaps` dönmesi beklenir. Bu sonuç, dosya biçiminin doğru olduğunu ama gerçek fiyat serilerinin henüz yüklenmediğini gösterir.
