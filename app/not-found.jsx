import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">Sayfa bulunamadı</p>
          <h1>Bu kayıt henüz Finans Hafızası'nda yok.</h1>
          <p className="lead">
            Aradığınız sayfa taşınmış, henüz yayınlanmamış veya hatalı yazılmış olabilir. Hisse
            listesine dönerek mevcut arşiv kayıtlarını inceleyebilirsiniz.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="/hisseler">
              Hisseleri görüntüle
            </a>
            <a className="secondary-link" href="/">
              Ana sayfaya dön
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
