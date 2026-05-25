# Public Veri Durumu Arayüzü

Bu doküman, gerçek fiyat verisi beklenirken public sitede hangi durumların gösterileceğini tanımlar.

## Amaç

Finans Hafızası, veri tamamlanmadan kayıtları doğrulanmış gibi göstermemelidir. Kullanıcı, bir karttaki oranın örnek mi, hesap bekliyor mu, yoksa doğrulanmış mı olduğunu açıkça görebilmelidir.

## Eklenen Görünümler

- Ana sayfada `Veri operasyonu` paneli
- Olay kartlarında `Yayın kontrolü` notu
- Olay detay sayfasında kısa tepki pencereleri
- Olay detay sayfasında `90G`, `180G` ve `1Y` uzun izleme bölümü
- Olay detay sayfasında `Yayın öncesi kontrol hattı`

## Durumlar

| Durum | Anlam |
|---|---|
| `Örnek oranlar` | Arayüz ve ürün akışı gösterilir; gerçek fiyat serisi beklenir |
| `Kaynak bulundu` | Birincil KAP kaynağı bulundu; fiyat, hacim ve BIST 100 kıyası beklenir |
| `Fiyat verisi bekleniyor` | Lisanslı/kaynağı belli fiyat, hacim ve düzeltilmiş kapanış serisi beklenir |
| `Pencere oluşmadı` | İlgili kısa tepki veya uzun izleme penceresi henüz oluşmamıştır |
| `Hesaplandı` | Hesap çıktı; editör kontrolü beklenir |
| `Doğrulandı` | Kaynak, fiyat serisi ve hesap çıktısı tekrar üretilebilir durumdadır |

## Ana Sayfa Paneli

Ana sayfadaki veri operasyonu paneli şu bilgileri gösterir:

- Resmi veri talebinin gönderildiği
- Bugün tamamlanabilir kısa pilotun `TUPRS + XU100` olduğu
- THYAO ve GARAN kayıtlarının kısa tepki 30G penceresi nedeniyle beklediği
- Doğrulama raporunda bugünkü pilotun henüz hazır olmadığı

## Uzun İzleme

90G, 180G ve 1Y pencereleri olay detayında ayrı gösterilir. Bu değerler ilk piyasa tepkisi değil, olayın daha uzun vadeli izini anlatır.

Uzun izleme verisi eksikse kayıt yine kısa tepki durumuna göre gösterilebilir; eksik uzun veri ayrıca notlanır.

## İlke

Bu arayüz yatırım sinyali üretmez. Tam tersine, kullanıcıya verinin hangi aşamada olduğunu söyleyerek ürünün kaynak ve hesap disiplinini görünür kılar.
