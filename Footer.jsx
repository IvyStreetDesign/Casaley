// Credit slots mirror Alba's four-logo row. Casaley's consultant team was not
// supplied, so each slot carries an em-dash placeholder — swap the text for a
// name, or restore <img> logos, without touching the grid.
const credits = [
  { label: "Development",  name: "—", href: null },
  { label: "Interiors",    name: "—", href: null },
  { label: "Architecture", name: "—", href: null },
  { label: "Construction", name: "—", href: null },
];

const Footer = () => (
  <footer className="casaley-footer">
    <div className="casaley-footer__inner">
      <div className="casaley-footer__brand">
        <img src="./assets/casaley-wordmark-dusty-pink.svg" alt="Casaley Officer" className="casaley-footer__mark-img" />
      </div>

      <div className="casaley-footer__credits">
        {credits.map(c => (
          <span key={c.label} className="casaley-footer__label">{c.label}</span>
        ))}
        {credits.map(c => (
          c.href ? (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="casaley-footer__credit-link">
              <span className="casaley-footer__credit">{c.name}</span>
            </a>
          ) : (
            <span key={c.label} className="casaley-footer__credit">{c.name}</span>
          )
        ))}
      </div>

      <div className="casaley-footer__legal">
        <span>
          <a href="./privacy-policy.html">Privacy policy</a>
          {"  |  "}
          <a href="./disclaimer.html">Disclaimer</a>
        </span>
        <span>
          <span>© 2026 Casaley Officer</span>
          {"  |  "}
          <a href="http://ivystreet.com.au/" target="_blank" rel="noopener noreferrer">Site by IvyStreet</a>
        </span>
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
