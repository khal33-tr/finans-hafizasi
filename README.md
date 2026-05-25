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

## Zaman Pencereleri

Kısa tepki:

- 1G
- 3G
- 1H
- 2H
- 30G

Uzun izleme:

- 90G
- 180G
- 1Y

Kısa tepki pencereleri MVP yayın olgunluğunu belirler. Uzun izleme pencereleri olayın daha geniş zamandaki izini gösterir ve ayrı veri gereksinimiyle takip edilir.

## Proje Dosyaları

- `app/`: Next.js sayfaları
- `components/`: Arayüz bileşenleri
- `lib/`: Uygulamanın kullandığı veri ve yardımcı fonksiyonlar
- `data/`: JSON örnekleri, olay giriş şablonu, hesap girdileri ve import dosyaları
- `docs/`: Ürün, veri modeli, kaynak standardı, metodoloji ve deploy notları
- `scripts/`: Hesap, veri gereksinimi ve CSV doğrulama scriptleri

## Mevcut Aşama

Faz 4 içindeyiz: fiyat tepkisi hesaplama motoru.

Hazır olan ana çıktılar:

- `data/calculation-inputs.json`: ilk 10 candidate için hesaplama girdi sözleşmesi
- `lib/price-reaction-calculator.js`: tekrar üretilebilir fiyat tepkisi hesaplayıcısı
- `scripts/generate-sample-calculation.mjs`: örnek hesap çıktısını üretir
- `scripts/generate-price-data-requirements.mjs`: kısa ve uzun veri aralıklarını üretir
- `scripts/generate-pilot-import-templates.mjs`: pilot CSV dosyalarını üretir
- `scripts/generate-pilot-readiness.mjs`: kısa tepki olgunluğu ve uzun izleme bekleme durumunu ayırır
- `scripts/validate-price-import.mjs`: fiyat ve takvim CSV doğrulama scripti
- `data/imports/long-monitoring-price-data-requirements.json`: 90G, 180G ve 1Y pilot veri kapsamı
- `app/olaylar/page.jsx`: filtrelenebilir olay arşivi sayfası
- `app/olaylar/[slug]/page.jsx`: kısa tepki ve uzun izleme bölümleri olan olay detay sayfası

## İlk Yayın Kriterleri

- 20 BIST sembolü
- Toplam 60+ doğrulanmış kayıt
- Her kayıtta en az 1 birincil kaynak
- Her kayıtta 1G, 3G, 1H, 2H ve 30G kısa fiyat tepkisi
- BIST 100 kıyası
- Kaynak ve veri kalitesi notu
- Metodoloji ve yasal uyarı sayfaları

## Yatırım Tavsiyesi Değildir

Finans Hafızası yatırım tavsiyesi sunmaz. İçerikler yalnızca geçmiş verileri, kaynakları ve piyasa tepkilerini incelemek için hazırlanır.
