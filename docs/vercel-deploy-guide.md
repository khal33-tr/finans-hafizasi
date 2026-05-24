# Finans Hafizasi Vercel Deploy Rehberi

Bu rehber, Finans Hafizasi Next.js uygulamasini Vercel'e yayinlamak ve `finanshafizasi.com` domainini baglamak icin kullanilir.

## 1. Vercel Projesi

Durum:

```text
Vercel hesabi mevcut ve oturum acildi.
```

Vercel panelinde:

1. `Add New...` sec.
2. `Project` sec.
3. GitHub bagliysa `finans-hafizasi` reposunu import et.
4. Framework Preset olarak `Next.js` secili olmali.
   - Vercel ekranda `Other` gosterirse dropdown'u acip `Next.js` sec.
   - `Other` olarak deploy edilmemeli.
5. Build Command:

```text
npm run build
```

6. Output Directory bos kalabilir.
7. Deploy butonuna bas.

## 2. GitHub Yoksa

GitHub repo:

```text
https://github.com/khal33-tr/finans-hafizasi
```

Repo henuz bossa:

1. Bu klasordeki dosyalari repo'ya yukle.
2. Vercel'de GitHub entegrasyonunu bagla.
3. Repo'yu import et.

Not: Proje buyudukce GitHub kullanmak zorunlu hale gelir. Deploy gecmisi, geri alma ve ekip calismasi icin en saglikli yoldur.

## 2.1. GitHub Repo Onerisi

Onerilen repo adi:

```text
finans-hafizasi
```

Onerilen gorunurluk:

```text
Private
```

Ilk deploy icin yuklenmesi gereken temel dosya ve klasorler:

```text
app/
components/
lib/
docs/
data/
package.json
next.config.mjs
jsconfig.json
README.md
.gitignore
```

Eski statik prototip dosyalari `index.html`, `styles.css` ve `app.js` referans olarak kalabilir, ancak Next.js uygulamasi icin zorunlu degildir.

## 2.2. Vercel Proje Adi Notu

Vercel'de `finans-hafizasi` isimli proje zaten varsa yeni proje adi olarak sunu kullan:

```text
finans-hafizasi-web
```

GitHub repo adi `finans-hafizasi` kalabilir. Vercel proje adinin farkli olmasi sorun degildir.

## 3. Domain Baglama

Vercel projesi deploy edildikten sonra:

1. Project Settings alanina gir.
2. Domains bolumunu ac.
3. `finanshafizasi.com` ekle.
4. `www.finanshafizasi.com` ekle.
5. Vercel'in verdigi DNS kayitlarini not et.

## 4. GoDaddy DNS Guncelleme

Vercel domain ekraninda dogrulama icin verilen kayitlar kullanilir. Standart kurulum genellikle:

```text
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
```

GoDaddy'de:

1. Mevcut `A @ -> WebsiteBuilder Sitesi` kaydini duzenle.
2. Degeri Vercel'in verdigi A kaydina cevir.
3. Mevcut `CNAME www -> finanshafizasi.com.` kaydini duzenle.
4. Degeri Vercel'in verdigi CNAME kaydina cevir.
5. `NS`, `SOA`, `_domainconnect` kayitlarina dokunma.
6. E-posta kurulmadigi surece MX kaydi ekleme.

## 5. Dogrulama

DNS degisiklikleri hemen ya da birkac saat icinde yayilabilir.

Kontrol edilecek adresler:

```text
https://finanshafizasi.com
https://www.finanshafizasi.com
```

Vercel panelinde domain durumu `Valid Configuration` veya benzeri basarili durum gostermelidir.

## 6. Ilk Deploy Sonrasi Kontrol Listesi

- Ana sayfa aciliyor mu?
- SSL aktif mi?
- `www` ve apex domain ayni siteye gidiyor mu?
- Mobil gorunum bozulmuyor mu?
- Footer'da yatirim tavsiyesi uyarisi var mi?
- Sayfa basligi ve aciklama dogru mu?
