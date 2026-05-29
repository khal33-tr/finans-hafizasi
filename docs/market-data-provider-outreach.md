# Piyasa Verisi Sağlayıcı Görüşme Planı

Bu doküman, Finans Hafızası için fiyat ve hacim verisinin Borsa İstanbul dışındaki kaynaklardan nasıl araştırılacağını tanımlar.

## Karar

Veri sağlayıcılar iki gruba ayrılır:

- Public yayın için: lisans, saklama ve gösterim hakkı yazılı olarak netleşmiş resmi veya lisanslı sağlayıcılar.
- İç test için: hesap motorunu ve CSV import akışını denemeye yarayan geçici teknik kaynaklar.

Lisansı doğrulanmamış kaynaklardan gelen fiyat verisi kullanıcıya gerçek piyasa tepkisi olarak gösterilmez.

## İlk Temas Sırası

1. Borsa İstanbul DataStore
2. Borsa İstanbul lisanslı veri dağıtıcıları
3. dxFeed
4. Datakapital veya yerel veri/analitik sağlayıcılar
5. BiQuote gibi teknik API kaynakları, yalnızca iç test için

## Sağlayıcıya Sorulacak Sorular

1. BIST payları için günlük OHLCV verisi sağlıyor musunuz?
2. BIST 100 / XU100 endeks serisini aynı kapsamda verebiliyor musunuz?
3. Düzeltilmiş kapanış fiyatı sağlıyor musunuz?
4. Düzeltilmiş fiyat metodolojisi temettü, bedelli/bedelsiz ve bölünme işlemlerini nasıl ele alıyor?
5. Tarihsel veri derinliği kaç yıl?
6. Veriyi CSV veya API ile alabilir miyiz?
7. Veriyi kendi veritabanımızda saklama hakkımız olur mu?
8. Public sitede fiyatın kendisini değil, hesaplanmış tepki yüzdelerini gösterebilir miyiz?
9. Sağlayıcı adı, lisans notu veya kaynak ibaresi gösterme zorunluluğu var mı?
10. MVP ölçeğinde aylık/yıllık fiyatlama ve minimum sözleşme süresi nedir?

## Lisanslı Sağlayıcı Mail Taslağı

```text
Merhaba,

Finans Hafızası adlı ürünümüz için Borsa İstanbul pay piyasasında yaşanan şirket olaylarının ardından oluşan tarihsel fiyat, hacim ve BIST 100 göreli performansını inceleyen bir arşiv geliştiriyoruz.

Yatırım tavsiyesi üretmiyoruz; yalnızca geçmiş olayların ardından oluşan fiyat tepkilerini standart zaman pencerelerinde, kaynak ve metodoloji notuyla göstermeyi hedefliyoruz.

Aşağıdaki veri kapsamı için ürün, lisans ve fiyatlama bilgisi rica ederiz:

- BIST payları için günlük OHLCV
- BIST 100 / XU100 günlük seri
- Düzeltilmiş kapanış fiyatı veya kurumsal aksiyon düzeltme yöntemi
- CSV veya API ile tarihsel veri aktarımı
- Veriyi kendi sistemimizde saklama hakkı
- Public sitede hesaplanmış tepki yüzdelerini gösterme izni

MVP aşamasında ilk kapsamımız yaklaşık 20 hisse ve sınırlı sayıda tarihsel olaydır. Bu ölçeğe uygun başlangıç paketi, demo veri veya teknik görüşme imkanı varsa bilgi almak isteriz.

Teşekkür ederim.
```

## Teknik Test Kaynağı Mail Taslağı

```text
Merhaba,

BIST payları için OHLCV ve tarihsel veri API kapsamınızı incelemek istiyoruz. Veriyi Finans Hafızası ürünümüzde önce yalnızca iç test ve hesap motoru doğrulaması için kullanacağız.

Public yayında kullanım, redisplay, veri saklama ve türetilmiş sonuç gösterimi için lisans koşullarınızı ayrıca öğrenmek isteriz.

Özellikle şu alanları doğrulamak istiyoruz:

- Günlük OHLCV
- BIST 100 / XU100
- Düzeltilmiş kapanış veya kurumsal aksiyon politikası
- API limitleri ve tarihsel veri derinliği
- Ticari/public kullanım koşulları

Teşekkür ederim.
```

## Karar Kuralı

Bir sağlayıcı ancak şu koşullarda public yayın kaynağı olabilir:

- Veri lisansı yazılı olarak doğrulanır.
- Saklama ve hesaplanmış sonuç gösterimi açıkça izinlidir.
- Düzeltilmiş kapanış politikası anlaşılırdır.
- Hisse ve XU100 aynı takvimle sağlanabilir.
- Veri kaynağı ve import tarihi sistemde saklanır.

Bu koşullar sağlanmazsa kaynak yalnızca iç test için kullanılır.

## Resmi Referanslar

- Borsa İstanbul DataStore: `https://datastore.borsaistanbul.com/`
- Borsa İstanbul veri dağıtıcı kuruluşlar: `https://borsaistanbul.com/veriler/veri-yayini/veri-dagitici-kuruluslar`
- Borsa İstanbul veri ve endeks yayını/satışı SSS: `https://www.borsaistanbul.com/sss/veri-endeks-yayini-ve-satisi`
- dxFeed Türkiye kapsamı: `https://dxfeed.com/coverage/turkey/`
- BiQuote API dokümantasyonu: `https://biquote.io/docs`
