# GitHub Kalite Kontrolu

Bu dosya, her GitHub yuklemesinden sonra hesaplama motorunun otomatik kontrol edilmesi icin kurulan GitHub Actions akisini aciklar.

## Ne Calisir?

Workflow dosyasi: `.github/workflows/system-tests.yml`

Her `main` branch yuklemesinden sonra su kontroller calisir:

- Script soz dizimi kontrolu.
- `npm run test:system`
- `npm run generate:sample-calculation`
- `npm run validate:pilot-import`
- `npm run validate:today-completable`
- Uretilen JSON dosyalarinin parse edilebilirligi.

## Sonucu Nereden Gorurum?

GitHub deposunda `Actions` sekmesine gir.

- Yesil isaret: testler gecti, yukleme teknik olarak saglam.
- Kirmizi isaret: bir test veya dosya kontrolu hata verdi.
- Sari/donen isaret: test halen calisiyor.

## Su An Beklenen Durum

Resmi fiyat verisi henuz gelmedigi icin import raporlari `valid_schema_with_coverage_gaps` donebilir. Bu hata degildir; CSV semasinin calistigini, fakat fiyat/takvim satirlarinin henuz eksik oldugunu gosterir.

Resmi veri geldiginde ayni kontroller calismaya devam edecek. O asamada eksik kapsamlar kapandikca raporlar `ready` durumuna yaklasmalidir.

## Yayin Karari

Canli yayina alinacak kritik veri degisikliklerinde once `Actions` sekmesindeki son calismanin yesil oldugunu kontrol et. Kirmiziysa dosya yukleme tamamlanmis olsa bile hesaplama veya import hattinda incelenmesi gereken bir sorun var demektir.
