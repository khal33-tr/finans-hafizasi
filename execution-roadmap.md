# Finans Hafizasi Uygulama Yol Haritasi

Bu yol haritasi, canli domain yayina alindiktan sonra urunun hangi sirayla gelistirilecegini tanimlar. Amac, her fazda kullanicinin gorebilecegi ve test edebilecegi net bir cikti uretmektir.

## Faz 1: Public Urun Temeli

Durum: Basladi.

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

Durum: Basladi.

Hedef:

- Finans Hafizasi daha profesyonel, okunabilir ve guven veren bir medya/veri urunu gibi gorunmeli.
- Ana sayfa daha iyi yonlendirme yapmali.
- Hisse ve olay detay sayfalari daha kolay taranabilir olmali.

Isler:

1. Ana sayfaya daha net "son olaylar" ve "hisseye git" akisi eklendi.
2. Olay kartlarinda kaynak ve zaman pencerelerini daha okunur yap.
3. Hisse detay sayfasinda kapsam ozet bloklari eklendi.
4. Mobil gorunumu tekrar kontrol et.

Basari kriteri:

- Masaustu ve mobilde metin tasmasi yoktur.
- Kullanici ana sayfadan hisse ve olay detayina kolayca gider.
- Finans urunu ciddiyeti korunur.

## Faz 3: Veri Standardi ve Icerik Sistemi

Hedef:

- Demo veriler daha duzenli bir icerik modeline tasinmali.
- Ilk 20 hisse icin yayinlanabilir veri giris standardi hazir olmali.

Isler:

1. Sirket, olay, kaynak, fiyat tepkisi ve soylem alanlarini kesinlestir.
2. Ilk 20 hisse icin seed veri dosyasi olustur.
3. Her hisse icin en az 3 olay hedefini parcalara bol.
4. Kaynak ve veri notu alanlarini zorunlu hale getir.

Basari kriteri:

- Her kayit ayni alanlari kullanir.
- Eksik veri notu public sayfada gorunur.
- Gercek veri entegrasyonuna hazir yapi olusur.

## Faz 4: Fiyat Tepkisi Hesaplama Motoru

Hedef:

- Olay tarihine gore fiyat pencereleri otomatik hesaplanabilir hale gelmeli.

Isler:

1. Fiyat veri kaynagi sec.
2. Islem gunu takvimi mantigini kur.
3. 1G, 3G, 1H, 2H ve 30G hesaplarini yaz.
4. BIST 100 karsilastirmasini ekle.
5. Hacim carpani hesabini ekle.

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
Faz 1'i tamamla: SEO dosyalari, sitemap, robots ve 404 sayfasi.
```
