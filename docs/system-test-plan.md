# Sistem Test Plani

Bu plan, resmi piyasa verisi saglayicilarindan cevap beklerken Finans Hafizasi'nin hesaplama motorunu ve veri iceri alma hattini dogrulamak icin kullanilir.

## Kapsam

- Getiri hesaplari: pozitif, negatif ve gecersiz baz deger senaryolari.
- Islem gunu mantigi: kapali gun atlama, 1G, 3G, 30G, 90G, 180G ve 1Y pencereleri.
- Olay tepki motoru: THYAO ornek olayi icin hisse, XU100 ve goreli getiri sonuclari.
- Hacim carpanlari: olay gunu hacmi / onceki 20 islem gunu ortalama hacmi.
- Eksik veri davranisi: gerekli fiyat bari yoksa hesaplamanin acik hata vermesi.
- CSV iceri alma: tamamlanmis minimal dosyanin kabul edilmesi ve hatali semanin reddedilmesi.

## Komutlar

```bash
npm run test:system
npm run generate:sample-calculation
npm run validate:pilot-import
npm run validate:today-completable
```

GitHub'a yukleme yapildiginda bu kontroller `.github/workflows/system-tests.yml` uzerinden otomatik calisir.

Node modules yuklu degilse sistem testi dogrudan Node ile de calisir:

```bash
node scripts/run-system-tests.mjs
```

## Beklenen Sonuc

- `test:system` tum maddeleri `ok` olarak bitirmeli.
- `generate:sample-calculation` `data/sample-calculation-output.json` dosyasini yeniden uretmeli.
- `validate:pilot-import` ve `validate:today-completable`, resmi veri gelene kadar `valid_schema_with_coverage_gaps` donebilir. Bu durum semanin calistigini, fakat fiyat/takvim satirlarinin henuz doldurulmadigini gosterir.

## Kabul Kriteri

Resmi veri sisteme alinmadan once sistem testi gecmeli. Resmi veri geldikten sonra ayni komutlar tekrar calistirilir; o asamada import raporlarinda kapsam eksikleri kapanmali ve ilgili olaylar `ready` durumuna gelmelidir.
