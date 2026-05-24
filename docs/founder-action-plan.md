# Finans Hafizasi Kurucu Aksiyon Plani

Bu plan, domain alindiktan sonra yayina giden yolu adim adim tanimlar. Amac, kurucu tarafinda gereken hesap ve onay adimlarini netlestirmek; teknik tarafta Codex'in ustlenecegi isleri ayirmaktir.

## 1. Domain Guvenligi

Kurucu tarafinda yapilacaklar:

- `finanshafizasi.com` icin otomatik yenilemeyi ac.
- Domain hesabinda iki faktor dogrulamayi aktif et.
- WHOIS gizliligi varsa aktif tut.
- Domain transfer kilidinin acik oldugunu kontrol et.
- Domain yenileme tarihini not et.
- Registrar: GoDaddy.

Codex'in yapabilecekleri:

- DNS kayitlari icin gerekli teknik listeyi hazirlar.
- Hosting secildikten sonra hangi A, CNAME, MX, TXT kayitlarinin girilecegini adim adim tarif eder.
- Kullanici hesaba kendi giris yaptiktan sonra panelde birlikte ilerleyebilir.

## 2. Hosting Secimi

MVP icin ihtiyaclar:

- SEO uyumlu sayfalar
- Kolay domain baglama
- SSL sertifikasi
- Git ile otomatik deploy
- Next.js destegi
- Baslangicta dusuk maliyet

Onerilen teknik rota:

- Uygulama: Next.js
- Hosting: Vercel, Netlify, Cloudflare Pages veya benzeri
- Veritabani: PostgreSQL
- ORM: Prisma veya Drizzle

Kurucu karari:

- Hosting saglayicisi: Vercel.
- Vercel hesabi mevcut ve oturum acildi.
- Baslangicta ucretsiz plan yeterli kabul edilebilir.

Codex'in yapabilecekleri:

- Uygulama iskeletini hazirlar.
- Deploy icin gerekli build ayarlarini yazar.
- Domain baglama adimlarini hazirlar.
- Kullanici yetki verirse veya panelde oturum acarsa DNS ve deploy ayarlarini yapmaya rehberlik eder.

## 3. Kurumsal E-posta

Ilk etap icin onerilen adres:

```text
info@finanshafizasi.com
```

Sonraki adresler:

```text
editor@finanshafizasi.com
data@finanshafizasi.com
legal@finanshafizasi.com
```

Kurucu karari:

- E-posta hemen kurulacak mi, yoksa MVP sonrasina mi birakilacak?
- Google Workspace, Zoho Mail, Microsoft 365 veya registrar e-posta hizmetlerinden hangisi secilecek?

Codex'in yapabilecekleri:

- MX, SPF, DKIM ve DMARC kayitlari icin kontrol listesi hazirlar.
- Alan adi dogrulama kayitlarini girme surecinde adim adim yardim eder.

## 4. Gercek Uygulama Kurulumu

Codex'in ustlenecegi teknik isler:

1. Next.js uygulama iskeletini kur.
2. Public sayfa rotalarini olustur.
3. Admin panel rotalarini olustur.
4. Prisma/Drizzle veri modelini yaz.
5. Ornek verileri veritabani seed formatina cevir.
6. Olay detay sayfasini veri modeline bagla.
7. Hisse detay sayfasini olustur.
8. Editor onay akisinin ilk ekranlarini hazirla.
9. Fiyat tepkisi hesaplama motorunun ilk surumunu yaz.
10. Deploy ayarlarini hazirla.

Kurucu tarafinda gerekenler:

- Hosting hesabi secimi ve acilimi
- Veritabani hesabi veya hosting veritabani secimi
- Gerekirse Codex'e repository veya hosting projesi icin yetki verilmesi
- Domain DNS paneline erisim
- GitHub repository: `https://github.com/khal33-tr/finans-hafizasi`

## 5. Icerik ve Veri Hazirligi

MVP yayin hedefi:

- 20 BIST hissesi
- Hisse basina en az 3 onayli olay
- Toplam en az 60 olay
- Her olayda en az 1 kaynak
- Her olayda standart fiyat tepkisi pencereleri

Kurucu tarafinda yapilacaklar:

- Ilk hisse listesini onayla.
- Kaynak politikalarini onayla.
- Olaylarin manuel/editor onayli girilecegini kabul et.
- Yasal uyarilarin yayindan once kontrol edilecegini onayla.

Codex'in yapabilecekleri:

- Ilk hisse listesini veri dosyasina cevirir.
- Olay giris formu tasarlar.
- KAP/haber linki girilince olay adayi olusturacak akis tasarlar.
- Fiyat tepkisi hesaplama metodunu kodlar.

## 6. Codex'in Dogrudan Panelde Calismasi Icin Guvenli Yol

Sifre veya iki faktor kodu chat'e yazilmaz.

Guvenli calisma yollari:

- Kullanici tarayicida hesaba kendi giris yapar, Codex oturum acilmis panelde adimlari uygular.
- Hosting veya repository icin gecici collaborator yetkisi verilir.
- Ayarlar yapildiktan sonra gereksiz yetkiler kaldirilir.
- Kritik satin alma, silme, transfer veya kalici ucretli islem oncesi kullanicidan onay alinir.

Codex dogrudan yapabilir:

- DNS kayitlarini girme surecinde rehberlik veya panelde uygulama
- Hosting projesi ayarlari
- Deploy ayarlari
- Environment variable giris listesi
- SSL/domain dogrulama kontrolu

Codex kullanici onayi olmadan yapmamalidir:

- Ucretli abonelik baslatmak
- Domain transfer etmek
- Domain silmek veya yenileme kapatmak
- Hesap sifresi, 2FA veya odeme bilgisi degistirmek

## 7. En Yakin Siradaki Kararlar

Kurucunun cevaplamasi gerekenler:

1. Yerel proje dosyalari GitHub repository'ye yuklenecek.
2. E-posta hemen kurulacak mi?
3. Veritabani ilk etapta yerel prototip mi, yoksa cloud PostgreSQL mi olacak?
