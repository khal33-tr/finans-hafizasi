# Fiyat Verisi İçe Aktarma Akışı

Bu doküman, Finans Hafızası'nın fiyat ve işlem takvimi verisini gerçek veri sağlayıcısına bağlamadan önce nasıl standartlaştıracağını tanımlar.

## Karar

MVP için ilk ara katman CSV içe aktarma akışıdır. Bu karar, veri sağlayıcı değişse bile hesap motorunun aynı dosya sözleşmesiyle çalışmasını sağlar.

Bu akış yatırım tavsiyesi üretmez; yalnızca geçmiş fiyat, hacim ve BIST 100 kıyasını tekrar üretilebilir hale getirir.

## Dosyalar

- `data/price-import-template.csv`: hisse ve XU100 günlük fiyat verisi şablonu
- `data/trading-calendar-import-template.csv`: BIST işlem takvimi şablonu
- `data/price-data-requirements.json`: 20 candidate için kısa ve uzun veri aralığı
- `data/imports/pilot-price-data-requirements.json`: pilot kısa tepki gereksinimi
- `data/imports/long-monitoring-price-data-requirements.json`: 90G, 180G ve 1Y uzun izleme gereksinimi
- `data/imports/pilot-price-field-guide.csv`: fiyat CSV alanları için operatör rehberi
- `data/imports/pilot-calendar-field-guide.csv`: takvim CSV alanları için operatör rehberi
- `data/imports/pilot-import-operator-checklist.md`: gerçek veri girişi öncesi kontrol listesi
- `data/imports/pilot-validation-report.json`: son doğrulama raporu, uyarılar ve sonraki aksiyonlar
- `scripts/generate-price-data-requirements.mjs`: gerekli fiyat aralıklarını üretir
- `scripts/generate-pilot-import-templates.mjs`: pilot CSV şablonlarını üretir
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
node scripts/generate-pilot-import-templates.mjs
node scripts/generate-pilot-readiness.mjs
```

CSV dosyalarını doğrula:

```bash
node scripts/validate-price-import.mjs --prices=data/imports/pilot-prices.csv --calendar=data/imports/pilot-trading-calendar.csv --requirements=data/imports/pilot-price-data-requirements.json --out=data/imports/pilot-validation-report.json
```

## Alan Rehberi ve Operatör Kontrolü

Pilot şablonları üretildiğinde üç yardımcı dosya da oluşur:

- `data/imports/pilot-price-field-guide.csv`: her fiyat alanı için format, örnek değer ve doğrulama kuralı
- `data/imports/pilot-calendar-field-guide.csv`: işlem günü, seans tipi ve kapalı gün kuralları
- `data/imports/pilot-import-operator-checklist.md`: veri giren kişinin sırayla izleyeceği kısa kontrol listesi

Gerçek veri girişi yapılmadan önce bu üç dosya okunur. Böylece hangi sembol, hangi tarih aralığı, hangi kaynak notu ve hangi `adjustedClose` kontrolünün beklendiği tek yerde görünür.

## Kısa Tepki ve Uzun İzleme

Kısa tepki pencereleri `1G`, `3G`, `1H`, `2H` ve `30G` olarak tutulur. Pilot yayın olgunluğu bu gruba göre hesaplanır.

Uzun izleme pencereleri `90G`, `180G` ve `1Y` olarak ayrı gereksinim dosyasına alınır. Bu pencereler ürünün derinliğini artırır, fakat kısa tepki verisi hazır olan bir kaydı bekletmez.

## Kabul Kuralı

Bir candidate olay `price_data_ready` durumuna ancak şu koşullarda alınabilir:

- Fiyat CSV dosyasında ilgili hisse ve `XU100` satırları eksiksizdir.
- Takvim CSV dosyası ilgili aralığı kapsar.
- `adjustedClose` alanı veri sağlayıcıyla veya editör notuyla doğrulanır.
- Temettü içeren olaylarda düzeltilmiş fiyat kontrolü ayrıca yapılır.
- Doğrulama raporunda ilgili olay `ready` görünür.

## Doğrulama Kuralları

Doğrulama aracı yalnızca CSV başlıklarına bakmaz; satır mantığını da kontrol eder:

- Fiyat alanları sıfırdan büyük olmalıdır.
- `high`, `open` ve `close` değerlerinden düşük olamaz.
- `low`, `open` ve `close` değerlerinden yüksek olamaz.
- Aynı `symbol + date` için tekrar eden fiyat satırı kabul edilmez.
- `sessionType` yalnızca `full`, `half` veya `closed` olabilir.
- Kapalı günlerde fiyat satırı girilmişse rapora uyarı düşer.
- Gereksinim dışı semboller, eksik zorunlu semboller ve takvimde olmayan fiyat tarihleri uyarı olarak listelenir.
- Rapor `warnings` ve `nextActions` alanlarıyla editörün bir sonraki adımını açıkça gösterir.

## Mevcut Durum

Şablon dosyaları gerçek piyasa verisi içermez. Bu yüzden doğrulama raporunun `valid_schema_with_coverage_gaps` dönmesi beklenir. Bu sonuç, dosya biçiminin doğru olduğunu ama gerçek fiyat serilerinin henüz yüklenmediğini gösterir.
