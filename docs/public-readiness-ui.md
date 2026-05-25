# Public Veri Durumu Arayüzü

Bu doküman, gerçek fiyat verisi beklenirken public sitede hangi durumların gösterileceğini tanımlar.

## Amaç

Finans Hafızası, veri tamamlanmadan kayıtları doğrulanmış gibi göstermemelidir. Kullanıcı, bir karttaki oranın örnek mi, hesap bekliyor mu, yoksa doğrulanmış mı olduğunu açıkça görebilmelidir.

## Eklenen Görünümler

- Ana sayfada `Veri operasyonu` paneli
- Olay kartlarında `Yayın kontrolü` notu
- Olay detay sayfasında `Yayın öncesi kontrol hattı`
- Detay özetinde `veri durumu` ve `kayıt statüsü`

## Durumlar

| Durum | Anlam |
|---|---|
| `Örnek oranlar` | Arayüz ve ürün akışı gösterilir; gerçek fiyat serisi beklenir |
| `Fiyat verisi bekleniyor` | Lisanslı/kaynağı belli fiyat, hacim ve düzeltilmiş kapanış serisi beklenir |
| `Pencere oluşmadı` | 30G gibi ileri pencere tarihi henüz oluşmamıştır |
| `Hesaplandı` | Hesap çıktı; editör kontrolü beklenir |
| `Doğrulandı` | Kaynak, fiyat serisi ve hesap çıktısı tekrar üretilebilir durumdadır |

## Ana Sayfa Paneli

Ana sayfadaki veri operasyonu paneli şu bilgileri gösterir:

- Resmi veri talebinin gönderildiği
- Bugün tamamlanabilir pilotun `TUPRS + XU100` olduğu
- THYAO ve GARAN kayıtlarının 30G penceresi nedeniyle beklediği
- Doğrulama raporunda bugünkü pilotun henüz hazır olmadığı

## İlke

Bu arayüz yatırım sinyali üretmez. Tam tersine, kullanıcıya verinin hangi aşamada olduğunu söyleyerek ürünün kaynak ve hesap disiplinini görünür kılar.
