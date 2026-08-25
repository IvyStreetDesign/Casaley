const Header = ({ revealed = false }) => (
  <header className={"casaley-header" + (revealed ? " is-revealed" : "")}>
    <nav className="casaley-header__nav" aria-label="Section navigation">
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

window.Header = Header;
