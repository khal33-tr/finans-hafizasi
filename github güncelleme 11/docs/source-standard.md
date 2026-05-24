# Kaynak Standardı

Finans Hafızası'nda amaç, kullanıcıyı yönlendirmek değil geçmiş olayları güvenilir biçimde düzenlemektir. Bu nedenle kaynaklar katmanlı tutulur.

## Kaynak Önceliği

1. Birincil kaynak: KAP bildirimi, şirket yatırımcı ilişkileri duyurusu, Borsa İstanbul veya SPK açıklaması.
2. Destekleyici kaynak: Güvenilir haber kaynağı, veri sağlayıcı notu veya şirket sunumu.
3. Piyasa verisi: Fiyat, hacim ve endeks serisi için ayrı veri referansı.

## Yayın Kuralı

Bir olay `verified` statüsüne geçmeden önce:

- Doğrudan kaynak linki bulunmalı.
- Açıklama tarihi ve mümkünse açıklama saati kontrol edilmeli.
- Tepki başlangıç tarihi işlem takvimine göre belirlenmeli.
- Fiyat ve hacim verisi aynı yöntemle tekrar üretilebilir olmalı.
- Eksik veri varsa kullanıcıya görünen kalite notunda yazmalı.

## MVP Kaynakları

- KAP: `https://www.kap.org.tr/tr/`
- Borsa İstanbul verileri: `https://www.borsaistanbul.com/veriler`
- SPK: `https://www.spk.gov.tr/`

## Editör Notu

Haber kaynakları olayın bağlamını anlamak için kullanılabilir; ancak resmi kaynak bulunmadan kayıt doğrulanmış kabul edilmez.
