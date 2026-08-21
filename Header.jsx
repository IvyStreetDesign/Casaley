const Header = ({ revealed = false, formOpen = false, onRegisterClick }) => (
  <header className={"casaley-header" + (revealed ? " is-revealed" : "")}>
    <a href="#top" className="casaley-header__mark" aria-label="Casaley Officer">
      <img src="./assets/casaley-wordmark-dusty-pink.svg" alt="Casaley" className="casaley-header__wordmark" />
    </a>
    {!formOpen && (
      <button type="button" className="casaley-header__cta" onClick={onRegisterClick}>
        Register your interest
      </button>
    )}
  </header>
);

window.Header = Header;
