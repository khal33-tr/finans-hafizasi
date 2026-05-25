# Finans Hafizasi Metodoloji Taslagi

## Olay Secimi

Bir olay arsive girebilmek icin en az bir guvenilir kaynakla dogrulanmalidir. MVP doneminde olay adaylari otomatik toplanir, ancak yayinlanmadan once editor tarafindan onaylanir.

Oncelikli kaynak tipleri:

- KAP bildirimleri
- Sirket yatirimci iliskileri duyurulari
- Borsa Istanbul duyurulari
- SPK ve resmi kurum aciklamalari
- Guvenilir finans haber kaynaklari

## Olay Siniflari

- Bilanco
- Temettu
- Bedelli veya bedelsiz sermaye artirimi
- Ihale veya sozlesme
- Yatirim karari
- Regulasyon
- Dava, ceza veya sorusturma
- Yonetim degisikligi
- Makro veya sektorel etki

## Olay Tarihi

Olay tarihi, bilginin kamuya acik hale geldigi ilk zaman olarak belirlenir. Eger bildirim seans kapandiktan sonra geldiyse ilk piyasa tepkisi bir sonraki islem gunu uzerinden degerlendirilir.

## Fiyat Tepkisi

Her olay icin standart zaman pencereleri hesaplanir:

- Olay gunu
- 1 islem gunu
- 3 islem gunu
- 1 hafta
- 2 hafta
- 30 takvim gunu veya en yakin islem gunu

Temel hesap:

```text
Getiri = (Pencere sonu kapanis fiyati - baz kapanis fiyati) / baz kapanis fiyati
```

Relatif getiri:

```text
Relatif getiri = Hisse getirisi - BIST 100 getirisi
```

Faz 4 hazirliginda bu hesaplar icin girdi sozlesmesi ayrica tanimlanmistir:

- `data/calculation-inputs.json`
- `data/trading-calendar-template.json`
- `docs/price-reaction-input-standard.md`

## Hacim Tepkisi

Hacim tepkisi, olay sonrasi islem hacminin onceki 20 islem gunu ortalamasina gore degisimiyle olculur.

```text
Hacim carpani = Olay gunu hacmi / Onceki 20 gun ortalama hacim
```

## Soylem Ozeti

Kamuya acik yorumlar yalnizca toplu egilim gostergesi olarak kullanilir. Tekil yorumlar yatirim sinyali gibi sunulmaz. Sistem pozitif, negatif ve notr soylem oranlarini gosterir; manipulasyon riski veya veri yetersizligi varsa bunu ayrica belirtir.

## Yayincilik Standardi

Her olay sayfasinda su bilgiler bulunmalidir:

- Olay tarihi
- Olay tipi
- Ilgili hisse
- Kaynaklar
- Tarafsiz ozet
- Fiyat tepkisi
- Endeks karsilastirmasi
- Hacim tepkisi
- Veri siniri veya notlar
