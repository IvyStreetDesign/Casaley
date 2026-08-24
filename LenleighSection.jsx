const LenleighSection = () => (
  <section className="casaley-lenleigh">
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
          <h2 className="casaley-lenleigh__title">About Lenleigh</h2>
          <p className="casaley-lenleigh__body">
            Lenleigh, a division of Glenvill, carries forward the values that have shaped
            Glenvill for decades. It brings a progressive, considered approach to
            development, one grounded in quality, integrity, and a genuine commitment to
            building communities that enrich the way people live. This shared expertise
            across design and development lays the foundation for Casaley&rsquo;s success.
          </p>
        </div>
      </div>
    </div>
  </section>
);

window.LenleighSection = LenleighSection;
