# Finans Hafizasi Domain ve Marka Stratejisi

## Alinan Ana Domain

Ana domain:

```text
finanshafizasi.com
```

Bu domain, Turkiye MVP lansmani icin birincil marka ve yayin adresi olarak kullanilacaktir.

Registrar:

```text
GoDaddy
```

Gorunen yenileme tarihi:

```text
24 Mayis 2027
```

Domain korumasi:

```text
Full Domain Protection aktif
```

## Marka Karari

Ilk pazar Turkiye oldugu icin public marka adi:

```text
Finans Hafizasi
```

Konumlandirma:

```text
Haber degil, piyasa hafizasi.
```

Ana ilke:

```text
Yorum yapmaz. Yonlendirmez. Gecmisi duzenler, veriyi gosterir, kaynagi belirtir.
```

## Global Acilim Notu

Finans Hafizasi, ilk asamada BIST odakli yerel marka olarak konumlanir. Global acilim icin teknik altyapi cok dilli ve cok piyasali calisabilecek sekilde tasarlanmalidir.

Bu nedenle:

- Kod ve veri modeli sadece Turkiye'ye kilitlenmemeli.
- Sirket/veri modelinde `market`, `currency`, `locale` ve `country` alanlari dusunulmeli.
- Public icerik yapisi ileride Turkce ve Ingilizce calisabilecek sekilde kurulmalidir.
- Global marka adi ileride ayrica secilebilir.

## Onerilen E-posta Adresleri

Ilk etapta tek kurumsal e-posta yeterlidir:

```text
info@finanshafizasi.com
```

Ilerleyen asamada:

```text
editor@finanshafizasi.com
data@finanshafizasi.com
legal@finanshafizasi.com
```

## DNS ve Teknik Kurulum Notlari

Uygulama yayina alinirken gereken temel kayitlar:

- Apex domain: `finanshafizasi.com`
- WWW yonlendirme: `www.finanshafizasi.com`
- E-posta icin MX kayitlari
- SPF, DKIM ve DMARC kayitlari
- SSL otomatik olarak hosting saglayicisi uzerinden kurulacak

## Satin Alma Sonrasi Kontrol Listesi

- Domain yenileme tarihi not edilmeli.
- Otomatik yenileme acilmali.
- Domain kilidi aktif olmali.
- WHOIS gizliligi varsa acilmali.
- Registrar hesabi iki faktor dogrulama ile korunmali.
- Gereksiz hosting veya e-posta paketleri alinmadan once maliyet kontrol edilmeli.

## GoDaddy Ilk Kurulum Notlari

GoDaddy panelinde ilk kontrol edilecek alanlar:

- My Products / Domains bolumunde `finanshafizasi.com` gorunmeli.
- Renewals and Billing bolumunde otomatik yenileme aktif olmali.
- Account Security bolumunde 2-step verification aktif olmali.
- Domain DNS bolumunde mevcut kayitlar incelenmeli; hosting secilmeden A/CNAME kayitlari degistirilmemeli.
- Hosting secildikten sonra apex domain ve `www` icin gerekli DNS kayitlari eklenecek.
- GoDaddy'nin "Web Siteleri + Pazarlama Araclari" urunu MVP icin kullanilmamalidir; site Next.js uygulamasi olarak ayri hosting uzerinden yayinlanacaktir.

## Vercel Icin Gerekli DNS Kayitlari

Vercel domain ekraninda gorunen kayitlar:

```text
A      @      216.198.79.1
CNAME  www    7426f42037064161.vercel-dns-017.com.
```

Not:

- Vercel yeni IP araligi olarak `216.198.79.1` degerini onerdi.
- `www` icin Vercel'in projeye ozel CNAME degeri kullanilmalidir.

## Domain Baglama Durumu

GoDaddy DNS kayitlari guncellendi ve dogrulandi:

```text
finanshafizasi.com      A      216.198.79.1
www.finanshafizasi.com  CNAME  7426f42037064161.vercel-dns-017.com
```

Canli kontrol:

```text
https://finanshafizasi.com      -> https://www.finanshafizasi.com/
https://www.finanshafizasi.com  -> Finans Hafizasi uygulamasi
```

Sonuc:

- SSL aktif.
- Apex domain `www` adresine yonleniyor.
- Site basligi ve ana baslik dogru gorunuyor.
- Tarayici konsolunda hata gorulmedi.

## Mevcut DNS Durumu

GoDaddy DNS ekraninda gorunen baslangic kayitlari:

- `A @ -> WebsiteBuilder Sitesi`
- `CNAME www -> finanshafizasi.com.`
- `NS @ -> ns39.domaincontrol.com.`
- `NS @ -> ns40.domaincontrol.com.`
- `CNAME _domainconnect -> _domainconnect.gd.domaincontrol.com.`
- `SOA @ -> ns39.domaincontrol.com.`
- `TXT _dmarc -> GoDaddy tarafindan olusturulmus DMARC kaydi`

Not:

- `NS` ve `SOA` kayitlari silinmemelidir.
- `_domainconnect` kaydi simdilik kalabilir.
- `_dmarc` kaydi e-posta kurulumu netlesene kadar korunabilir.
- Vercel/hosting projesi hazir olduktan sonra yalnizca `A @` ve `CNAME www` kayitlari guncellenecektir.
