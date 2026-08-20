# Casaley Officer — one-page site

A single-page marketing site for the Casaley housing development at Officer,
Victoria. Static HTML, CSS and vanilla JS — no build step, no framework, no
runtime dependencies.

```
index.html
css/
  fonts.css        Host Grotesk @font-face declarations
  styles.css       Design tokens, layout, components, scroll-reveal states
js/
  main.js          Scroll reveals, hero parallax, sticky nav, drawer, form
assets/
  brand/           Wordmarks and lockups (SVG)
  fonts/           Host Grotesk variable woff2 (~67 KB total)
  img/             Photography
  pattern/         The Casaley line pattern as a seamless tile
```

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
```

## Brand implementation

**Colour.** The four brand colours were sampled straight out of the master
brandmark SVGs, so they are exact rather than eyeballed:

| Token | Hex | Source file |
| --- | --- | --- |
| `--royal-blue` | `#34469d` | `Casaley - Master Brandmark ROYAL BLUE RGB.svg` |
| `--dusty-pink` | `#e4c3bc` | `Casaley - Master Brandmark DUSTY PINK RGB.svg` |
| `--red-velvet` | `#8b4749` | `Casaley - Master Brandmark RED VELVET RGB.svg` |
| `--spicy-orange` | `#df5a3a` | `Casaley - Master Brandmark SPICY ORANGE RGB.svg` |

Both brand gradients are also tokenised (`--gradient-one` orange→blue,
`--gradient-two` pink→orange). Gradient two carries the pillars section.

**Brandmark.** `assets/brand/casaley-lockup-*.svg` are the supplied master
files, untouched. Two derivatives were generated from them by isolating the
CASALEY letterforms from the OFFICER sub-text:

- `casaley-wordmark.svg` — solid, `currentColor`
- `casaley-wordmark-outline.svg` — stroked, used inline for the giant hero
  wordmark so its colour and stroke weight stay under CSS control

**Pattern.** `Casaley pattern.pdf` was decomposed to its underlying geometry
and rebuilt as a seamless 98.065 × 108.72 tile
(`assets/pattern/casaley-pattern.svg`). In CSS it is applied through the
`--pattern` token as a data URI; any section gets it by taking the
`.patterned` class, with per-section strength via `--pattern-opacity`.

**Chamfer.** The clipped corners of the letterforms are abstracted into two
`clip-path` tokens: `--chamfer` (poster-weight, used for the outline motif
over the feature render) and `--chamfer-soft` (restrained, used on panels
carrying copy).

**Type.** Host Grotesk, variable weight 300–800, self-hosted so the page makes
no third-party request. To serve the Adobe Fonts (Typekit) cut instead, swap
the `css/fonts.css` link in `index.html` for your kit — `--font` already asks
for `"Host Grotesk"` first, so nothing else changes.

## Motion

All of it degrades cleanly and is fully disabled under
`prefers-reduced-motion: reduce`.

- **Scroll reveal** — `IntersectionObserver` fades and lifts elements once as
  they enter view; `--reveal-delay` staggers groups.
- **Wipe reveal** — images uncover with a `clip-path` inset. The clip sits on
  the inner `<img>`, not the observed element: Chromium factors an element's
  own `clip-path` into its intersection rect, so a fully clipped target would
  never trigger its own observer.
- **Hero parallax** — the photograph drifts down while the outline wordmark
  rises, so the two separate as the hero scrolls away. Driven by CSS custom
  properties set inside a `requestAnimationFrame` callback.
- **Line rise** — the `Opportunity Unearthed` headline animates per line.
- **Sticky bar** — appears past the hero, retracts while scrolling down,
  returns on any upward scroll.
- **Drawer** — full-screen menu with a `clip-path` sweep and staggered links;
  traps nothing but closes on Escape, on link click, and on the close button.

## Before this goes live

- **Enquiry form** has no endpoint. Add `data-endpoint="https://…"` to
  `#enquiryForm` and it will POST the fields as JSON; without it the handler
  says so rather than pretending to send. Validation already runs either way.
- **Contact details** (`hello@casaley.com.au`, `1300 000 000`) are
  placeholders throughout `index.html` and the footer.
- **Home names, descriptions and specifications** in the Homes section are
  indicative and need replacing with the real release. No pricing is stated
  anywhere by design.
- **Location list** names real Officer landmarks but deliberately carries no
  distances or travel times — add them once confirmed.
- **Legal links** (privacy policy, disclaimer) point at `#`.
