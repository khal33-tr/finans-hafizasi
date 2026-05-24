import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata = {
  title: "Metodoloji | Finans Hafızası",
  description: "Finans Hafızası olay seçimi, fiyat tepkisi ve editör onay metodolojisi."
};

const steps = [
  {
    title: "Olay seçimi",
    body:
      "Bir kayıt arşive girmeden önce KAP, şirket duyurusu, resmi kurum açıklaması veya güvenilir haber kaynağıyla desteklenmelidir."
  },
  {
    title: "Tarih standardı",
    body:
      "Olay tarihi, bilginin kamuya açıklandığı tarih olarak alınır. Seans kapanışı sonrası açıklamalarda ilk piyasa tepkisi bir sonraki işlem gününden başlatılabilir."
  },
  {
    title: "Fiyat tepkisi",
    body:
      "1G, 3G, 1H, 2H ve 30G pencereleri standart olarak gösterilir. Hisse getirisi BIST 100 ile karşılaştırılır."
  },
  {
    title: "Editör onayı",
    body:
      "Başlık, kaynak, olay tarihi, özet, veri notu ve hesap tekrar üretilebilirliği yayın öncesi editör kontrolünden geçer."
  }
];

export default function MethodologyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">Güven standardı</p>
          <h1>Metodoloji</h1>
          <p className="lead">
            Finans Hafızası, olayları yorumlamak yerine kaynakları ve piyasa tepkilerini düzenli bir
            standartla sunar. Bu sayfa hesaplama ve yayınlama yaklaşımını özetler.
          </p>
        </section>

        <section className="methodology-list">
          {steps.map((step, index) => (
            <article className="content-panel" key={step.title}>
              <span className="step-number">{index + 1}</span>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </article>
          ))}
        </section>

        <section className="content-panel wide-panel">
          <p className="eyebrow">Hesap formülü</p>
          <h2>Standart getiri hesabı</h2>
          <pre className="formula">Getiri = (Pencere sonu fiyatı - baz fiyat) / baz fiyat</pre>
          <pre className="formula">Göreli getiri = Hisse getirisi - BIST 100 getirisi</pre>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
