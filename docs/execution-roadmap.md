# Finans Hafizasi Uygulama Yol Haritasi

Bu yol haritasi, canli domain yayina alindiktan sonra urunun hangi sirayla gelistirilecegini tanimlar. Amac, her fazda kullanicinin gorebilecegi ve test edebilecegi net bir cikti uretmektir.

## Faz 1: Public Urun Temeli

Durum: Tamamlandi.

Hedef:

- Ana sayfa, hisse listesi, hisse detay, olay detay, metodoloji ve yasal uyari sayfalari calismali.
- Site SEO icin temel dosyalara sahip olmali.
- Kullanici ve arama motorlari icin sayfa yapisi anlasilir olmali.

Isler:

1. Cok sayfali rota yapisi kuruldu.
2. Hisse ve olay detay sayfalari kuruldu.
3. Metodoloji ve yasal uyari sayfalari kuruldu.
4. `robots.txt` ve `sitemap.xml` eklendi.
5. 404 sayfasi eklendi.

Basari kriteri:

- `www.finanshafizasi.com` uzerinde tum temel sayfalar acilir.
- 404 yoktur.
- Konsol hatasi yoktur.
- Sitemap ve robots dosyalari acilir.

## Faz 2: Gorsel ve UX Iyilestirme

Durum: Tamamlandi.

Hedef:

- Finans Hafizasi daha profesyonel, okunabilir ve guven veren bir medya/veri urunu gibi gorunmeli.
- Ana sayfa daha iyi yonlendirme yapmali.
- Hisse ve olay detay sayfalari daha kolay taranabilir olmali.

Isler:

1. Ana sayfaya daha net "son olaylar" ve "hisseye git" akisi eklendi.
2. Olay kartlarinda kaynak, detay aksiyonlari ve zaman pencereleri daha okunur hale getirildi.
3. Hisse detay sayfasinda kapsam ozet bloklari eklendi.
4. Mobil gorunum icin kart, aksiyon ve tepki tablolari daha stabil hale getirildi.

Basari kriteri:

- Masaustu ve mobilde metin tasmasi yoktur.
- Kullanici ana sayfadan hisse ve olay detayina kolayca gider.
- Finans urunu ciddiyeti korunur.

## Faz 3: Veri Standardi ve Icerik Sistemi

Durum: Tamamlandi.

Hedef:

- Demo veriler daha duzenli bir icerik modeline tasinmali.
- Ilk 20 hisse icin yayinlanabilir veri giris standardi hazir olmali.

Isler:

1. Sirket, olay, kaynak, fiyat tepkisi ve soylem alanlarini kesinlestirildi.
2. Ilk 20 hisse icin seed veri yapisi olusturuldu.
3. Her hisse icin oncelikli olay hedefleri eklendi.
4. Kaynak, dogrulama durumu ve veri notu alanlari public sayfalarda gorunur hale getirildi.
5. `data/research-queue.json` ile 20 hisse icin 60 olay arastirma hedefi olusturuldu.
6. `docs/event-research-queue.md` ile ilk editor arastirma sirasi belirlendi.
7. Ilk 10 arastirma hedefi icin KAP kaynakli candidate kayitlar olusturuldu.

Basari kriteri:

- Her kayit ayni alanlari kullanir.
- Eksik veri notu public sayfada gorunur.
- Gercek veri entegrasyonuna hazir yapi olusur.

## Faz 4: Fiyat Tepkisi Hesaplama Motoru

Durum: Basladi.

Hedef:

- Olay tarihine gore fiyat pencereleri otomatik hesaplanabilir hale gelmeli.

Isler:

1. Fiyat veri kaynagi sec.
2. `data/calculation-inputs.json` ile ilk 10 candidate icin hesaplama girdileri standartlastirildi.
3. `data/trading-calendar-template.json` ile BIST islem takvimi sablonu olusturuldu.
4. Islem gunu takvimi mantigi icin saf hesaplayici fonksiyon eklendi.
5. 1G, 3G, 1H, 2H ve 30G hesaplari yazildi.
6. BIST 100 karsilastirmasi eklendi.
7. Hacim carpani hesabi eklendi.
8. THYAO icin gercek piyasa verisi olmayan ornek fiyat fixture dosyasi eklendi.
9. Ornek hesap ciktisi tekrar uretilebilir script ile olusturuldu.
10. CSV tabanli fiyat ve islem takvimi ice aktarma standardi eklendi.
11. Ilk 10 candidate icin gerekli fiyat veri araliklari uretildi.
12. Fiyat ve takvim CSV dogrulama raporu eklendi.
13. Piyasa verisi kaynak ve lisans ilkesi tanimlandi.
14. THYAO, GARAN ve TUPRS icin ilk pilot fiyat verisi giris plani olusturuldu.
15. Pilot fiyat ve takvim CSV dosya yapisi uretildi.
16. 25 Mayis 2026 itibariyla pilot pencere olgunlugu ayrildi.
17. Bugun tamamlanabilir TUPRS pilotu icin ayri gereksinim dosyalari olusturuldu.
18. Public sitede veri operasyonu, veri durumu ve yayin oncesi kontrol hattini gosteren arayuz eklendi.

Basari kriteri:

- Bir olay icin hesaplar tekrar uretilebilir olur.
- Tatil gunu ve seans sonrasi durumlari notlanir.

## Faz 5: Editor Paneli

Hedef:

- Olaylar manuel veya yari otomatik olarak girilip onaylanabilir hale gelmeli.

Isler:

1. Olay adayi olusturma ekrani.
2. Kaynak ekleme ekrani.
3. Editor onay durumu.
4. Yayinla, arsivle, reddet aksiyonlari.
5. Degisiklik gecmisi.

Basari kriteri:

- Bir kayit admin/editor akisiyle yayina alinabilir.
- Yayin oncesi kaynak, tarih ve veri notu kontrol edilir.

## Faz 6: Veritabani ve Kalici Altyapi

Hedef:

- Dosya tabanli demo veriden PostgreSQL tabanli kalici veriye gecmek.

Isler:

1. Prisma veya Drizzle sec.
2. PostgreSQL olustur.
3. Veri modelini migrasyonlara cevir.
4. Seed veriyi veritabanina aktar.
5. Public sayfalari veritabanindan besle.

Basari kriteri:

- Yeni olaylar kod deploy etmeden eklenebilir.
- Public sayfalar veritabanindan veri okur.

## Faz 7: Premium ve Buyume Katmani

Hedef:

- Ucretsiz medya urunu ustune premium veri/analiz ozellikleri eklemek.

Isler:

1. Gelismis filtreler.
2. CSV/Excel disari aktarma.
3. Izleme listesi.
4. Alarm sistemi.
5. API ve profesyonel raporlar.

Basari kriteri:

- Ucretsiz kullanici deger alir.
- Premium kullanici daha derin veri ve is akisi elde eder.

## Anlik Oncelik

Siradaki odak:

```text
Faz 4: Once TUPRS icin bugun tamamlanabilir fiyat ve BIST takvim verisini doldur; THYAO ve GARAN'i 1 Haziran 2026 sonrasi 30G penceresi olusunca tamamla.
```
