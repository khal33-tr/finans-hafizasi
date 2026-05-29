# Canli Olay Arsivi QA - 2026-05-29

Bu kontrol, `github guncelleme 44` sonrasinda olay arsivi ve olay detay sayfalarinin canli yayindaki durumunu izlemek icin hazirlandi.

## Kontrol Edilen Rotalar

| Rota | Durum | Not |
|---|---|---|
| `/` | 200 OK | Ana sayfa aciliyor. |
| `/olaylar` | 200 OK | Ilk yayin paketi bolumu gorunuyor. |
| `/olaylar/thyao-2026-ilk-ceyrek-finansal-sonuclari` | 200 OK | Detay sayfasinda yayin durumu paneli gorunuyor. |
| `/hisseler` | 200 OK | Hisse arsivi aciliyor. |
| `/hisseler/THYAO` | 200 OK | Hisse detay arsivi aciliyor. |
| `/veri-operasyonu` | 200 OK | MVP yayin hazirligi ozeti gorunuyor. |
| `/metodoloji` | 200 OK | Metodoloji sayfasi aciliyor. |
| `/yasal-uyari` | 200 OK | Yasal uyari sayfasi aciliyor. |

## Gorsel Kontrol

- `Application error` veya `Build Error` gorulmedi.
- Masaustu gorunumde yatay tasma tespit edilmedi.
- `Ilk yayin paketi`, `Kaynakli arsiv`, `Verified` ve detay sayfasi durum paneli canli yayinda gorundu.
- Bazi metin linklerinin tiklama alani sinirda kaldigi icin `event-title-link`, `breadcrumb`, `source-link` ve `badge` siniflarinda minimum yukseklik iyilestirmesi yapildi.

## Kalan Yapilacaklar

1. Mobil viewport icin olay arsivi ve detay sayfasini tekrar goruntu kontrolunden gecir.
2. Filtreleri kullanarak `ticker`, `olay tipi`, `veri durumu` ve `import durumu` secimlerinin URL parametreleriyle uyumlu calistigini kontrol et.
3. Ilk 10 kaynakli olay listesindeki her kartin dogru detay sayfasina gittigini orneklemle dogrula.
4. Resmi veri saglayici donusu gelene kadar hicbir kaydi `verified` yapma.
5. Veri saglayici donusu gelirse once TUPRS hesaplama pilotunu calistir, sonra THYAO ve GARAN icin 30G penceresi olgunlugunu kontrol et.

## QA Ciktisi

Tarayici ekran goruntuleri ve JSON kontrol raporu lokal olarak su klasore kaydedildi:

`C:\Users\Windows 11\Desktop\finans-hafizasi-qa-44`
