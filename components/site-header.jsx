export default function SiteHeader() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Finans Hafızası ana sayfa">
        <span className="brand-mark">FH</span>
        <span>Finans Hafızası</span>
      </a>
      <nav className="nav" aria-label="Ana menü">
        <a href="/">Gündem</a>
        <a href="/olaylar">Olaylar</a>
        <a href="/hisseler">Hisseler</a>
        <a href="/metodoloji">Metodoloji</a>
        <a href="/yasal-uyari">Yasal</a>
      </nav>
    </header>
  );
}
