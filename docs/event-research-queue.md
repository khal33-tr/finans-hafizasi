# Olay Araştırma Kuyruğu

Bu doküman, Finans Hafızası'nın ilk gerçek içerik üretim sırasını tanımlar. Amaç, rastgele haber toplamak değil; 20 hissede en yüksek arşiv değerine sahip olay sınıflarını sistemli biçimde araştırmaktır.

## Kural

Bu kuyruk olay iddiası değildir. Aşağıdaki her satır, editörün araştıracağı ve kaynakla doğrulayacağı hedef olay sınıfıdır.

Bir olay gerçek kayıt haline gelmeden önce:

- Doğrudan KAP, şirket yatırımcı ilişkileri, Borsa İstanbul veya SPK kaynağı bulunur.
- Olay tarihi ve açıklama saati kontrol edilir.
- Tepki başlangıç tarihi işlem gününe göre belirlenir.
- 1G, 3G, 1H, 2H ve 30G fiyat tepkisi hesaplanır.
- BIST 100 göreli performansı ve hacim çarpanı eklenir.
- Özet yatırım tavsiyesi içermeyecek şekilde yazılır.

## İlk Araştırma Sırası

1. THYAO - finansal sonuç açıklaması
2. TUPRS - temettü veya kar payı kararı
3. ASELS - yeni sözleşme veya iş ilişkisi açıklaması
4. KCHOL - finansal sonuç açıklaması
5. SAHOL - iştirak veya portföy gelişmesi
6. EREGL - temettü veya kar dağıtım kararı
7. SISE - kapasite veya yatırım açıklaması
8. BIMAS - finansal sonuç açıklaması
9. AKBNK - finansal sonuç açıklaması
10. GARAN - finansal sonuç açıklaması

Bu ilk 10 kayıt tamamlandığında site, sadece örnek kart değil gerçek araştırma akışının ilk ürününü göstermeye başlayabilir.

## 20 Hisse İçin Hedef Olaylar

| Öncelik | Hisse | Araştırılacak 3 olay sınıfı |
|---:|---|---|
| 1 | THYAO | Finansal sonuç, trafik verisi, filo veya kapasite açıklaması |
| 2 | TUPRS | Temettü, finansal sonuç, rafineri marjı veya enerji etkisi |
| 3 | ASELS | Sözleşme, finansal sonuç, ürün veya teslimat açıklaması |
| 4 | KCHOL | Finansal sonuç, iştirak gelişmesi, temettü |
| 5 | SAHOL | Finansal sonuç, iştirak veya portföy gelişmesi, temettü |
| 6 | EREGL | Temettü, finansal sonuç, çelik fiyatı veya sektör etkisi |
| 7 | SISE | Yatırım, finansal sonuç, enerji maliyeti veya küresel talep |
| 8 | BIMAS | Finansal sonuç, regülasyon, mağaza büyümesi |
| 9 | AKBNK | Finansal sonuç, bankacılık regülasyonu, temettü veya sermaye kararı |
| 10 | GARAN | Finansal sonuç, bankacılık regülasyonu, temettü veya sermaye kararı |
| 11 | YKBNK | Finansal sonuç, bankacılık regülasyonu, sermaye yeterliliği |
| 12 | ISCTR | Finansal sonuç, temettü, bankacılık regülasyonu |
| 13 | TCELL | Finansal sonuç, temettü, telekom regülasyonu |
| 14 | FROTO | Finansal sonuç, yatırım veya üretim açıklaması, ihracat etkisi |
| 15 | TOASO | Finansal sonuç, üretim anlaşması, temettü |
| 16 | SASA | Sermaye işlemi, yatırım açıklaması, finansal sonuç |
| 17 | HEKTS | Sermaye işlemi, finansal sonuç, yatırım açıklaması |
| 18 | KONTR | Sözleşme, yatırım açıklaması, finansal sonuç |
| 19 | ASTOR | Sözleşme veya sipariş, ihracat etkisi, finansal sonuç |
| 20 | PETKM | Finansal sonuç, emtia/petrokimya marjı, operasyonel gelişme |

## Kaynak Sırası

| Amaç | Birincil kaynak | Destekleyici kaynak |
|---|---|---|
| Şirket olayı | KAP veya şirket yatırımcı ilişkileri | Güvenilir haber kaynağı |
| Piyasa fiyatı | Borsa İstanbul veya seçilecek veri sağlayıcı | Veri sağlayıcı dokümantasyonu |
| Regülasyon | SPK veya resmi kurum açıklaması | Haber kaynağı |
| Söylem özeti | Kamuya açık yorum örneklemi | Editör notu |

## Veri Giriş Akışı

1. `data/research-queue.json` dosyasındaki hedeflerden biri seçilir.
2. Doğrudan kaynak linki bulunur.
3. `data/event-intake-template.json` şablonu kopyalanır.
4. Olayın `verificationStatus` alanı önce `candidate`, sonra kontrol tamamlanınca `verified` yapılır.
5. Hesaplar eklenmeden gerçek kayıt yayına alınmaz.

## Sonraki Çıktı

İlk 10 hedef için gerçek kaynak linkleri bulunmuş ve `data/candidate-events.json` dosyasına `candidate` kayıtlar olarak eklenmiştir.

Sıradaki çıktı, bu candidate kayıtlar için fiyat, hacim ve BIST 100 hesaplama girdilerini standartlaştırmaktır. Böylece kayıtlar `verified` statüsüne yaklaştırılabilir.
