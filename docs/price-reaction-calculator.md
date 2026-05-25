# Fiyat Tepkisi Hesaplayıcı

Bu doküman, Finans Hafızası'nın olay sonrası fiyat tepkisi hesaplama motorunun tekrar üretilebilir sürümünü tanımlar.

## Amaç

Hesaplayıcı, bir olayın baz işlem tarihinden sonra hisse fiyatının ve BIST 100 kıyasının nasıl değiştiğini üretir.

Kısa tepki pencereleri:

- 1G
- 3G
- 1H
- 2H
- 30G

Uzun izleme pencereleri:

- 90G
- 180G
- 1Y

Uzun izleme, ilk piyasa tepkisini değil olayın daha sonra bıraktığı izi okumak için kullanılır.

## Ana Dosyalar

- `lib/price-reaction-calculator.js`
- `scripts/generate-sample-calculation.mjs`
- `data/sample-price-bars.json`
- `data/sample-calculation-output.json`
- `data/calculation-inputs.json`

## Önemli Not

`data/sample-price-bars.json` gerçek piyasa verisi değildir. Bu dosya yalnızca hesap motorunun doğru çalıştığını görmek için yapay olarak oluşturulmuş örnek veridir.

Gerçek yayın verisi için fiyat, hacim, düzeltilmiş kapanış ve BIST 100 serileri güvenilir veri sağlayıcıdan veya doğrulanmış CSV içe aktarma sürecinden gelmelidir.

## Hesap Fonksiyonları

`lib/price-reaction-calculator.js` içindeki temel fonksiyonlar:

- `resolveWindowEndDate`: pencere bitiş tarihini işlem takvimine göre bulur.
- `calculateEventReaction`: tek olay için tüm fiyat tepkisi sonucunu üretir.
- `calculateAllEventReactions`: birden fazla olay için toplu hesap yapar.
- `calculateVolumeMultiple`: olay günündeki hacmi önceki 20 işlem günü ortalamasıyla kıyaslar.

## Üretilen Alanlar

Her pencere için şu alanlar üretilir:

- `baseDate`
- `endDate`
- `basePrice`
- `endPrice`
- `stockReturnPct`
- `indexReturnPct`
- `relativeReturnPct`

Hacim için şu alanlar üretilir:

- `eventDayVolume`
- `previousAverageVolume`
- `volumeMultiple`

## Örnek Hesabı Üretme

```bash
node scripts/generate-sample-calculation.mjs
```

Codex ortamında kullanılan bundled Node ile:

```powershell
& 'C:\Users\Windows 11\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\scripts\generate-sample-calculation.mjs
```

Komut, `data/sample-calculation-output.json` dosyasını yeniden üretir.

## Yayına Geçmeden Önce

- BIST işlem takvimi resmi veya güvenilir bir kaynakla doldurulmalıdır.
- Hisse ve XU100 fiyat serileri gerçek veriye bağlanmalıdır.
- Temettü ve sermaye işlemleri için `adjustedClose` alanı doğrulanmalıdır.
- Kısa tepki pencereleri yayın olgunluğunu belirler.
- 90G, 180G ve 1Y pencereleri uzun izleme için ayrıca tamamlanır.
