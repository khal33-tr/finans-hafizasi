# Finans Hafizasi MVP Mimarisi

## Amac

Bu dokuman, Finans Hafizasi'nin ilk calisan MVP surumu icin teknik ve urunsal omurgayi tanimlar. Hedef, haber sitesi gibi okunabilen fakat veri hesaplama ve editor onayi acisindan guvenilir bir olay arsivi kurmaktir.

## MVP Prensibi

Ilk surumda asil hedef cok fazla ozellik degil, guvenilir bir olay sayfasi standardi olusturmaktir. Bir olay sayfasi dogru calisiyorsa, hisse sayfalari, kategori sayfalari ve ana sayfa bu standart uzerine buyutulebilir.

## Onerilen Teknoloji Yaklasimi

MVP icin onerilen yapi:

- Frontend: Next.js veya benzeri server-rendered React yapi
- Backend: Next.js API route veya hafif bir Node.js API
- Veritabani: PostgreSQL
- ORM: Prisma veya Drizzle
- Arama: Ilk asamada PostgreSQL full-text search
- Cache: Ilk asamada framework cache; yogun trafik sonrasi Redis
- Hosting: Vercel, Render, Railway veya benzeri yonetimli platform
- Dosya/veri isleme: Zamanlanmis worker veya manuel tetiklenen admin gorevleri

Neden bu yapi:

- SEO onemli oldugu icin sayfalar server-rendered olmali.
- Olay sayfalari paylasilabilir, indekslenebilir ve hizli acilabilir olmali.
- Admin/editor akisinin ayni uygulama icinden yonetilmesi MVP hizini artirir.
- PostgreSQL, olaylar ve fiyat pencereleri gibi iliskisel veri icin yeterince gucludur.

## Uygulama Katmanlari

### 1. Public Site

Kullanicinin gordugu yuzeydir.

- Ana sayfa
- Hisse detay sayfasi
- Olay detay sayfasi
- Olay kategori sayfasi
- Metodoloji sayfasi
- Yasal uyarilar

### 2. Admin Panel

Editor ve kurucu ekibin kullandigi yonetim alanidir.

- Aday olay listesi
- Olay detay duzenleme
- Kaynak ekleme ve dogrulama
- Olay tarihi onayi
- Fiyat tepkisi hesaplama tetikleme
- Yayinlama, geri alma ve arsivleme

### 3. Data Ingestion

Dis kaynaklardan olay adaylarini toplar.

MVP icin once manuel veya yari manuel baslanabilir:

- Editor KAP veya haber linki ekler.
- Sistem baslik, tarih, sirket ve kaynak tipini ayiklar.
- Editor onaylar.
- Fiyat tepkisi otomatik hesaplanir.

Sonraki fazda:

- KAP akisi izlenir.
- Haber kaynaklari RSS/API ile taranir.
- Sirket yatirimci iliskileri sayfalari izlenir.
- Benzer olay adaylari gruplanir.

### 4. Price Engine

Olay tarihi ve ilgili hisseye gore fiyat pencerelerini hesaplar.

Hesaplanacak pencereler:

- Olay gunu
- 1 islem gunu
- 3 islem gunu
- 1 hafta
- 2 hafta
- 30 gun

Ayrica:

- BIST 100 relatif getiri
- Onceki 20 islem gunu hacim ortalamasina gore hacim carpani
- Veri eksikligi veya tatil gunu notu

### 5. Sentiment/Soylem Layer

Ilk MVP'de bu katman temkinli tutulmalidir. Tam otomatik sosyal medya yorumu yerine "kamuya acik soylem ozeti" seklinde sunulmalidir.

MVP secenegi:

- Editor tarafindan kisa nitel gozlem
- Kaynak turu ve soylem yogunlugu notu
- Otomatik pozitif/notr/negatif siniflandirma daha sonra

## Ilk Surum Rotalari

Public rotalar:

- `/`
- `/hisseler`
- `/hisseler/[ticker]`
- `/olaylar/[slug]`
- `/kategoriler/[category]`
- `/metodoloji`
- `/yasal-uyari`

Admin rotalari:

- `/admin`
- `/admin/events`
- `/admin/events/new`
- `/admin/events/[id]`
- `/admin/sources`
- `/admin/price-runs`

## MVP Icin En Kucuk Yayina Hazir Kapsam

Yayina cikmak icin gereken minimum kapsam:

- 20 hisse tanimli
- Her hissede en az 3 onayli olay
- Toplam en az 60 olay
- Her olayda en az 1 kaynak
- Her olayda fiyat tepkisi pencereleri
- Her olayda BIST 100 karsilastirmasi
- Her olayda yayin durumu ve editor onayi
- Metodoloji ve yasal uyari sayfalari

## Fazlara Bolunmus Yol Haritasi

### Faz 1: Temel Urun

- Veri modeli
- Public olay sayfasi
- Hisse sayfasi
- Admin olay ekleme
- Manuel kaynak girisi
- Fiyat tepkisi hesaplama

### Faz 2: Yari Otomatik Aday Olay

- KAP linkinden olay adayi olusturma
- Haber linkinden olay adayi olusturma
- Otomatik sirket ve kategori onerisi
- Editor onay kuyrugu

### Faz 3: Soylem ve Karsilastirma

- Kamuya acik soylem ozeti
- Benzer olaylar
- Kategori bazli tarihsel performans
- Hisseye gore olay tipi dagilimi

### Faz 4: Premium Katman

- Gelismis filtreler
- CSV/Excel disari aktarma
- Izleme listesi
- Alarm
- API
- Profesyonel raporlar

## Kritik Riskler

- Olay tarihinin yanlis belirlenmesi
- Ayni gun birden fazla olayin fiyat etkisini karistirmasi
- Kaynaksiz veya soylenti temelli olay yayinlamak
- Sosyal medya verisini yatirim sinyali gibi gostermek
- Hisse bolunmesi, temettu ve sermaye artirimi gibi fiyat duzeltmelerini hatali ele almak

## Basari Olcutleri

Ilk MVP icin basari, sadece trafikle olculmemeli. Guven ve tekrar kullanim daha onemlidir.

- Olay sayfasi basina ortalama okuma suresi
- Hisse sayfasindan olay detayina tiklama orani
- Arama kullanim orani
- Kaynak linki tiklama orani
- Geri donen kullanici orani
- Yayinlanan olaylarda sonradan duzeltme orani
