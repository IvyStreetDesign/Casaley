const LenleighSection = () => (
  <section className="casaley-lenleigh" id="about">
    <div className="casaley-lenleigh__inner">
      <div className="casaley-lenleigh__grid">
        <div className="casaley-lenleigh__images">
          <figure className="casaley-lenleigh__portrait">
            <img src="./assets/len-glenvill.jpg" alt="Len Glenvill" />
            <figcaption>Len Glenvill</figcaption>
          </figure>
          <figure className="casaley-lenleigh__portrait">
            <img src="./assets/leigh-squarci.jpg" alt="Leigh Squarci" />
            <figcaption>Leigh Squarci</figcaption>
          </figure>
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
