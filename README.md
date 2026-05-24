# Finans Hafızası

Finans Hafızası, Borsa İstanbul'da işlem gören şirketlerde yaşanan önemli olayları kaynaklarıyla birlikte arşivleyen; bu olaylardan sonra fiyat, hacim ve piyasa tepkisinin 1 gün, 3 gün, 1 hafta, 2 hafta ve 30 gün içinde nasıl değiştiğini gösteren tarafsız bir finans medya ürünüdür.

Ürünün ana ilkesi:

> Yorum yapmaz. Yönlendirmez. Geçmişi düzenler, veriyi gösterir, kaynağı belirtir.

## İlk MVP

- Hedef pazar: Türkiye
- İlk kullanıcı: BIST yatırımcısı olan bireysel kullanıcı
- Ana domain: `finanshafizasi.com`
- Format: Medya ürünü gibi okunabilir, veri terminali kadar metodolojik
- Kapsam: Seçilmiş popüler BIST hisseleri ve onaylı olay arşivi
- Veri modeli: Olay, fiyat tepkisi, endeks karşılaştırması, hacim, kaynaklar, kamuya açık söylem özeti

## Dosyalar

- `app/`: Next.js uygulama rotaları
- `components/`: Arayüz bileşenleri
- `lib/`: Örnek olay ve hisse verileri
- `data/sample-events.json`: MVP için örnek olay verileri
- `docs/product-blueprint.md`: Ürün konumu, hedef kitle, sayfa yapısı
- `docs/methodology.md`: Olay seçimi ve fiyat tepkisi hesaplama metodolojisi
- `docs/mvp-architecture.md`: MVP teknik mimarisi, rotalar, fazlar ve riskler
- `docs/data-model.md`: Şirket, olay, kaynak, fiyat tepkisi ve editör kayıtları için veri modeli
- `docs/editor-workflow.md`: Yarı otomatik ve editör onaylı yayın akışı
- `docs/domain-brand-strategy.md`: Alınan domain, marka konumu ve global açılım notları
- `docs/founder-action-plan.md`: Domain sonrası kurucu ve teknik aksiyon planı
- `docs/vercel-deploy-guide.md`: Vercel deploy ve GoDaddy DNS bağlama rehberi

## Sıradaki Teknik Adımlar

1. GitHub deposunu Vercel'e bağla.
2. İlk Next.js deploy'unu al.
3. `finanshafizasi.com` ve `www.finanshafizasi.com` domainlerini Vercel projesine ekle.
4. GoDaddy DNS kayıtlarını Vercel'in verdiği değerlere göre güncelle.
5. Olay detay sayfasını gerçek veri modeline bağla.
6. Editör panelinde olay adayı, kaynak girişi ve onay akışını kur.
7. Fiyat tepkisi hesaplama motorunun ilk sürümünü yaz.

## MVP Yayın Çıkışı İçin Minimum Hedef

- 20 hisse
- Her hisse için en az 3 onaylı olay
- Toplam en az 60 olay
- Her olayda en az 1 kaynak
- Her olayda 1G, 3G, 1H, 2H ve 30G fiyat tepkisi
- BIST 100 ile karşılaştırmalı performans
- Metodoloji ve yasal uyarı sayfaları

## Yasal Uyarı

Finans Hafızası yatırım tavsiyesi sunmaz. Platformda yer alan bilgiler geçmiş olayların ve piyasa verilerinin incelenmesi amacıyla hazırlanır.
