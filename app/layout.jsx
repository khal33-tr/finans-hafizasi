import "./globals.css";

export const metadata = {
  title: "Finans Hafizasi",
  description:
    "BIST sirket olaylarini, kaynaklari ve piyasa tepkileriyle birlikte inceleyen tarafsiz finans arsivi.",
  metadataBase: new URL("https://finanshafizasi.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Finans Hafizasi",
    description:
      "Haber degil, piyasa hafizasi. Olaylari, fiyat tepkilerini ve kaynaklari birlikte inceleyin.",
    url: "https://finanshafizasi.com",
    siteName: "Finans Hafizasi",
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
