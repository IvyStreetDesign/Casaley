const Footer = () => (
  <footer className="casaley-footer">
    <div className="casaley-footer__inner">
      <div className="casaley-footer__right">
        {/* Same .casaley-footer__address class as Visit us, so the label size,
            line spacing and the 64px gap either side come from that one rule
            rather than being retuned to match it by eye. */}
        <div className="casaley-footer__address">
          <span className="casaley-footer__label">Contact us</span>
          <p>Ellen Vacouftsis<br /><a href="tel:0437098406">0437 098 406</a> &nbsp;|&nbsp; <a href="mailto:ellen@lenleigh.com.au">ellen@lenleigh.com.au</a></p>
        </div>

        <div className="casaley-footer__address">
          <span className="casaley-footer__label">Visit us</span>
          <p>46 Tivendale Rd<br />Officer, VIC 3809</p>
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

      <div className="casaley-footer__brand">
        <img src="./assets/casaley-wordmark-dusty-pink.svg" alt="Casaley Officer" className="casaley-footer__mark-img" />
        <img src="./assets/lenleigh-logo.png" alt="Len Leigh" className="casaley-footer__lenleigh-img" />
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
