# Finans Hafizasi Editor Akisi

## Amac

Finans Hafizasi'nin guvenilirligi, olaylarin otomatik toplanmasindan cok yayinlanmadan once dogru denetlenmesine baglidir. Bu dokuman, MVP'de kullanilacak yari otomatik ve editor onayli akis standardini tanimlar.

## Genel Akis

```text
Kaynak bulundu
  -> Olay adayi olustu
  -> Sistem sirket, kategori ve tarih onerdi
  -> Editor kaynak ve tarih dogruladi
  -> Fiyat tepkisi hesaplandi
  -> Editor ozet ve veri notunu onayladi
  -> Olay yayinlandi
```

## 1. Olay Adayi Olusturma

MVP'de olay adayi iki sekilde olusabilir:

- Editor manuel olarak kaynak linki girer.
- Sistem KAP veya haber kaynagindan aday olay onerir.

Olay adayinda minimum bilgiler:

- Ilgili hisse
- Kaynak linki
- Kaynak tipi
- Kaynak basligi
- Kamuya aciklanma tarihi
- Onerilen olay kategorisi

## 2. Ilk Sistem Onerisi

Sistem su alanlari tahmin eder:

- Hangi hisseyle ilgili oldugu
- Olay kategorisi
- Olay tarihi
- Seans ici veya seans sonrasi olup olmadigi
- Ilk piyasa tepki tarihi
- Kisa tarafsiz ozet taslagi

Bu alanlar dogrudan yayinlanmaz. Editor onayi gerekir.

## 3. Editor Kontrol Listesi

Editor yayin oncesinde su sorulari yanitlar:

- Bu olay gercekten yayinlanmaya deger mi?
- Kaynak guvenilir mi?
- Kaynak birincil kaynak mi, ikincil kaynak mi?
- Olayin tarihi dogru mu?
- Aciklama seans sirasinda mi, seans kapandiktan sonra mi geldi?
- Ayni gun ayni hisseyle ilgili baska onemli olay var mi?
- Baslik sansasyonel veya yonlendirici mi?
- Ozet yatirim tavsiyesi gibi okunuyor mu?
- Fiyat tepkisi dogru tarih pencerelerinden hesaplandi mi?
- Veri eksikligi varsa public sayfada acikca gorunuyor mu?

## 4. Olay Onem Skoru

Her olay 1 ile 5 arasinda bir onem skoru alir.

- 1: Arsivlik fakat dusuk etki potansiyeli
- 2: Hisse takipcileri icin anlamli
- 3: Genel BIST yatirimcisinin ilgisini cekebilir
- 4: Genis haber ve piyasa etkisi potansiyeli
- 5: Cok yuksek onemli, ana sayfada one cikarilmali

MVP ana sayfasinda genellikle 3 ve uzeri olaylar gosterilir.

## 5. Baslik Standardi

Basliklar haber tiklatma diliyle degil, olay arsivi diliyle yazilir.

Kabul edilebilir:

```text
THYAO 2024 ikinci ceyrek finansal sonuclari sonrasi piyasa tepkisi
TUPRS temettu dagitim karari sonrasi 30 gunluk fiyat hareketi
ASELS yeni sozlesme aciklamasi sonrasi hacim tepkisi
```

Kabul edilmez:

```text
THYAO ucacak mi?
TUPRS yatirimcisina buyuk firsat
ASELS'te tarihi alim sinyali
```

## 6. Ozet Standardi

Ozetler uc cumleyi gecmemelidir:

- Ne oldu?
- Kaynak ne diyor?
- Sistem hangi tepkileri gosteriyor?

Ornek:

```text
Sirket ikinci ceyrek finansal sonuclarini kamuya acikladi. Bu sayfa, aciklama sonrasi standart zaman pencerelerinde hisse fiyatinin, BIST 100'e gore relatif performansin ve hacim tepkisinin nasil degistigini gosterir.
```

## 7. Fiyat Tepkisi Kontrolu

Fiyat motoru hesaplama yaptiktan sonra editor sunlari kontrol eder:

- Baz tarih dogru mu?
- Olay seans sonrasiysa ilk islem gunu dogru alinmis mi?
- Hisse fiyatinda temettu veya bolunme duzeltmesi gerekiyor mu?
- BIST 100 karsilastirma tarihi ayni pencereyle uyumlu mu?
- Hacim ortalamasi onceki 20 islem gununden mi geliyor?

## 8. Soylem Ozeti Kontrolu

MVP'de soylem katmani temkinli kullanilir.

Kabul edilebilir ifadeler:

- "Kamuya acik yorumlarda olumlu soylem yogunlugu onceki haftaya gore daha belirgin goruldu."
- "Yorumlar karisik seyretti; veri ornegi sinirli oldugu icin dusuk guven notu verildi."

Kabul edilmez:

- "Yatirimci alima geciyor."
- "Piyasa bu haberi kesin olumlu fiyatladi."
- "Sosyal medyada al sinyali var."

## 9. Yayin Durumlari

Olay durumlari:

- `candidate`: Sistem veya editor tarafindan yeni olusturuldu.
- `needs_review`: Editor kontrolu bekliyor.
- `approved`: Kaynak, tarih ve ozet onaylandi.
- `published`: Public sitede yayinda.
- `archived`: Yayindan kaldirildi ama kayit saklaniyor.
- `rejected`: Yayinlanmaya uygun degil.

## 10. Duzeltme Politikasi

Bir olay yayinlandiktan sonra hata bulunursa:

- Hata notu editor kaydina eklenir.
- Gerekirse olay gecici olarak yayindan kaldirilir.
- Duzeltilen alanlar kayit altina alinir.
- Public sayfada anlamli bir veri degisikligi varsa "guncelleme notu" gosterilir.

## 11. Gunluk Editor Rutini

MVP icin basit gunluk akis:

1. KAP ve guvenilir haber kaynaklarindan aday olaylari tara.
2. Ilk hisse sepetindeki olaylari onceliklendir.
3. Onem skoru 3 ve uzeri olaylari once isle.
4. Kaynak ve tarih onayini yap.
5. Fiyat hesaplamasini calistir.
6. Ozet ve veri notunu duzenle.
7. Yayina al.
8. Ana sayfa one cikan olaylarini guncelle.

## 12. Haftalik Kalite Kontrol

Haftada bir kez:

- Rastgele 10 yayinlanmis olay tekrar kontrol edilir.
- Kaynak linkleri calisiyor mu bakilir.
- Fiyat pencereleri tekrar hesaplanir.
- Duzeltme orani takip edilir.
- En cok okunan olaylarda baslik ve ozet dili incelenir.
