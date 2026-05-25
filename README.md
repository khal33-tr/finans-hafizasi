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

Faz 1, Faz 2 ve Faz 3 tamamlandı. Canlı domain, temel sayfalar, SEO dosyaları, hisse sayfaları, olay detay sayfası, veri standardı ve ilk candidate olay dosyaları hazır.

Şu an Faz 4 içindeyiz: fiyat tepkisi hesaplama motoru.

Faz 3 çıktıları:

- `data/research-queue.json`: 20 hisse için 60 olay araştırma hedefi
- `data/event-intake-template.json`: doğrulanacak olaylar için giriş şablonu
- `data/candidate-events.json`: ilk 10 kaynaklı olay adayı
- `docs/event-research-queue.md`: editörün takip edeceği araştırma sırası
- `docs/candidate-source-log.md`: candidate kayıtların kaynak günlüğü
- `docs/source-standard.md`: kaynak doğrulama standardı

Faz 4 hazırlık çıktıları:

- `data/calculation-inputs.json`: ilk 10 candidate için hesaplama girdi sözleşmesi
- `data/trading-calendar-template.json`: BIST işlem takvimi şablonu
- `docs/price-reaction-input-standard.md`: fiyat, hacim ve BIST 100 hesaplama standardı
- `lib/price-reaction-calculator.js`: tekrar üretilebilir fiyat tepkisi hesaplayıcı fonksiyonu
- `scripts/generate-sample-calculation.mjs`: örnek hesap çıktısını yeniden üreten script
- `data/sample-price-bars.json`: gerçek piyasa verisi olmayan örnek fiyat fixture dosyası
- `data/sample-calculation-output.json`: THYAO örneği için üretilmiş hesap çıktısı
- `docs/price-reaction-calculator.md`: hesaplayıcı kullanım ve kontrol notları
- `data/price-import-template.csv`: gerçek fiyat verisi için CSV içe aktarma şablonu
- `data/trading-calendar-import-template.csv`: BIST takvim içe aktarma şablonu
- `data/price-data-requirements.json`: ilk 10 candidate için gerekli fiyat aralıkları
- `scripts/validate-price-import.mjs`: fiyat ve takvim CSV doğrulama scripti
- `docs/price-data-import-workflow.md`: gerçek fiyat verisine geçiş akışı
- `data/market-data-source-policy.json`: piyasa verisi kaynak ve lisans ilkesi
- `data/pilot-price-import-plan.json`: ilk gerçek veri pilotu için seçilen 3 olay
- `data/imports/`: pilot fiyat ve takvim verisi giriş dosyaları
- `scripts/generate-pilot-import-templates.mjs`: pilot CSV giriş dosyalarını üreten script
- `data/imports/pilot-validation-report.json`: pilot CSV dosyalarının ilk doğrulama raporu
- `scripts/generate-pilot-readiness.mjs`: pilot pencerelerinin tarihsel olarak oluşup oluşmadığını ayıran script
- `data/imports/pilot-window-maturity-report.json`: 25 Mayıs 2026 itibarıyla pilot olgunluk raporu
- `data/imports/today-completable-price-data-requirements.json`: bugün tamamlanabilir TUPRS pilot gereksinimi
- `docs/today-completable-pilot.md`: bugün doldurulacak gerçek veri kapsamı
- `lib/data-operations.js`: public arayüz için veri operasyon özetini üretir
- `components/data-operations-panel.jsx`: ana sayfadaki veri durumu paneli
- `components/record-readiness.jsx`: olay detayındaki yayın öncesi kontrol hattı
- `docs/public-readiness-ui.md`: veri beklerken public sitede gösterilecek durumlar
- `data/candidate-events.json`: public akışa bağlanan ilk 10 KAP kaynaklı aday olay
- `docs/public-candidate-events.md`: candidate kayıtların public görünüm ilkesi
- `docs/market-data-source-plan.md`: resmi kaynak ve veri sağlayıcı karar planı
- `docs/pilot-price-data-runbook.md`: pilot fiyat verisi giriş ve doğrulama adımları

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
