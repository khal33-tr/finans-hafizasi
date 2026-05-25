# Fiyat Tepkisi Girdi Standardı

Bu doküman, candidate olayların fiyat, hacim ve BIST 100 kıyası hesaplanmadan önce hangi girdilere ihtiyaç duyduğunu tanımlar.

## Amaç

Finans Hafızası'nda bir olay `verified` statüsüne ancak hesapları tekrar üretilebilir hale geldiğinde geçebilir. Bunun için her olayda aynı girdi sözleşmesi kullanılmalıdır.

Ana dosya:

- `data/calculation-inputs.json`

Takvim şablonu:

- `data/trading-calendar-template.json`

## Zorunlu Seriler

Her olay için iki piyasa serisi gerekir:

- İlgili hisse: örnek `THYAO`
- Karşılaştırma endeksi: `XU100`

Hisse serisinde hacim zorunludur. Endeks serisinde hacim zorunlu değildir, fakat kapanış ve düzeltilmiş kapanış alanları gereklidir.

## Zorunlu Alanlar

Her günlük fiyat satırı şu alanları taşımalıdır:

- `symbol`
- `date`
- `open`
- `high`
- `low`
- `close`
- `adjustedClose`
- `volume`
- `source`

Hesaplarda mümkünse `adjustedClose` kullanılmalıdır. Temettü, bölünme ve sermaye artırımı etkileri bu alana yansıtılmalıdır.

## Baz Tarih

`baseDate`, olaydan sonra piyasa tepkisinin ölçülmeye başlanacağı işlem günüdür.

Kural:

- Bildirim seans içinde yayımlandıysa `reactionStartDate` aynı gün olabilir.
- Bildirim seans kapanışı sonrasında yayımlandıysa `reactionStartDate` sonraki işlem günü olmalıdır.
- Resmi tatil veya hafta sonu varsa BIST işlem günü takvimi kullanılmalıdır.

## Zaman Pencereleri

| Anahtar | Etiket | Kural |
|---|---|---|
| `d1` | 1G | Baz tarihten sonraki 1. işlem günü |
| `d3` | 3G | Baz tarihten sonraki 3. işlem günü |
| `w1` | 1H | Baz tarihten 7 takvim günü sonrası, işlem günü değilse sonraki işlem günü |
| `w2` | 2H | Baz tarihten 14 takvim günü sonrası, işlem günü değilse sonraki işlem günü |
| `d30` | 30G | Baz tarihten 30 takvim günü sonrası, işlem günü değilse sonraki işlem günü |

Pencere bitiş tarihleri hesap motoru tarafından işlem takvimiyle çözülmelidir. Bu yüzden mevcut girdi dosyasında `windowStatus` alanı `pending_trading_calendar` olarak tutulur.

## Getiri Hesabı

```text
hisse_getirisi = (pencere_sonu_adjustedClose / baz_adjustedClose - 1) * 100
endeks_getirisi = (pencere_sonu_XU100_adjustedClose / baz_XU100_adjustedClose - 1) * 100
göreli_getiri = hisse_getirisi - endeks_getirisi
```

## Hacim Tepkisi

```text
hacim_çarpanı = olay_günü_hacmi / önceki_20_işlem_günü_ortalama_hacim
```

Notlar:

- Önceki 20 işlem günü hesabına `baseDate` dahil edilmez.
- Veri eksikse kayıt `verified` yapılmaz; `qualityNote` alanına eksik veri yazılır.

## Hesap Durumları

| Durum | Anlam |
|---|---|
| `pending_price_data` | Kaynak bulundu, fiyat ve hacim serisi bekleniyor |
| `price_data_ready` | Gerekli hisse ve XU100 serileri yüklendi |
| `calculated` | Pencere getirileri ve hacim çarpanı üretildi |
| `review` | Editör hesap ve tarih kontrolü yapıyor |
| `verified` | Kaynak, tarih ve hesap tekrar üretilebilir durumda |

## İlk 10 Candidate İçin Durum

İlk 10 candidate kaydın tamamı şu anda `pending_price_data` durumundadır.

Hesap motorunun ilk tekrar üretilebilir sürümü şu dosyalarla eklenmiştir:

- `lib/price-reaction-calculator.js`
- `scripts/generate-sample-calculation.mjs`
- `data/sample-price-bars.json`
- `data/sample-calculation-output.json`
- `docs/price-reaction-calculator.md`

`data/sample-price-bars.json` gerçek piyasa verisi değildir; yalnızca hesap mantığını test etmek için kullanılan örnek fixture dosyasıdır. Bir sonraki teknik çıktı, gerçek fiyat veri kaynağı veya CSV içe aktarma akışını seçip ilk 10 candidate kaydı gerçek fiyat serisine bağlamak olmalıdır.
