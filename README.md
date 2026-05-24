# Finans Hafizasi

Finans Hafizasi, Borsa Istanbul'da islem goren sirketlerde yasanan onemli olaylari kaynaklariyla birlikte arsivleyen; bu olaylardan sonra fiyat, hacim ve piyasa tepkisinin 1 gun, 3 gun, 1 hafta, 2 hafta ve 30 gun icinde nasil degistigini gosteren tarafsiz bir finans medya urunudur.

Urunun ana ilkesi:

> Yorum yapmaz. Yonlendirmez. Gecmisi duzenler, veriyi gosterir, kaynagi belirtir.

## Ilk MVP

- Hedef pazar: Turkiye
- Ilk kullanici: BIST yatirimcisi olan bireysel kullanici
- Ana domain: `finanshafizasi.com`
- Format: Medya urunu gibi okunabilir, veri terminali kadar metodolojik
- Kapsam: Secilmis populer BIST hisseleri ve onayli olay arsivi
- Veri modeli: Olay, fiyat tepkisi, endeks karsilastirmasi, hacim, kaynaklar, kamuya acik soylem ozeti

## Dosyalar

- `index.html`: Ilk statik prototip
- `styles.css`: Prototip gorsel dili
- `app.js`: Ornek olay verilerini ekrana basan istemci kodu
- `data/sample-events.json`: MVP icin ornek olay verileri
- `docs/product-blueprint.md`: Urun konumu, hedef kitle, sayfa yapisi
- `docs/methodology.md`: Olay secimi ve fiyat tepkisi hesaplama metodolojisi
- `docs/mvp-architecture.md`: MVP teknik mimarisi, rotalar, fazlar ve riskler
- `docs/data-model.md`: Sirket, olay, kaynak, fiyat tepkisi ve editor kayitlari icin veri modeli
- `docs/editor-workflow.md`: Yari otomatik ve editor onayli yayin akisi
- `docs/domain-brand-strategy.md`: Alinan domain, marka konumu ve global acilim notlari
- `docs/founder-action-plan.md`: Domain sonrasi kurucu ve teknik aksiyon plani
- `docs/vercel-deploy-guide.md`: Vercel deploy ve GoDaddy DNS baglama rehberi

## Siradaki Teknik Asama

1. MVP icin framework secimi yap.
2. Veritabani semasini bu dokumanlardaki modele gore olustur.
3. Public olay sayfasini gercek veri modeline bagla.
4. Admin panelde olay adayi, kaynak girisi ve editor onayi akisini kur.
5. Fiyat tepkisi hesaplama motorunun ilk surumunu yaz.
6. Ilk 20 hisse icin onayli olay arsivini doldur.

## MVP Yayin Cikisi Icin Minimum Hedef

- 20 hisse
- Hisse basina en az 3 onayli olay
- Toplam en az 60 olay
- Her olayda en az 1 kaynak
- Her olayda 1G, 3G, 1H, 2H ve 30G fiyat tepkisi
- BIST 100 relatif performans karsilastirmasi
- Metodoloji ve yasal uyari sayfalari

## Yasal Not

Finans Hafizasi yatirim tavsiyesi sunmaz. Platformda yer alan bilgiler gecmis olaylarin ve piyasa verilerinin incelenmesi amaciyla hazirlanir.
