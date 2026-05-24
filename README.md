# Finans Hafızası

Finans Hafızası, Borsa İstanbul şirketlerinde yaşanan önemli gelişmeleri kaynaklarıyla birlikte düzenleyen bir piyasa hafızası projesidir.

Amaç: haberi yorumlamak değil; gelişmenin ardından fiyat, hacim ve BIST 100 kıyasının nasıl değiştiğini düzenli biçimde göstermektir.

## Ürün İlkesi

> Yorum yapmaz. Yönlendirmez. Kaynak gösterir. Geçmiş piyasa tepkilerini düzenler.

## MVP Özeti

- Pazar: Türkiye
- Domain: `finanshafizasi.com`
- Kullanıcı: BIST yatırımcısı
- Format: Medya ürünü gibi okunabilir, veri ürünü kadar düzenli
- İlk kapsam: 20 seçilmiş BIST sembolü
- Olay standardı: kaynak, tepki başlangıcı, veri durumu, editör kontrol notu

## Proje Dosyaları

- `app/`: Next.js sayfaları
- `components/`: Arayüz bileşenleri
- `lib/`: Uygulamanın kullandığı örnek veri ve yardımcı fonksiyonlar
- `data/`: JSON örnekleri, olay giriş şablonu ve araştırma kuyruğu
- `docs/`: Ürün, veri modeli, kaynak standardı, araştırma kuyruğu ve deploy notları

## Mevcut Aşama

Faz 1 ve Faz 2 tamamlandı. Canlı domain, temel sayfalar, SEO dosyaları, hisse sayfaları ve olay detay sayfası çalışıyor.

Şu an Faz 3 içindeyiz: veri standardı ve içerik sistemi.

Faz 3 çıktıları:

- `data/research-queue.json`: 20 hisse için 60 olay araştırma hedefi
- `data/event-intake-template.json`: doğrulanacak olaylar için giriş şablonu
- `docs/event-research-queue.md`: editörün takip edeceği araştırma sırası
- `docs/source-standard.md`: kaynak doğrulama standardı

## İlk Yayın Kriterleri

- 20 BIST sembolü
- Toplam 60+ doğrulanmış kayıt
- Her kayıtta en az 1 birincil kaynak
- Her kayıtta 1G, 3G, 1H, 2H ve 30G fiyat tepkisi
- BIST 100 kıyası
- Kaynak ve veri kalitesi notu
- Metodoloji ve yasal uyarı sayfaları

## Yatırım Tavsiyesi Değildir

Finans Hafızası yatırım tavsiyesi sunmaz. İçerikler yalnızca geçmiş verileri, kaynakları ve piyasa tepkilerini incelemek için hazırlanır.
