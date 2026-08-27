const Hero = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

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
      wm.style.setProperty("--wm-parallax", (progress * -240).toFixed(1) + "px");
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
            {/* Stands in for the nav on narrow screens, where the four links no
                longer sit comfortably on one line over the image. */}
            <button
              type="button"
              className={"casaley-hero__burger" + (menuOpen ? " is-open" : "")}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
            <span className="casaley-hero__disclaimer">Artist impression</span>
            <nav
              className={"casaley-eyebrow casaley-hero__nav" + (menuOpen ? " is-open" : "")}
              aria-label="Section navigation"
              /* A link jump would otherwise leave the panel sitting open over
                 the section it just moved to. */
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
            <p className="casaley-hero__lede">
              A hidden gem is taking shape in Officer.
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
            A hidden gem is taking shape in Officer, offering a simple way to build
            in one of Melbourne&rsquo;s growing communities.
          </p>
          <p className="casaley-hero__intro-copy">
            Well connected to shops, schools and transport, Casaley offers the
            opportunity to deliver quality homes in an established growth
            corridor. With strong buyer demand and a well-positioned location,
            it&rsquo;s a project with plenty of potential from the ground up.
          </p>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
