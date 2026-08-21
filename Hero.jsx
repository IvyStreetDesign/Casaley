const Hero = () => (
  <section className="casaley-hero" data-screen-label="01 Hero">
    <div className="casaley-hero__stage">
      <figure className="casaley-hero__frame">
        <img src="./assets/hero.jpg" alt="" />
        <div className="casaley-hero__veil" aria-hidden="true" />
        <div className="casaley-hero__over">
          <span className="casaley-eyebrow casaley-hero__eyebrow">A turnkey collection at Officer</span>
          <p className="casaley-hero__lede">
            A hidden gem is taking shape in Officer.<br />
            Finished homes, ready from day one.
          </p>
        </div>
      </figure>

      <img
        src="./assets/casaley-wordmark-keyline.svg"
        alt="Casaley"
        className="casaley-hero__wordmark"
      />
    </div>

    <div className="casaley-hero__intro">
      <h1 className="casaley-hero__intro-title">Opportunity<br />Unearthed</h1>

      <div className="casaley-hero__intro-body">
        <p className="casaley-hero__intro-lead">
          A hidden gem is taking shape in Officer, offering a simple way to invest
          in one of Melbourne&rsquo;s growing communities.
        </p>
        <p className="casaley-hero__intro-copy">
          These finished, turnkey homes are designed to make ownership easy, with
          everything ready from day one. Well connected to shops, schools and
          transport, it&rsquo;s a smart opportunity for investors looking for
          quality, convenience and strong long-term appeal in a well established
          location.
        </p>
        <a className="casaley-hero__intro-cta" href="#residences">View homes</a>
      </div>
    </div>
  </section>
);

window.Hero = Hero;
