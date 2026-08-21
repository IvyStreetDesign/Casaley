const Hero = () => {
  // Subtle parallax: the keyline drifts up a touch slower than the page as the
  // fold scrolls away. Disabled under reduced-motion.
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wm = document.querySelector(".casaley-hero__wordmark");
    const hero = document.querySelector(".casaley-hero");
    if (!wm || !hero) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
      wm.style.setProperty("--wm-parallax", (progress * -46).toFixed(1) + "px");
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
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
};

window.Hero = Hero;
