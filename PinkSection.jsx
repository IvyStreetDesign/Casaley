const moments = [
  {
    id: "residences",
    eyebrow: "Residences",
    title: "Turnkey homes, polished and complete.",
    body: "Every Casaley home is delivered finished — landscaped, fenced and detailed to a consistent standard. There is nothing left to specify, coordinate or wait on, so the home is ready to live in or lease from the day it settles.",
    img: "./assets/residences.jpg",
  },
  {
    id: "opportunity",
    eyebrow: "Opportunity",
    title: "Rare potential, ready to be uncovered.",
    body: "Low-maintenance living, thoughtful design and steady demand in the surrounding area make each home an accessible way to invest with confidence. It is a straightforward entry into one of Melbourne's growing communities, without the risk that comes with building from scratch.",
    img: "./assets/streetscape.jpg",
  },
  {
    id: "location",
    eyebrow: "Location",
    title: "Local treasures around every corner.",
    body: "Officer sits in Melbourne's south-east growth corridor, in the City of Cardinia. Schools, shops and parkland are already established, with Officer Station on the Pakenham line and the Princes Freeway close at hand for the run into the city.",
    img: "./assets/lifestyle.jpg",
  },
];

const PinkSection = () => {
  const [active, setActive] = React.useState(-1);
  const [imgTop, setImgTop] = React.useState(0);
  const refs       = React.useRef([]);
  const sectionRef = React.useRef(null);

  // Crossfade: activate the moment whose centre has passed 92% of viewport height
  React.useEffect(() => {
    let raf = 0;
    const TRIGGER = 0.92;
    const pick = () => {
      raf = 0;
      const trigger = window.innerHeight * TRIGGER;
      let idx = -1;
      for (let i = 0; i < refs.current.length; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top + r.height / 2 <= trigger) idx = i;
      }
      setActive(idx);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick); };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Sticky image top — constant per viewport height, recalculated only on resize.
  // Keeping this out of the scroll handler prevents jitter on the sticky element.
  React.useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      if (window.matchMedia('(max-width: 980px)').matches) { setImgTop(0); return; }
      const imgHeight = window.innerHeight - 560; // matches CSS calc(100vh - 560px)
      const navH = 64;
      setImgTop(navH + (window.innerHeight - navH - imgHeight) / 2);
    };
    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="casaley-pink" id="residences" ref={sectionRef}>
      <div className="casaley-pink__inner">
        <div className="casaley-pink__grid">
          <div className="casaley-pink__col">
            <header className="casaley-pink__head">
              <span className="casaley-eyebrow">Welcome to Casaley Officer</span>
              <h2 className="casaley-pink__title">Opportunity<br />Unearthed</h2>
              <div className="casaley-pink__intro">
                <p>A hidden gem is taking shape in Officer, offering a simple way to invest in one of Melbourne's growing communities.</p>
                <p>These finished, turnkey homes are designed to make ownership easy, with everything ready from day one — well connected to shops, schools and transport, in a well established location.</p>
              </div>
              <button type="button" className="casaley-pink__register-cta" data-action="register">
                Register your interest
              </button>
            </header>

            {moments.map((m, i) => (
              <article
                key={m.id}
                ref={el => refs.current[i] = el}
                className={"casaley-pink__moment" + (i === active ? " is-active" : "")}
              >
                <img src={m.img} alt="" className="casaley-pink__moment-img" aria-hidden="true" />
                <div className="casaley-pink__moment-num">0{i + 1}</div>
                <span className="casaley-eyebrow">{m.eyebrow}</span>
                <h3 className="casaley-pink__moment-title">{m.title}</h3>
                <p>{m.body}</p>
                <button type="button" className="casaley-pink__moment-register" data-action="register">
                  Register your interest
                </button>
              </article>
            ))}
          </div>

          <div className="casaley-pink__sticky" style={{ top: imgTop + 'px' }} aria-hidden="true">
            <div className="casaley-pink__stack">
              <img
                src="./assets/detail.jpg"
                alt=""
                className={"casaley-pink__img" + (active === -1 ? " is-active" : "")}
              />
              {moments.map((m, i) => (
                <img
                  key={m.id}
                  src={m.img}
                  alt=""
                  className={"casaley-pink__img" + (i === active ? " is-active" : "")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.PinkSection = PinkSection;
