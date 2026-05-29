# Canli Site QA Kontrolu

Tarih: 2026-05-29

Bu kontrol, resmi veri saglayicilarindan cevap beklerken MVP yayina hazirlik risklerini azaltmak icin yapildi.

## Kontrol Edilen Alanlar

- Ana sayfa arama davranisi.
- Olay arsivi filtre ve URL davranisi.
- Hisse ve olay detay rotalari.
- Veri operasyonu ekraninda resmi veri bekleme durumu.
- Metodoloji ve yasal uyari sayfalari.
- Sitemap, robots ve canonical temel ayarlari.
- Mobil menunun dar ekranlarda tasma riski.
- GitHub Actions sistem test akisi.

## Bulunan ve Duzeltilen Konular

- Ana sayfa aramasinda eslesme yoksa tum liste tekrar gorunuyordu. Artik bos durum mesaji gosterilir.
- Ana sayfadaki zaman pencereleri tiklanabilir buton gibi gorunuyordu, fakat islevi yoktu. Artik statik pencere etiketleri olarak gosterilir.
- Mobil menude dar ekranda tasma riski vardi. Menu linkleri artik satir kirarak yerlestirilir.
- Metadata tabani `finanshafizasi.com`, sitemap ise `www.finanshafizasi.com` kullaniyordu. Canonical/OG tabani `www.finanshafizasi.com` ile uyumlu hale getirildi.
- Robots host degeri URL yerine host olarak duzenlendi.
- Ana sayfa, olay arsivi, hisse sayfalari, olay detaylari ve veri operasyonu ekranina veri dogrulama notu eklendi.
- Fiyat/hacim degeri henuz dogrulanmayan kartlarda bekleyen alanlar daha acik gosterilir.

## Bilinen Durumlar

- Resmi fiyat verisi henuz gelmedigi icin import raporlari `valid_schema_with_coverage_gaps` durumunda kalabilir.
- Canli HTTP kontrolu bu yerel ortamda gecici DNS/erisilebilirlik hatasi verdi; DNS kaydi ayrica cozumlendi ve Vercel hedefleri gorundu.
- Next build yerelde calistirilmadi; bu makinede `node_modules` yok.

## Kabul Kriteri

- GitHub Actions `System Tests` yesil kalmali.
- Kullanici, gercek veri henuz yokken kayitlarin veri bekledigini acik sekilde gormeli.
- Ana sayfa, olay arsivi, hisse sayfalari, veri operasyonu, metodoloji ve yasal uyari rotalari yayindan once tekrar canli olarak kontrol edilmeli.
