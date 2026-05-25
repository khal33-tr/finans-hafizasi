# Pilot Import Operatör Kontrol Listesi

Bu dosya gerçek fiyat verisi girilirken hata payını azaltmak için üretilir.

## Kapsam

- Olay sayısı: 3
- Sembol sayısı: 4
- Semboller: GARAN, THYAO, TUPRS, XU100
- Kısa tepki tarih aralığı: 2026-01-26 - 2026-06-06

## Doldurma Sırası

1. `pilot-required-series.csv` dosyasından sembol ve tarih aralığını kontrol et.
2. `pilot-required-dates.csv` dosyasını resmi/lisanslı BIST işlem takvimine göre doldur.
3. Sadece işlem günü olan tarihler için `pilot-prices.csv` içine fiyat satırları gir.
4. Hisse satırlarında `volume` zorunludur; `XU100` satırında boş kalabilir.
5. Her satırda `source` alanına veri sağlayıcı ve dışa aktarım notu yaz.
6. Temettü içeren olaylarda `adjustedClose` alanını ayrıca kontrol et.

## Hızlı Format Kuralları

- Tarih: `YYYY-MM-DD`
- Ondalık: virgül değil nokta kullan, örnek `123.45`
- `sessionType`: `full`, `half` veya `closed`
- Kapalı günlerde fiyat satırı girme.
- Aynı `symbol + date` için ikinci satır girme.

## Doğrulama Komutu

```bash
node scripts/validate-price-import.mjs --prices=data/imports/pilot-prices.csv --calendar=data/imports/pilot-trading-calendar.csv --requirements=data/imports/pilot-price-data-requirements.json --out=data/imports/pilot-validation-report.json
```

Rapor `ready` dönmeden public veri yayınlama.
