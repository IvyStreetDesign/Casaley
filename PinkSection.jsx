const moments = [
  {
    id: "location",
    eyebrow: "Location",
    title: "A connected community.",
    body: [
      "Officer has grown into a connected, family-focused community in Melbourne’s south-east. Close to Berwick, Casaley puts schools, retail, recreation, parks and everyday amenity within easy reach.",
      "Around 50km from Melbourne CBD, Officer is connected by major roads and public transport, including Officer and Cardinia Road stations. Beyond lifestyle, Officer offers strong fundamentals for continued residential and rental demand, supported by affordability, established infrastructure and population growth. Cardinia Shire is forecast to grow by approximately 23% between 2024 and 2034, supporting demand for well-connected housing. Casaley presents an opportunity to invest in a growing area with appeal for both owner-occupiers and renters.",
    ],
    img: "./assets/pink-train.jpg",
    cta: { label: "View amenity map", href: "./assets/casaley-amenity-map.pdf", download: "Casaley-Amenity-Map.pdf" },
  },
  {
    id: "now-selling",
    eyebrow: "Now selling",
    title: "Rare potential, ready to be uncovered.",
    body: [
      "Introducing Casaley, a boutique residential community with a unique offering.",
      "An exclusive collection of just 60 lots, perfected by its Officer location in the heart of Melbourne's south-east. Premium land ready for architecturally designed homes, built by the builder of your choice.",
    ],
    img: "./assets/pink-facade.jpg",
    cta: { label: "View masterplan", href: "./assets/casaley-masterplan.pdf", download: "Casaley-Masterplan.pdf" },
  },
  {
    id: "project-updates",
    eyebrow: "Project updates",
    title: "Stage 1 in progress.",
    body: ["We're thrilled to announce that we've broken ground on the Casaley site, with civil works on stage 1 now underway."],
    img: "./assets/pink-aerial-placeholder.jpg",
    placeholder: true,
  },
];

const PinkSection = () => {
  const [active, setActive] = React.useState(0);
  const [imgTop, setImgTop] = React.useState(0);
  const [imgHeight, setImgHeight] = React.useState(null);
  const refs       = React.useRef([]);
  const sectionRef = React.useRef(null);

  // Crossfade: activate the moment whose centre has passed 92% of viewport height
  const suppressUntil = React.useRef(0);
  React.useEffect(() => {
    let raf = 0;
    const TRIGGER = 0.92;
    const pick = () => {
      raf = 0;
      if (Date.now() < suppressUntil.current) return;
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
    // Section-nav links jump straight to a moment's top (via scroll-margin-top),
    // which can land two moments at once past the generous 92% trigger line —
    // the loose threshold is tuned for organic scroll, not a jump. When the
    // hash matches a moment, activate it directly and hold the scroll-driven
    // picker off briefly so it doesn't immediately overwrite that choice.
    const onHashNav = () => {
      const id = window.location.hash.slice(1);
      const idx = moments.findIndex(m => m.id === id);
      if (idx !== -1) {
        setActive(idx);
        suppressUntil.current = Date.now() + 700;
      }
    };
    pick();
    if (window.location.hash) onHashNav();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onHashNav);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashNav);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Sticky image size — matches the first moment's own rendered height (its
  // text frame top to the amenity-map button's bottom), so every crossfaded
  // image shares one consistent height instead of a viewport-relative one.
  // Recalculated on resize only, not on scroll, to keep the sticky element
  // from jittering.
  React.useEffect(() => {
    const update = () => {
      if (!sectionRef.current || !refs.current[0]) return;
      if (window.matchMedia('(max-width: 980px)').matches) { setImgTop(0); setImgHeight(null); return; }
      const h = refs.current[0].getBoundingClientRect().height;
      const navH = 64;
      setImgHeight(h);
      setImgTop(navH + (window.innerHeight - navH - h) / 2);
    };
    window.addEventListener("resize", update);
    update();
    // Re-measure once webfonts finish loading — an early measurement can be
    // taken against fallback-font line heights.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="casaley-pink" ref={sectionRef}>
      <div className="casaley-pink__inner">
        <div className="casaley-pink__grid">
          <div className="casaley-pink__col">
            {moments.map((m, i) => (
              <article
                key={m.id}
                id={m.id}
                ref={el => refs.current[i] = el}
                className={"casaley-pink__moment" + (i === active ? " is-active" : "")}
                // Anchor-jump lands the text level with the sticky image's own
                // resting position, not tucked under the header, so nav clicks
                // land on a pair that reads as aligned rather than a text block
                // sitting far above a lower, centred image.
                style={imgHeight != null ? { scrollMarginTop: imgTop + 'px' } : undefined}
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
            {/* Trailing buffer, not a moment-to-moment gap: gives the sticky
                image room to stay in its centred resting position through the
                last moment's natural reading position, instead of running out
                of scroll room and snapping to bottom-aligned right as the
                last (short) moment comes into view. */}
            {imgHeight != null && (
              <div aria-hidden="true" style={{ height: imgHeight * 0.6 + 'px' }} />
            )}
          </div>

          <div
            className="casaley-pink__sticky"
            style={{ top: imgTop + 'px', height: imgHeight != null ? imgHeight + 'px' : undefined }}
            aria-hidden="true"
          >
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
