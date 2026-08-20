const Hero = () => (
  <section className="casaley-hero" data-screen-label="01 Hero">
    <div className="casaley-hero__image" aria-hidden="true">
      <img src="./assets/hero.jpg" alt="" />
      <div className="casaley-hero__veil" />
    </div>

    <div className="casaley-hero__chrome">
      <div className="casaley-hero__topline">
        <span className="casaley-eyebrow">A turnkey collection at Officer</span>

      </div>

      <div className="casaley-hero__mark-row">
        <img src="./assets/casaley-wordmark-dusty-pink.svg" alt="Casaley" className="casaley-hero__wordmark" />
      </div>

      <div className="casaley-hero__bottom">
        <p className="casaley-hero__lede">
          A hidden gem taking shape in Officer —<br />
          finished homes, ready from day one.
        </p>
        <button type="button" className="casaley-hero__mobile-cta" data-action="register">
          Register your interest
        </button>
      </div>
    </div>

  </section>
);

window.Hero = Hero;
