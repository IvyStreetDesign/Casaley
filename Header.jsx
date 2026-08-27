const Header = ({ revealed = false }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // A header that scrolls away while its menu is open would leave the panel
  // stranded over the page, so close it as the header hides.
  React.useEffect(() => { if (!revealed) setMenuOpen(false); }, [revealed]);

  return (
    <header className={"casaley-header" + (revealed ? " is-revealed" : "")}>
      {/* Stands in for the nav on narrow screens, matching the hero fold's. */}
      <button
        type="button"
        className={"casaley-header__burger" + (menuOpen ? " is-open" : "")}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav
        className={"casaley-header__nav" + (menuOpen ? " is-open" : "")}
        aria-label="Section navigation"
        onClick={() => setMenuOpen(false)}
      >
        <a href="#location">Location</a>
        <span aria-hidden="true">/</span>
        <a href="#now-selling">Now selling</a>
        <span aria-hidden="true">/</span>
        <a href="#project-updates">Project updates</a>
        <span aria-hidden="true">/</span>
        <a href="#about">About</a>
      </nav>
      <a href="#top" className="casaley-header__mark" aria-label="Casaley Officer">
        <img src="./assets/casaley-wordmark-dusty-pink.svg" alt="Casaley" className="casaley-header__wordmark" />
      </a>
    </header>
  );
};

window.Header = Header;
