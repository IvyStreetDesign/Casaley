const Footer = () => (
  <footer className="casaley-footer">
    <div className="casaley-footer__inner">
      <div className="casaley-footer__brand">
        <img src="./assets/casaley-wordmark-dusty-pink.svg" alt="Casaley Officer" className="casaley-footer__mark-img" />
        <img src="./assets/lenleigh-logo.png" alt="Len Leigh" className="casaley-footer__lenleigh-img" />
      </div>

      <div className="casaley-footer__right">
        <div className="casaley-footer__address">
          <span className="casaley-footer__label">Visit us</span>
          <p>45 Tivendale Rd<br />Officer, VIC 3809</p>
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
    </div>
  </footer>
);

window.Footer = Footer;
