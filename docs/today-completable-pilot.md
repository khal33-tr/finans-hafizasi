# Bugün Tamamlanabilir Pilot

Bu not, 25 Mayıs 2026 itibarıyla hangi pilot kayıtların gerçek fiyat verisiyle tamamen hesaplanabileceğini ayırır.

## Tarih Gerçeği

Pilot kapsamında üç olay vardır:

- `tuprs-2025-kar-dagitim-onerisi`
- `thyao-2026-ilk-ceyrek-finansal-sonuclari`
- `garan-2026-ilk-ceyrek-finansal-sonuc-sunumu`

25 Mayıs 2026 itibarıyla yalnızca TUPRS kaydının 30G penceresi geçmiştedir. THYAO ve GARAN kayıtlarında 30G penceresi 1 Haziran 2026 civarında oluşur; bu yüzden bu iki kayıt bugün tam `ready` yapılamaz.

## Bugün Doldurulacak Dosyalar

- `data/imports/today-completable-price-data-requirements.json`
- `data/imports/today-completable-required-series.csv`
- `data/imports/today-completable-prices.csv`
- `data/imports/today-completable-trading-calendar.csv`

## Gerekli Seri

Bugün tamamlanabilir kayıt için şu seriler gerekir:

- `TUPRS`
- `XU100`

Tarih aralığı:

- Başlangıç: `2026-01-26`
- Bitiş: `2026-04-18`

## Doğrulama Komutu

```bash
node scripts/validate-price-import.mjs --prices=data/imports/today-completable-prices.csv --calendar=data/imports/today-completable-trading-calendar.csv --requirements=data/imports/today-completable-price-data-requirements.json --out=data/imports/today-completable-validation-report.json
```

## Kaynak Notu

Fiyat verisi Borsa İstanbul DataStore, Borsa İstanbul lisanslı veri dağıtıcıları veya lisans/kullanım şartı net bir terminal CSV ihracı üzerinden gelmelidir. Kaynak ve lisans netleşmeden public fiyat verisi yayımlanmamalıdır.

## Bekleyen Pilot

THYAO ve GARAN kayıtları için `data/imports/future-window-price-data-requirements.json` dosyası tutulur. Bu kayıtlar 1 Haziran 2026 sonrası 30G penceresi oluşunca tekrar ele alınmalıdır.
