# Casaley Officer

A one-page site for the Casaley housing development at Officer, Victoria.

It is a **structural clone of the Alba Parkdale site**, reskinned with the
Casaley brand. Layout, component structure, scroll behaviour, interaction
model, motion curves and durations are carried over unchanged; colour, type,
imagery, texture and copy are Casaley's.

## Running it

No build step. Serve the folder:

```sh
python3 -m http.server 8000
```

JSX is compiled in the browser by Babel Standalone, exactly as Alba does it.
React, ReactDOM and Babel load from unpkg with the same pinned versions and
SRI hashes as Alba, so an internet connection is required on first load.

## File map — Alba → Casaley

Every Alba file has a one-to-one counterpart, renamed where Casaley's content
or brand diverges from Alba's.

| Alba | Casaley | Notes |
| --- | --- | --- |
| `index.html` | `index.html` | Identical App shell, scroll model and effects |
| `colors_and_type.css` | `colors_and_type.css` | Same token architecture, Casaley values |
| `website.css` | `website.css` | Same selectors in the same order |
| `Header.jsx` | `Header.jsx` | |
| `Hero.jsx` | `Hero.jsx` | |
| `RegisterForm.jsx` | `RegisterForm.jsx` | |
| `BeigeSection.jsx` | `PinkSection.jsx` | The editorial / three-moment section |
| `YellowSection.jsx` | `LenleighSection.jsx` | Was the atmospheric statement section; now an "About Lenleigh" bio fold on velvet |
| `Footer.jsx` | `Footer.jsx` | |
| `404.html`, `privacy-policy.html`, `disclaimer.html` | same | |

## Behaviour carried over

Verified side by side against the Alba build at 1440px and 800px — all of
these match exactly:

- **Fixed hero, scrolling curtain.** The hero is `position: fixed` at
  `z-index: 1` behind a `100vh` spacer; the editorial section scrolls up over
  it at `z-index: 2`.
- **Header reveal** at 20vh of scroll.
- **Register panel.** Open by default on desktop only. Auto-closes once past
  20vh, re-opens on scrolling back into the hero — unless the user closed it
  by hand, which is tracked separately so auto-reopen never fights them.
- **Register tab.** Vertical pull-tab on the right edge, revealed with the
  header; docks to the bottom on mobile.
- **Delegated CTAs.** Any `[data-action="register"]` anywhere on the page
  opens the panel.
- **Moment crossfade.** The sticky image column swaps as each moment's centre
  passes 92% of viewport height; inactive moments sit at `opacity: 0.12` and
  fade up over 2400ms.
- **Sticky top** computed once per resize rather than on scroll, to keep the
  sticky element from jittering.
- Mobile: sticky column hidden, per-moment images shown inline.

## Brand implementation

**Colour.** Sampled from the supplied master brandmark SVGs, not eyeballed:

| Token | Hex | Role (Alba equivalent) |
| --- | --- | --- |
| `--casaley-royal-blue` | `#34469d` | Primary dark — headings, CTAs (walnut) |
| `--casaley-pink-light` | `#f2e2dd` | Page ground, editorial section (beige) |
| `--casaley-pink` | `#e4c3bc` | Deeper pink surfaces |
| `--casaley-velvet` | `#8b4749` | Register panel and tab; About Lenleigh section background (powder blue) |
| `--casaley-orange` | `#df5a3a` | CTAs and the register tab (yellow) |

**Brandmark.** Alba tints one wordmark with CSS filters. Casaley ships four
master colourways, so each placement references the correct file directly —
truer to the artwork than filtering.

**Pattern.** `Casaley pattern.pdf` was decomposed to its underlying geometry
and rebuilt as a seamless 98.065 × 108.72 tile (`assets/pattern-tile.svg`).
It replaces Alba's photographic header-bar texture (at bar height, so it
reads as fine texture) and appears again, full-bleed, behind the hero
wordmark. The About Lenleigh section runs as a flat velvet field with no
texture.

**Type.** Alba pairs Moret with Maison Neue. Casaley runs a single-family
system — Host Grotesk across display, body and utility roles, separated by
weight and tracking. Self-hosted as a variable woff2 (~67 KB total). To serve
the Adobe Fonts (Typekit) cut instead, delete the four `@font-face` blocks in
`colors_and_type.css` and add your kit to `index.html`.

**Imagery.** The hero uses a streetscape photo extracted from the supplied
`Casaley website.pdf`. The three-moment section runs one photo per moment —
a station photo for Location, a facade render for Now Selling, and a
placeholder aerial for Project Updates (flagged with an on-image
"Placeholder only" badge until final imagery is supplied).

## Before this goes live

- **Register form has no endpoint.** `handleSubmit` in `RegisterForm.jsx`
  fakes the confirmation, same as Alba's. Wire it to your CRM or a form
  service.
- **Hero is a still.** Alba's hero runs a looping `alba.mp4`. No Casaley video
  was supplied, so `Hero.jsx` uses `hero.jpg`. The CSS already styles
  `.casaley-hero__image video` identically — drop a video in and swap the tag.
- **Legal pages are placeholder copy.** Generic Australian Privacy Principles
  boilerplate with the entity left unnamed. Needs the client's own policy and
  legal review.
- **"A turnkey collection at Officer"** stands in for Alba's "A collection by
  DM Property" — replace with the developer's name once confirmed.
- **Product options** in the register form (3 / 4 bedroom) are indicative.
  Alba's "Price range" field was swapped for "Enquiring as" rather than invent
  price brackets; restore a price field if you have the real bands.
