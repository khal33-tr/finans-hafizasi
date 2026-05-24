# Finans Hafızası Veri Modeli

Bu doküman, Finans Hafızası MVP'sinde olayların güvenilir ve tekrar üretilebilir biçimde
yayınlanması için kullanılacak veri standardını tanımlar.

## Temel İlke

Bir kayıt, haber başlığı değil olay hafızasıdır. Bu yüzden her olayda üç şey ayrı tutulur:

- Olayın kendisi: şirket, tarih, kategori, başlık, özet.
- Piyasa tepkisi: 1G, 3G, 1H, 2H, 30G fiyat değişimi, BIST 100 kıyası, hacim çarpanı.
- Güven standardı: kaynaklar, doğrulama durumu, veri notu, editör kontrol listesi.

## Company

Şirketin temel kimliği ve ilk MVP evrenindeki yeri.

Zorunlu alanlar:

- `ticker`
- `name`
- `sector`
- `priority`
- `description`
- `watchReason`
- `eventTargets`

Notlar:

- `priority`, ilk 20 hisse içinde araştırma önceliğini gösterir.
- `watchReason`, hissenin neden ilk evrende olduğunu kullanıcıya açıklar.
- `eventTargets`, editörün o hisse için öncelikle arayacağı olay sınıflarıdır.

## Event

Arşivde gösterilen ana olay kaydı.

Zorunlu alanlar:

- `slug`
- `ticker`
- `date`
- `reactionStartDate`
- `category`
- `title`
- `summary`
- `verificationStatus`
- `dataStatus`
- `sources`
- `returns`
- `bistRelative`
- `volumeMultiple`
- `sentiment`
- `qualityNote`
- `editorChecklist`

Durumlar:

- `sample`: Örnek veri. Yayında görünebilir ama gerçek kayıt gibi sunulmaz.
- `candidate`: Araştırma adayı.
- `review`: Editör kontrolünde.
- `verified`: Kaynak, tarih ve hesap kontrolü tamamlanmış kayıt.

Notlar:

- `date`, olayın kamuya açıklandığı tarihtir.
- `reactionStartDate`, fiyat tepkisinin baz alınacağı ilk işlem tarihidir.
- Seans sonrası açıklamalarda `date` ve `reactionStartDate` farklı olabilir.

## EventSource

Bir olayı destekleyen kaynak kaydı.

Zorunlu alanlar:

- `type`
- `label`
- `publisher`
- `url`
- `isPrimary`

Kaynak tipleri:

- `kap`
- `company_ir`
- `bist`
- `spk`
- `news`
- `data_provider`

Yayın standardı:

- Her olayda en az 1 birincil kaynak olmalıdır.
- KAP bildirimi varsa `isPrimary: true` olarak işaretlenmelidir.
- Fiyat ve hacim hesapları için veri sağlayıcı veya Borsa İstanbul veri referansı ayrıca tutulmalıdır.
- Haber kaynakları tek başına yeterli değildir; resmi kaynak yoksa kayıt `verified` olamaz.

## EventReturn

Bir olay için hesaplanan fiyat tepkisi.

Zorunlu pencereler:

- `d1`: 1 işlem günü
- `d3`: 3 işlem günü
- `w1`: 1 hafta
- `w2`: 2 hafta
- `d30`: 30 gün

Hesap standardı:

```text
hisse getirisi = (pencere sonu düzeltilmiş kapanış / baz düzeltilmiş kapanış - 1) * 100
göreli getiri = hisse getirisi - BIST 100 getirisi
```

Notlar:

- Pencere sonu tatil gününe denk gelirse en yakın uygun işlem günü kullanılır.
- Temettü, bölünme ve sermaye artırımı etkileri için düzeltilmiş kapanış kullanılır.
- Hesap tekrar üretilemiyorsa kayıt `verified` olamaz.

## SentimentSnapshot

Kamuya açık söylem özeti.

Alanlar:

- `positive`
- `neutral`
- `negative`
- `method`
- `sampleSize`
- `qualityNote`

MVP kararı:

- İlk sürümde bu alan editör gözlemi veya sınırlı örnekleme ile tutulabilir.
- Otomatik duygu analizi sonraki faza bırakılır.
- Bu veri yatırım sinyali gibi sunulmaz.

## Yayınlama Kuralları

Bir olay `verified` statüsüne geçmeden önce:

- Doğrudan kaynak linki eklenmiş olmalı.
- Olay tarihi ve tepki başlangıç tarihi kontrol edilmiş olmalı.
- Fiyat pencereleri tekrar üretilebilir olmalı.
- BIST 100 karşılaştırması hesaplanmış olmalı.
- Hacim çarpanı hesaplanmış veya veri eksikliği açıkça notlanmış olmalı.
- Başlık ve özet yatırım tavsiyesi dili içermemeli.

## Örnek Event JSON

```json
{
  "slug": "thyao-2024-ikinci-ceyrek-finansal-sonuclari",
  "ticker": "THYAO",
  "date": "2024-08-09",
  "reactionStartDate": "2024-08-12",
  "category": "earnings",
  "title": "THYAO 2024 ikinci çeyrek finansal sonuçları",
  "verificationStatus": "sample",
  "dataStatus": "sample",
  "sources": [
    {
      "type": "kap",
      "label": "KAP bildirim araması",
      "publisher": "Kamuyu Aydınlatma Platformu",
      "url": "https://www.kap.org.tr/tr/",
      "isPrimary": true
    }
  ],
  "returns": {
    "d1": 1.8,
    "d3": 3.2,
    "w1": 2.4,
    "w2": -1.1,
    "d30": 4.6
  },
  "bistRelative": 1.3,
  "volumeMultiple": 1.7,
  "qualityNote": "Örnek MVP kaydıdır; doğrudan kaynak ve fiyat serisi doğrulanmalıdır."
}
```
