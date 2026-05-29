# Piyasa Verisi Sağlayıcı İletişim Listesi

Bu liste, Borsa İstanbul yanıtı beklenirken paralel iletişim kurulacak sağlayıcıları ve gönderilecek kısa mesajları düzenler.

## İlk Gönderim Sırası

| Öncelik | Sağlayıcı | Kanal | Durum | Not |
|---:|---|---|---|---|
| 1 | Borsa İstanbul DataStore | `vyk-marketing@borsaistanbul.com` veya DataStore/iletişim formu | Gönderildi, yanıt bekleniyor | 29 Mayıs 2026 takip maili |
| 2 | Finnet | `pazarlama@finnet.gen.tr` | Gönderildi, yanıt bekleniyor | 29 Mayıs 2026 e-posta |
| 3 | ForInvest | `https://www.forinvest.com/contactUs` | Gönderildi, yanıt bekleniyor | 29 Mayıs 2026 form |
| 4 | Datakapital | `info@datakapital.com` | Gönderildi, yanıt bekleniyor | 29 Mayıs 2026 e-posta |
| 5 | dxFeed / Devexperts | `https://dxfeed.com/tr/contact-sales/` | Gönderildi, yanıt bekleniyor | 29 Mayıs 2026 form |
| 6 | Unica Fintech | `info@unicafintech.com` | Yedek dalga | İlk dönüşlere göre |
| 7 | BiQuote | `https://biquote.io/docs` | İç test | Public yayın için kullanılmaz |

## Sorulacak 6 Kritik Soru

1. BIST payları için günlük OHLCV sağlıyor musunuz?
2. BIST 100 / XU100 günlük seri aynı pakette var mı?
3. Düzeltilmiş kapanış fiyatı sağlıyor musunuz?
4. Düzeltilmiş fiyat metodolojiniz temettü ve sermaye işlemlerini nasıl ele alıyor?
5. Veriyi kendi sistemimizde saklama hakkımız olur mu?
6. Public sitede ham fiyatı değil, hesaplanmış tepki yüzdelerini gösterebilir miyiz?

## Lisanslı Sağlayıcı Mail Taslağı

Konu:

```text
Finans Hafızası - BIST Tarihsel Fiyat Verisi ve Lisans Bilgisi Talebi
```

Metin:

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
- Public sitede ham fiyatı değil, hesaplanmış tepki yüzdelerini gösterme izni

MVP aşamasında ilk kapsamımız yaklaşık 20 hisse ve sınırlı sayıda tarihsel olaydır. Bu ölçeğe uygun başlangıç paketi, demo veri veya teknik görüşme imkanı varsa bilgi almak isteriz.

Teşekkür ederim.
```

## Borsa İstanbul Takip Maili

Konu:

```text
Finans Hafızası - Gün Sonu Düzeltilmiş Fiyat Verisi Talebi Takibi
```

Metin:

```text
Merhaba,

Finans Hafızası projemiz kapsamında Borsa İstanbul pay piyasasında işlem gören şirketler için tarihsel gün sonu düzeltilmiş fiyat, işlem hacmi ve BIST 100 karşılaştırması yapabileceğimiz veri kullanım koşulları hakkında bilgi almak istiyoruz.

Özellikle geçmiş olay analizlerinde kullanılmak üzere, verinin lisanslama, saklama, ticari kullanım ve public sitede hesaplanmış tepki yüzdesi gösterimi koşullarını öğrenmek isteriz.

Konu hakkında doğru ürün, fiyatlama ve başvuru süreci için yönlendirme rica ederim.

Teşekkür ederim.
```

## Teknik Test Kaynağı Mail Taslağı

Konu:

```text
Finans Hafızası - BIST OHLCV API Test ve Lisans Koşulları
```

Metin:

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

## Güncelleme Kuralı

Her gönderimden sonra `data/market-data-provider-outreach-tracker.json` içinde ilgili sağlayıcı için:

- `status`
- `lastContactDate`
- `nextAction`
- `notes`

alanları güncellenir.

## Kaynaklar

- Borsa İstanbul veri dağıtıcı kuruluşlar: `https://borsaistanbul.com/veriler/veri-yayini/veri-dagitici-kuruluslar`
- Borsa İstanbul veri/endeks SSS: `https://www.borsaistanbul.com/sss/veri-endeks-yayini-ve-satisi`
- Finnet iletişim: `https://www.finnet.com.tr/finnetstore/tr/kurumsal/iletisim`
- ForInvest iletişim: `https://www.forinvest.com/contactUs`
- Datakapital iletişim: `https://datakapital.com/iletisim`
- dxFeed Türkiye kapsamı: `https://dxfeed.com/coverage/turkey/`
- dxFeed Contact Sales: `https://dxfeed.com/tr/contact-sales/`
- BiQuote API dokümantasyonu: `https://biquote.io/docs`
