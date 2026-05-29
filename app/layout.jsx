import "./globals.css";

export const metadata = {
  title: "Finans Hafızası",
  description:
    "BIST şirket olaylarını, kaynakları ve piyasa tepkileriyle birlikte inceleyen tarafsız finans arşivi.",
  metadataBase: new URL("https://www.finanshafizasi.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Finans Hafızası",
    description:
      "Haber değil, piyasa hafızası. Olayları, fiyat tepkilerini ve kaynakları birlikte inceleyin.",
    url: "https://www.finanshafizasi.com",
    siteName: "Finans Hafızası",
    locale: "tr_TR",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
