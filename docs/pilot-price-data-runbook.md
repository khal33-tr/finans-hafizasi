# Pilot Fiyat Verisi Runbook

Bu runbook, ilk gerçek fiyat verisi pilotunun nasıl yürütüleceğini anlatır.

## Pilot Kapsamı

İlk pilot üç olayla sınırlıdır:

- `thyao-2026-ilk-ceyrek-finansal-sonuclari`
- `garan-2026-ilk-ceyrek-finansal-sonuc-sunumu`
- `tuprs-2025-kar-dagitim-onerisi`

Bu seçim üç şeyi aynı anda test eder:

- Finansal sonuç açıklaması
- Banka finansal sonucu
- Temettü nedeniyle `adjustedClose` kontrolü

## 25 Mayıs 2026 Durumu

25 Mayıs 2026 itibarıyla üç pilot olayın tamamı aynı anda `ready` yapılamaz. THYAO ve GARAN kayıtlarının 30G penceresi henüz oluşmamıştır.

Bugün tam hesaplanabilir kayıt:

- `tuprs-2025-kar-dagitim-onerisi`

Bekleyen kayıtlar:

- `thyao-2026-ilk-ceyrek-finansal-sonuclari`
- `garan-2026-ilk-ceyrek-finansal-sonuc-sunumu`

## Kullanılacak Dosyalar

- `data/pilot-price-import-plan.json`
- `data/imports/pilot-price-data-requirements.json`
- `data/imports/pilot-required-series.csv`
- `data/imports/pilot-required-dates.csv`
- `data/imports/pilot-prices.csv`
- `data/imports/pilot-trading-calendar.csv`
- `data/imports/pilot-import-manifest.json`
- `data/imports/pilot-window-maturity-report.json`
- `data/imports/today-completable-price-data-requirements.json`
- `data/imports/future-window-price-data-requirements.json`

## Şablonları Yeniden Üretme

```bash
node scripts/generate-pilot-import-templates.mjs
```

Bu komut pilot sembolleri, gerekli tarih listesi ve boş CSV giriş dosyalarını üretir.

Pencere olgunluk raporunu yeniden üret:

```bash
node scripts/generate-pilot-readiness.mjs
```

## Veri Girişi

1. `data/imports/pilot-required-series.csv` dosyasındaki sembolleri ve tarih aralıklarını kontrol et.
2. `data/imports/pilot-required-dates.csv` dosyasındaki tarihleri resmi veya lisanslı işlem takvimiyle doldur.
3. `data/imports/pilot-trading-calendar.csv` dosyasına yalnızca doğrulanmış takvim satırlarını yaz.
4. `data/imports/pilot-prices.csv` dosyasına THYAO, GARAN, TUPRS ve XU100 fiyat satırlarını ekle.
5. Her fiyat satırında `source` alanını doldur.

## Doğrulama

```bash
node scripts/validate-price-import.mjs --prices=data/imports/pilot-prices.csv --calendar=data/imports/pilot-trading-calendar.csv --requirements=data/imports/pilot-price-data-requirements.json --out=data/imports/pilot-validation-report.json
```

Kabul için raporda üç pilot olayın da `ready` görünmesi gerekir.

Bugün tamamlanabilir TUPRS alt pilotunu doğrulama:

```bash
node scripts/validate-price-import.mjs --prices=data/imports/today-completable-prices.csv --calendar=data/imports/today-completable-trading-calendar.csv --requirements=data/imports/today-completable-price-data-requirements.json --out=data/imports/today-completable-validation-report.json
```

## Editör Kontrolü

TUPRS temettü olayı için `adjustedClose` alanı ayrıca kontrol edilmelidir. Kaynak bu alanın nasıl hesaplandığını açıklamıyorsa kayıt `verified` durumuna alınmamalıdır.
