const OrangeSection = () => (
  <section className="casaley-orange">
    <div className="casaley-orange__texture" aria-hidden="true" />
    <div className="casaley-orange__inner">
      <span className="casaley-eyebrow" style={{ color: "var(--casaley-royal-blue)" }}>
        Finished by design.<br className="casaley-mobile-br" /> Ready from day one.
      </span>
      <p className="casaley-orange__statement">
        Everything in place from the moment you arrive, so ownership stays simple and the opportunity stays clear.
      </p>
    </div>
  </section>
);

window.OrangeSection = OrangeSection;
