import { companies, events } from "@/lib/market-data";

const baseUrl = "https://www.finanshafizasi.com";

export default function sitemap() {
  const staticRoutes = ["", "/olaylar", "/hisseler", "/metodoloji", "/yasal-uyari"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7
  }));

  const stockRoutes = companies.map((company) => ({
    url: `${baseUrl}/hisseler/${company.ticker}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const eventRoutes = events.map((event) => ({
    url: `${baseUrl}/olaylar/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75
  }));

  return [...staticRoutes, ...stockRoutes, ...eventRoutes];
}
