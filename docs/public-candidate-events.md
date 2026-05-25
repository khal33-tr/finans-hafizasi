# Public Candidate Olay Akışı

Bu doküman, KAP kaynaklı candidate kayıtların public siteye nasıl bağlandığını açıklar.

## Amaç

Sitenin yalnızca demo kartlardan oluşmaması için `data/candidate-events.json` içindeki ilk 10 KAP kaynaklı aday kayıt public olay akışına eklendi.

Bu kayıtlar doğrulanmış fiyat tepkisi üretmez. Fiyat, hacim, BIST 100 kıyası ve söylem alanları gerçek veri gelene kadar `Yok` veya `Bekliyor` olarak görünür.

## Görünen Durum

Candidate kayıtların public veri durumu:

```text
Kaynak bulundu
```

Bu durum şu anlama gelir:

- KAP bağlantısı bulundu.
- Olay tarihi ve tepki başlangıç tarihi adaylandı.
- Fiyat, hacim ve düzeltilmiş kapanış serisi henüz bağlanmadı.
- Kayıt `verified` değildir.

## Sayfa Etkisi

- Ana sayfa artık KAP kaynaklı candidate kayıtları gösterir.
- Hisse detay sayfalarında ilgili candidate kayıt sayısı görünür.
- Olay detay sayfaları candidate slug'ları için açılır.
- Sitemap, candidate olay sayfalarını da içerir.

## İlke

Public site kullanıcıya gerçek kaynaklı olay arşivi hissi verir, fakat veri tamamlanmadan hiçbir kaydı doğrulanmış gibi sunmaz.
