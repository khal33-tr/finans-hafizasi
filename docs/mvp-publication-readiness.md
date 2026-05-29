# MVP Yayın Hazırlığı

Bu doküman, resmi fiyat verisi beklenirken hangi kayıtların hangi seviyede kullanılabileceğini netleştirir. Ana prensip basit: kaynak bulunan olay gösterilebilir, fakat fiyat tepkisi hesaplanmadan doğrulanmış piyasa tepkisi gibi sunulmaz.

## Bugünkü Durum

- 20 candidate olayda doğrudan kaynak bulundu.
- İlk 10 öncelikli hissede kaynaklı arşiv görünümü hazır.
- 0 kayıt verified statüsünde.
- Tüm kayıtlar fiyat, hacim ve BIST 100 karşılaştırması için resmi/lisansı net piyasa verisi bekliyor.
- 90G, 180G ve 1Y pencereleri uzun izleme olarak ayrı takip ediliyor; kısa tepki yayını için engel değildir.

## Yayın Seviyeleri

| Seviye | Ne gösterilir? | Ne gösterilmez? |
|---|---|---|
| Kaynaklı arşiv | KAP/şirket kaynağı, olay tarihi, tarafsız özet, veri bekleniyor etiketi | Fiyat tepkisi, hacim çarpanı, BIST 100 göreli performans |
| Doğrulanmış tepki | 1G, 3G, 1H, 2H, 30G hesapları; hacim; BIST 100 kıyası | Kaynağı/lisansı belirsiz fiyat verisi |
| Uzun izleme | 90G, 180G, 1Y sonuçları | Kısa tepki tamamlanmadan ana karar verisi gibi konumlandırma |

## İlk Yayın Paketi

İlk görünür içerik paketi, kaynaklı arşiv olarak ilk 10 hisseyi taşıyabilir:

1. THYAO
2. TUPRS
3. ASELS
4. KCHOL
5. SAHOL
6. EREGL
7. SISE
8. BIMAS
9. AKBNK
10. GARAN

Bu paket projenin özünü gösterir: haber yorumu değil, olayın kaynağını ve veri bekleme durumunu açık eden piyasa hafızası.

## İlk Hesaplama Pilotu

Resmi fiyat verisi geldiğinde ilk hesaplama pilotu şu kayıtlarla yapılır:

- `tuprs-2025-kar-dagitim-onerisi`
- `thyao-2026-ilk-ceyrek-finansal-sonuclari`
- `garan-2026-ilk-ceyrek-finansal-sonuc-sunumu`

TUPRS kısa tepki penceresi tarihsel olarak oluştu. THYAO ve GARAN için kısa tepki 30G penceresi 2026-06-06 aralığına kadar veri ister. Uzun izleme ayrıca 2027 pencerelerine kadar takip edilir.

## Doğrulama Kapısı

Bir kayıt ancak şu kontrollerden sonra `verified` olabilir:

- Birincil kaynak linki mevcut.
- Açıklama zamanı ve tepki başlangıç günü kontrol edildi.
- Düzeltilmiş kapanış, hacim ve XU100 serileri girildi.
- Import doğrulama raporu hata vermedi.
- Hesaplama çıktısı tekrar üretilebilir.
- Editör, metnin yatırım tavsiyesi içermediğini kontrol etti.

## Güncel Özet Dosyası

Makine tarafından okunacak özet:

- `data/mvp-publication-readiness.json`

Yeniden üretmek için:

```bash
npm run generate:mvp-readiness
```

Sistem testi bu dosyanın aday olaylarla uyumlu olduğunu kontrol eder.
