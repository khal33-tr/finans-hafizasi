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
            İlk MVP kapsamındaki BIST sembolleri. Her hisse sayfası, şirketin olay geçmişini ve
            standart fiyat tepki pencerelerini göstermek için hazırlanır.
          </p>
        </section>

        <section className="company-grid" aria-label="Hisse listesi">
          {companies.map((company) => {
            const eventCount = getEventsByTicker(company.ticker).length;
            return (
              <a className="company-card" href={`/hisseler/${company.ticker}`} key={company.ticker}>
                <div>
                  <span className="badge">{company.ticker}</span>
                  <h2>{company.name}</h2>
                  <p>{company.description}</p>
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
