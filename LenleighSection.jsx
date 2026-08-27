const LenleighSection = () => (
  <section className="casaley-lenleigh" id="about">
    <div className="casaley-lenleigh__inner">
      <div className="casaley-lenleigh__grid">
        <div className="casaley-lenleigh__logo">
          {/* Pink-tinted copy of the footer's white logo, matching the heading
              beside it. Same artwork and alpha, only the fill differs. */}
          <img src="./assets/lenleigh-logo-pink.png" alt="Len Leigh" />
        </div>

        <div className="casaley-lenleigh__content">
          <h2 className="casaley-lenleigh__title">About LenLeigh</h2>
          <p className="casaley-lenleigh__body">
            Backed by over 35 years of experience, LenLeigh brings a progressive,
            considered approach to residential development, one grounded in quality,
            integrity and a genuine commitment to building communities that enrich the
            way people live. A depth of expertise across design and development lays
            the strong foundation for Casaley&rsquo;s success.
          </p>
        </div>
      </div>
    </div>
  </section>
);

window.LenleighSection = LenleighSection;
