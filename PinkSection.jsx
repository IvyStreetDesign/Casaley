const moments = [
  {
    id: "residences",
    eyebrow: "Location",
    title: "A connected community",
    body: [
      "Officer has grown into a connected, family-focused community in the south east. Close to desirable suburbs such as Berwick, Casaley places you close to everyday treasures, including schools, retail, recreation and everyday amenities. Green space is all part of the appeal, with a significant network of neighbourhood parks throughout the area.",
      "50km away is Melbourne City, connected by convenient public transport and major arterial roads. Officer and Cardinia Road Train Stations make for easy travel to inner city suburbs.",
      "All the things that families value most are close to Casaley.",
    ],
    img: "./assets/pink-train.jpg",
    cta: { label: "View amenity map", href: "./assets/casaley-amenity-map.pdf", download: "Casaley-Amenity-Map.pdf" },
  },
  {
    id: "opportunity",
    eyebrow: "Now selling",
    title: "Rare potential, ready to be uncovered.",
    body: [
      "Introducing Casaley, a residential community with a unique offering. A collection of 4 bedroom turnkey homes designed and crafted by one of Australia's leading builders.",
      "Casaley is an exclusive collection of just 60 architecturally designed homes, perfected by its Officer location in the heart of Melbourne's south-east. Each home is delivered polished, complete and ready for living.",
    ],
    img: "./assets/pink-facade.jpg",
    cta: { label: "View masterplan", href: "./assets/casaley-masterplan.pdf", download: "Casaley-Masterplan.pdf" },
  },
  {
    id: "location",
    eyebrow: "Project updates",
    title: "xxx",
    body: ["xxx"],
    img: "./assets/pink-aerial-placeholder.jpg",
    placeholder: true,
  },
];

const PinkSection = () => {
  const [active, setActive] = React.useState(0);
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
      // Never fall back below the first moment — its image should already be
      // visible as the section scrolls into view, not a bare background block.
      let idx = 0;
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
            {moments.map((m, i) => (
              <article
                key={m.id}
                ref={el => refs.current[i] = el}
                className={"casaley-pink__moment" + (i === active ? " is-active" : "")}
              >
                <div className="casaley-pink__moment-media" aria-hidden="true">
                  <img src={m.img} alt="" />
                  {m.placeholder && <span className="casaley-pink__placeholder-badge">Placeholder only</span>}
                </div>
                <div className="casaley-pink__moment-num">0{i + 1}</div>
                <span className="casaley-eyebrow">{m.eyebrow}</span>
                <h3 className="casaley-pink__moment-title">{m.title}</h3>
                {m.body.map((p, pi) => <p key={pi}>{p}</p>)}
                {m.cta && (
                  <a
                    href={m.cta.href}
                    download={m.cta.download}
                    className="casaley-pink__moment-register"
                  >
                    {m.cta.label}
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="casaley-pink__sticky" style={{ top: imgTop + 'px' }} aria-hidden="true">
            <div className="casaley-pink__stack">
              {moments.map((m, i) => (
                <div key={m.id} className={"casaley-pink__img" + (i === active ? " is-active" : "")}>
                  <img src={m.img} alt="" />
                  {m.placeholder && <span className="casaley-pink__placeholder-badge">Placeholder only</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.PinkSection = PinkSection;
