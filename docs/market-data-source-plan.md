# Piyasa Verisi Kaynak Planı

Bu plan, Finans Hafızası'nın fiyat ve hacim verisini hangi kuralla toplayacağını tanımlar.

## Ana İlke

Finans Hafızası fiyat verisini tavsiye üretmek için kullanmaz. Ama public sitede gösterilen her fiyat tepkisi tekrar üretilebilir, kaynaklı ve lisans açısından kontrol edilmiş olmalıdır.

## Kaynak Sıralaması

1. KAP, olay ve bildirim kaynağıdır.
2. Borsa İstanbul DataStore, tarihsel piyasa verisi için tercih edilen resmi yoldur.
3. Borsa İstanbul lisanslı veri dağıtıcı kuruluşlar, sözleşme şartları public kullanım ve saklamaya izin veriyorsa kabul edilebilir.
4. Aracı kurum veya terminal CSV ihracı, yalnızca lisans şartı netleşene kadar iç hesap/pilot kontrol amacıyla kullanılabilir.

## Alternatif Sağlayıcı Katmanı

DataStore yanıtı gecikirse süreç durmaz. Sağlayıcılar iki sınıfa ayrılır:

- Lisanslı/public aday: Borsa İstanbul lisanslı veri dağıtıcıları, dxFeed ve sözleşmeyle saklama/gösterim hakkı verebilecek kurumsal sağlayıcılar.
- İç test adayı: BiQuote gibi teknik API kaynakları veya lisansı henüz netleşmemiş CSV/API kaynakları.

İç test adayı kaynaklardan gelen veri hesap motoru, CSV import ve doğrulama ekranını denemek için kullanılabilir; ancak public sitede gerçek piyasa tepkisi olarak yayımlanmaz.

Detaylı sağlayıcı listesi:

- `data/market-data-provider-shortlist.json`
- `docs/market-data-provider-outreach.md`

## Resmi Referanslar

- KAP bildirim sorgu: `https://www.kap.org.tr/tr/bildirim-sorgu`
- Borsa İstanbul DataStore: `https://datastore.borsaistanbul.com/`
- Borsa İstanbul veri dağıtıcı kuruluşlar: `https://www.borsaistanbul.com/veriler/veri-yayini/veri-dagitici-kuruluslar`
- Borsa İstanbul veri ve endeks yayını/satışı SSS: `https://www.borsaistanbul.com/sss/veri-endeks-yayini-ve-satisi`
- dxFeed Türkiye kapsamı: `https://dxfeed.com/coverage/turkey/`
- BiQuote API dokümantasyonu: `https://biquote.io/docs`

## Kabul Edilen Kullanım

Public yayına alınacak fiyat verisi için şu alanlar tutulmalıdır:

- Veri sağlayıcı adı
- Sağlayıcı URL'si
- Lisans veya kullanım şartı durumu
- İçe aktarma tarihi
- İçe aktaran kişi
- Kaynak dosya adı
- `adjustedClose` politikası
- Editör kontrol durumu

## Reddedilen Kullanım

Şu kaynaklar MVP hesaplarında kullanılmamalıdır:

- Yetkisiz web kazıma
- Sosyal medya ekran görüntüleri
- Kaynağı belirsiz hazır CSV dosyaları
- Düzeltilmiş kapanış yöntemi açıklanmayan veri setleri

## MVP Kararı

Bir sonraki operasyon adımı, doğrudan API entegrasyonundan önce CSV içe aktarma akışını gerçek veriye bağlamaktır. Bu sayede veri sağlayıcı sonradan değişse bile hesap motoru, doğrulama raporu ve editör kontrol akışı değişmez.
