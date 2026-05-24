import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { companies, getEventsByTicker } from "@/lib/market-data";

export const metadata = {
  title: "Hisseler | Finans Hafızası",
  description: "Finans Hafızası izleme havuzundaki ilk BIST sembolleri ve olay arşivi kapsamı."
};

export default function StocksPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">İzleme havuzu</p>
          <h1>Hisseler</h1>
          <p className="lead">
            İlk MVP kapsamındaki BIST sembolleri. Her hisse sayfası şirketin olay geçmişini, kaynak
            kalitesini ve standart fiyat tepki pencerelerini düzenlemek için hazırlanır.
          </p>
        </section>

        <section className="info-strip" aria-label="Hisse arşivi özeti">
          <div className="compact-stat">
            <strong>{companies.length}</strong>
            <span>BIST sembolü</span>
          </div>
          <div className="compact-stat">
            <strong>5</strong>
            <span>standart tepki penceresi</span>
          </div>
          <div className="compact-stat">
            <strong>KAP</strong>
            <span>öncelikli kaynak standardı</span>
          </div>
        </section>

        <section className="company-grid" aria-label="Hisse listesi">
          {companies.map((company) => {
            const eventCount = getEventsByTicker(company.ticker).length;
            return (
              <a className="company-card" href={`/hisseler/${company.ticker}`} key={company.ticker}>
                <div>
                  <div className="company-card-top">
                    <span className="badge">{company.ticker}</span>
                    <span>#{company.priority}</span>
                  </div>
                  <h2>{company.name}</h2>
                  <p>{company.description}</p>
                  <p className="watch-reason">{company.watchReason}</p>
                </div>
                <div className="company-card-foot">
                  <span>{company.sector}</span>
                  <strong>{eventCount} kayıt</strong>
                </div>
              </a>
            );
          })}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
