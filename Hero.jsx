const Hero = () => (
  <section className="casaley-hero" data-screen-label="01 Hero">
    <div className="casaley-hero__image" aria-hidden="true">
      <img src="./assets/hero.jpg" alt="" />
      <div className="casaley-hero__veil" />
    </div>

    <div className="casaley-hero__chrome">
      <div className="casaley-hero__top">
        <div className="casaley-hero__topline">
          <span className="casaley-eyebrow">A turnkey collection at Officer</span>
        </div>

        <p className="casaley-hero__lede">
          A hidden gem taking shape in Officer —<br />
          finished homes, ready from day one.
        </p>
      </div>

      <div className="casaley-hero__bottom">
        <div className="casaley-hero__mark-row">
          <img src="./assets/casaley-wordmark-keyline.svg" alt="Casaley" className="casaley-hero__wordmark" />
        </div>
        <button type="button" className="casaley-hero__mobile-cta" data-action="register">
          Register your interest
        </button>
      </div>
    </div>

  </section>
);

window.Hero = Hero;
