import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata = {
  title: "Yasal Uyarı | Finans Hafızası",
  description: "Finans Hafızası yatırım tavsiyesi sunmaz; içerikler geçmiş verileri incelemek içindir."
};

export default function LegalNoticePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">Yasal çerçeve</p>
          <h1>Yatırım tavsiyesi değildir</h1>
          <p className="lead">
            Finans Hafızası, geçmiş olayları ve piyasa verilerini incelemek için hazırlanmış bir
            arşiv ürünüdür. Platformdaki bilgiler alım, satım veya elde tutma tavsiyesi değildir.
          </p>
        </section>

        <section className="legal-content">
          <article className="content-panel">
            <h2>Bilgilendirme amacı</h2>
            <p>
              Sitede yer alan içerikler, kamuya açık kaynaklardan ve örnek veri setlerinden
              oluşturulan tarihsel inceleme notlarıdır. Gelecekteki fiyat hareketlerini garanti
              etmez.
            </p>
          </article>

          <article className="content-panel">
            <h2>Veri sınırları</h2>
            <p>
              Fiyat tepkisi, hacim ve söylem özetleri veri sağlayıcı, işlem takvimi, temettü
              düzeltmesi ve editör doğrulaması gibi süreçlere bağlıdır. Eksik veya hatalı veri
              tespit edildiğinde kayıtlar güncellenebilir.
            </p>
          </article>

          <article className="content-panel">
            <h2>Kullanıcı sorumluluğu</h2>
            <p>
              Yatırım kararları kullanıcının kendi değerlendirmesi ve gerektiğinde lisanslı yatırım
              danışmanlığı hizmetiyle alınmalıdır. Finans Hafızası hiçbir kullanıcı adına yatırım
              kararı vermez.
            </p>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
