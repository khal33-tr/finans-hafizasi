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
- İlk kapsam: Seçilmiş popüler BIST sembolleri

## Proje Dosyaları

- `app/`: Next.js sayfaları
- `components/`: Arayüz bileşenleri
- `lib/`: Örnek veri
- `data/`: JSON örnekleri
- `docs/`: Ürün, veri modeli, editör akışı ve deploy notları
- `docs/execution-roadmap.md`: Fazlara ayrılmış uygulama yol haritası

## Yakın Teknik İşler

1. GitHub deposunu Vercel'e bağla.
2. İlk Next.js deploy'unu al.
3. `finanshafizasi.com` ve `www.finanshafizasi.com` domainlerini Vercel projesine ekle.
4. GoDaddy DNS kayıtlarını Vercel değerleriyle güncelle.
5. Detay sayfasını gerçek veri modeline bağla.
6. Editör panelini kur.
7. Fiyat tepki hesaplama motorunu yaz.

## İlk Yayın Kriterleri

- 20 BIST sembolü
- Toplam 60+ onaylı kayıt
- Her kayıtta en az 1 kaynak
- Her kayıtta 1G, 3G, 1H, 2H ve 30G fiyat tepkisi
- BIST 100 kıyası
- Metodoloji sayfası

## Yatırım Tavsiyesi Değildir

Finans Hafızası yatırım tavsiyesi sunmaz. İçerikler yalnızca geçmiş verileri, kaynakları ve piyasa tepkilerini incelemek için hazırlanır.
