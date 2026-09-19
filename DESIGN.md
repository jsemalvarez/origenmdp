---
name: Origen MdP — Costa Tech
description: A memory map of the visitor's operation — regions allocated in ascending address order, with live bytes running underneath.
colors:
  tinta: "#15131E"
  tinta-honda: "#0E0C16"
  tinta-alta: "#1D1A2A"
  tinta-capa: "#241F35"
  hueso: "#E8DCC8"
  hueso-tenue: "#A89F93"
  naranja: "#D4653A"
  naranja-claro: "#E8834F"
  violeta: "#5F5870"
  byte: "#56506E"
  byte-vivo: "#A396C9"
  filete: "#2E2940"
typography:
  display:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(32px, 3.3vw, 48px)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.032em"
    fontVariation: "font-stretch: 119%"
  headline:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(26px, 3vw, 44px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.028em"
    fontVariation: "font-stretch: 106%"
  title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.2vw, 28px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
    fontVariation: "font-stretch: 106%"
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
    fontVariation: "font-stretch: 76%"
  region-name:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
    fontVariation: "font-stretch: 88%"
  lockup:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.03em"
    fontVariation: "font-stretch: 112%"
  address:
    fontFamily: "Chivo Mono Variable, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.04em"
    fontFeature: "tabular-nums"
  byte:
    fontFamily: "Chivo Mono Variable, ui-monospace, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
    fontFeature: "tabular-nums"
rounded:
  none: "0"
  dot: "50%"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "16px"
  s-4: "24px"
  s-5: "40px"
  s-6: "64px"
  s-7: "104px"
  s-8: "168px"
components:
  button-primary:
    backgroundColor: "{colors.naranja}"
    textColor: "{colors.tinta-honda}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "16px 40px"
  button-primary-hover:
    backgroundColor: "{colors.naranja-claro}"
    textColor: "{colors.tinta-honda}"
  button-primary-disabled:
    backgroundColor: "{colors.violeta}"
    textColor: "{colors.hueso-tenue}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.hueso-tenue}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-ghost-hover:
    textColor: "{colors.naranja}"
  input-field:
    backgroundColor: "{colors.tinta-honda}"
    textColor: "{colors.hueso}"
    typography: "{typography.address}"
    rounded: "{rounded.none}"
    padding: "16px"
  input-field-focus:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.hueso}"
  card-unidad:
    backgroundColor: "{colors.tinta-alta}"
    textColor: "{colors.hueso}"
    rounded: "{rounded.none}"
    padding: "40px"
  plano-capa:
    backgroundColor: "{colors.tinta-capa}"
    textColor: "{colors.hueso-tenue}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
    width: "296px"
    height: "296px"
  selector-option:
    backgroundColor: "transparent"
    textColor: "{colors.hueso-tenue}"
    typography: "{typography.region-name}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  selector-option-active:
    backgroundColor: "{colors.tinta-capa}"
    textColor: "{colors.hueso}"
  pendiente-tag:
    backgroundColor: "transparent"
    textColor: "{colors.naranja}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
---

# Design System: Origen MdP — Costa Tech

## Overview

**Creative North Star: "The Memory Map"**

The page is a memory map of the visitor's operation. Regions are allocated in ascending address order, and that order is the only law of placement on the surface: nothing sits anywhere because it looked good there. Beneath the allocated regions a field of live bytes keeps churning on its own from the moment the page loads — unclaimed matter, still running by hand. What is sold here is the transition from that noise into structure, so the system's job is to make both states materially present at once and let the visitor watch one become the other.

The world is drawn from the IT and software materials themselves — hex addresses, byte fields, allocated blocks, isometric planes, leader-line callouts — and deliberately refuses the category's default dress. There is no gradient mesh, no glass, no dotted grid, no neon-on-near-black. The ground is `tinta`, a violet-cast ink that is emphatically not a neutral near-black; the single live accent is a burnt orange with body in it, not a glow. Every region carries its name in plain Spanish at full display size, so the map reads as an offer rather than as wallpaper.

Density is deliberate and unequal: display type is set wide and tight, labels are set narrow and wide-tracked, and monospace carries every address, byte and measurement without exception. Motion is part of the system, not a finish: idle churn, scroll-driven allocation, and staggered reveals are three expressions of one orchestrated behaviour, and all three collapse to a legible resting state under `prefers-reduced-motion`.

**Key Characteristics:**
- Violet-cast ink ground, never neutral black, never pure black.
- One burnt-orange accent, reserved for the active region and the primary action.
- One variable type family worked across its width axis (76%–119%), plus one monospace for all machine values.
- Zero corner radius everywhere except state dots; hairline rules do the dividing.
- Ascending address order governs reading order; every region is numbered `01`–`04` and addressed in hex.
- Motion is idle-from-load, scroll-driven, and reduced-motion-safe by construction.

## Colors

A violet-cast dark palette in which every colour carries a state, not a decoration: what is allocated, what is active, what is unclaimed, and what is merely running.

### Primary
- **Naranja Quemado** (`{colors.naranja}`): the single live accent. It marks the active region — its plane border, its address, its callout dots and leader lines — and the primary action (`Pedir cotización`, form submit). It also carries the active state of the `01`–`04` index dots, the selector radio dots, and the `:focus-visible` ring across the whole page. It is a pigment with body, never a neon, and it is never used as a surface fill for large areas.
- **Naranja Claro** (`{colors.naranja-claro}`): the lift state only — primary button hover, the proof line under the headline, error text, and confirmation emphasis. Never a resting colour.

### Secondary
- **Violeta Apagado** (`{colors.violeta}`): unallocated matter. It fills the allocated-block bars before a region activates, draws the resting plane borders and list markers, colours the scrollbar thumb, and sets the disabled submit state. Structural, not textual.

### Neutral
- **Tinta** (`{colors.tinta}`): the page ground and the browser theme colour. Violet-cast by intent; a neutral near-black is out of world.
- **Tinta Honda** (`{colors.tinta-honda}`): the recessed well — input backgrounds, scrollbar track, and the text colour printed on the orange action.
- **Tinta Alta** (`{colors.tinta-alta}`): raised panels — unit cards, the form box, the flat mobile map.
- **Tinta Capa** (`{colors.tinta-capa}`): the topmost surface tone — the isometric plane's upper gradient stop and the selected/hovered selector row.
- **Hueso** (`{colors.hueso}`): allocated, structured content. Display type, body emphasis, callout text, and the allocated block bars once a region activates.
- **Hueso Tenue** (`{colors.hueso-tenue}`): the secondary voice — bajadas, detail paragraphs, labels, nav links, resting region names. It clears 4.5:1 on `tinta` with margin, which is why it and not `violeta` is the floor for running text.
- **Filete** (`{colors.filete}`): the hairline rule colour. Every divider, card border, field border and section rule in the page is this 1px line.

### Tertiary
- **Byte en Reposo** (`{colors.byte}`) and **Byte Vivo** (`{colors.byte-vivo}`): the decorative byte field at rest, and the three ticks after a cell mutates. Both were raised from their first values (`#38334A` at rest) specifically so the idle churn is *perceptible*, not merely present — motion that cannot be seen is not motion. The field is `aria-hidden`; these two tokens never carry meaning-bearing text.

### Named Rules
**The One Live Region Rule.** Naranja marks exactly one region at a time, plus the primary action. If two regions are orange at once, the map has stopped saying which one is being explained.

**The Never-Neutral Ground Rule.** The ground is violet-cast ink (`{colors.tinta}`) and its three siblings. Pure black, neutral grey, and near-black-with-neon are all out of world; the cast in the ink is what separates this page from the category.

**The Hueso Tenue Floor Rule.** Running text never goes dimmer than `{colors.hueso-tenue}`. Violeta is a structural colour — borders, bars, markers — and is not a text colour.

## Typography

**Display Font:** Archivo Variable (with `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Archivo Variable — the same family, at a different width
**Label/Mono Font:** Chivo Mono Variable (with `ui-monospace, monospace`)

**Character:** One grotesque worked hard across its width axis, from 76% for the small tracked labels to 119% at display size, paired with a monospace that never appears except where a machine value does. The width axis is the system's signature: if the world is built on that axis, it has to be visible at headline scale and not only in the rótulos.

Both families are self-hosted through `@fontsource-variable/*`. This is a durable decision, not a preference: `next/font/google` must reach `fonts.gstatic.com` at build time and silently falls back to Arial where it cannot, without failing the build.

### Hierarchy
- **Display** (700, `clamp(32px, 3.3vw, 48px)`, 1.04, width 119%, tracking −0.032em): the hero headline only. One per page.
- **Headline** (700, `clamp(26px, 3vw, 44px)`, 1.08, width 106%): section titles and region promises — the line that states what the business gains.
- **Title** (700, `clamp(22px, 2.2vw, 28px)`, 1.12, width 106%): unit names inside cards.
- **Body** (400, 16–17px, 1.6–1.65, width normal): bajadas, detail paragraphs, section text. Held to 42–58ch.
- **Region Name** (600, 13–15px, tracking 0.08–0.12em, uppercase, width 84–88%): the plain-Spanish name of a region wherever it is offered — index rows, selector rows, region subtitles.
- **Label** (600, 10–11px, tracking 0.14–0.16em, uppercase, width 76–80%): rótulos, nav links, field legends, ghost buttons.
- **Address / Byte** (Chivo Mono, 10–14.5px, tabular): every hex address, byte value, block count, placeholder, form input, error string and footer line.

### Named Rules
**The Machine Voice Rule.** Chivo Mono carries every address, byte, measurement and machine-echoed value — including what the visitor types into the form. Prose is never set in mono; a number the machine produced is never set in Archivo.

**The Width-Axis Rule.** Hierarchy is expressed on the width axis before it is expressed on size. Labels narrow (76–88%), display wide (119%). Never introduce a second sans family to do what the axis already does.

**The Plain Name Rule.** Every region label is plain Spanish at full size, with no cleverness and no abbreviation. The name of the offer is the offer.

**The Indivisible Lockup Rule.** "Origen MdP — Costa Tech" is one lockup and is never split across lines or used by halves. On narrow viewports it condenses on the width axis (112% → 86%) and drops to 11.5px rather than breaking.

## Layout

A centred 1500px maximum measure on an 8px rhythm (`{spacing.s-2}` is the unit; the scale runs 4 / 8 / 16 / 24 / 40 / 64 / 104 / 168px on a rough Fibonacci step). A sticky 56px header sits above everything, and every anchor target carries `scroll-margin-top` of header + 16px so nothing lands underneath it.

The two principal sections are two-column grids of equal fractions with a 64px gutter: text left, map right. In the regions section the map is `position: sticky` under the header while the text column scrolls past it, each region block occupying at least 82vh so exactly one region is under discussion at a time. Inactive region blocks sit at 0.34 opacity and resolve to full as they activate.

Three breakpoints each do specific work rather than merely reflowing:
- **1100px** — gutters tighten to 40px, region blocks relax to 74vh, the isometric stack shrinks from 296px to 250px and its fan and lift distances shrink with it.
- **900px** — both grids collapse to one column, the nav sheds its region names down to bare numbers, the WhatsApp affordance leaves the bar, and the 3D stack is replaced entirely by a flat address-gutter map (a 62px mono address column beside the region body). Region blocks lose their viewport-height minimum, go fully opaque, and are divided by hairlines instead.
- **560px** — the lockup condenses on the width axis instead of splitting.

The form grid drops from two columns to one at 680px.

### Named Rules
**The Ascending Address Rule.** Placement follows the address. Regions read `0x0000` upward, top to bottom, in every layout — the isometric stack, the index, the flat narrow-viewport map and the quote selector all agree. There is no arbitrary position on this page.

**The Designed Narrow Rule.** The phone gets a different instrument, not a squeezed one. The 3D stack does not shrink into a phone; it is replaced by the flat address gutter, and the idle churn survives there at a reduced cell budget.

## Elevation & Depth

Depth is geometric and tonal, not shadow-based. The stack is real CSS 3D: one `rotateX(56deg) rotateZ(-40deg)` on the container so every layer stays parallel, then each layer offset on both in-plane axes (26px per index) *and* in Z (62px per index), so the fan opens rather than the planes occluding each other. The layer being explained lifts to a flat `translateZ(236px)` — clear above the whole stack rather than nudged up within it — while keeping its place in the fan so the address order still reads. Elsewhere, elevation is tonal: `tinta-honda` recesses, `tinta-alta` raises, `tinta-capa` tops.

Shadows exist in four narrow roles only, all diffuse and all tied to the accent or to an edge. None is a decorative drop shadow, and none is a hard offset shadow.

### Shadow Vocabulary
- **Edge hairline** (`box-shadow: 0 1px 0 rgba(95, 88, 112, 0.5)`): the bottom edge of an isometric plane, so an unallocated region still reads as a real stratum rather than a plane being erased. Becomes `rgba(212, 101, 58, 0.6)` on the active layer.
- **Active-layer bloom** (`box-shadow: 0 22px 44px -26px rgba(212, 101, 58, 0.5)`): the lifted layer's cast onto the stack below it. Active state only.
- **Action bloom** (`box-shadow: 0 10px 26px -12px rgba(212, 101, 58, 0.9)`, hover `0 18px 34px -14px rgba(212, 101, 58, 0.95)`): under the primary action only, so the one orange rectangle on the page sits off the ground.
- **State-dot halo** (`box-shadow: 0 0 0 4px rgba(212, 101, 58, 0.18)`): the 4px ring around an active index dot, selector dot or confirmation dot.

### Named Rules
**The Lift-Above-All Rule.** The active layer clears the entire stack (`translateZ(236px)`), it does not merely step up one rung. A region under discussion is never partially occluded — a byte field seen through a slot is a bug, not a texture.

**The Accent-Only Shadow Rule.** Every soft shadow in this system is orange-tinted and state-bound. Neutral drop shadows and hard offset shadows are not part of this world.

## Shapes

Zero radius, everywhere. Cards, buttons, inputs, planes, tags and the flat map are all square-cornered (`{rounded.none}`); the only circles in the system are the 9px state dots, the 6px callout dots, and the confirmation dot (`{rounded.dot}`). The vocabulary of division is the 1px hairline (`{colors.filete}`) — borders, section rules, list rules, and the 1px left-rule that marks a proof line or a latent-layer reading. One element is exempt and only one: the unit plate of `04` carries a 3px `{colors.hueso-tenue}` frame, because it does not divide anything — it is the plane that sits on top of its card — and the hairline left it flat against the ground. Nothing else on the page may take a border above 1px.

Recurring silhouettes: the square plane (296px, rotated into isometric), the horizontal allocated-block bar (7px tall, laid in rows), the leader line (52px on desktop, 32px at 1100px, ending in a 6px dot), the address gutter (62px mono column), and the handover hexagon with its square vertex nodes. The hairline colour is available on its own as `--filete-color` for what is stroked rather than bordered; `--filete` remains the 1px border shorthand the rest of the page uses. A region that is not yet allocated carries a dashed plane border; a pending placeholder carries a dashed 1px orange border — dashes mean "reserved, not yet filled" and mean nothing else.

## Components

### Buttons
- **Shape:** square, no radius (`{rounded.none}`).
- **Primary:** orange fill on deep-ink text, 700 weight at 106% width, 16px × 40px padding, carrying the action bloom. There is one primary action per section at most.
- **Hover / Focus:** lifts 2px, brightens to `{colors.naranja-claro}`, bloom deepens — all over 260ms on the single page easing curve. Focus shows the global 2px orange ring at 3px offset. Active returns to 0.
- **Disabled:** violeta fill, hueso-tenue text, bloom removed, `cursor: progress` (the submit's in-flight state).
- **Ghost / secondary:** tracked uppercase micro-label in hueso-tenue, no box; goes orange on hover. The bordered variant (latent-layer toggle) uses a `{colors.filete}` hairline box that turns orange on hover.

### Cards / Containers
- **Corner Style:** square.
- **Background:** `{colors.tinta-alta}` on a `{colors.filete}` hairline.
- **Shadow Strategy:** none — see Elevation. Hover shifts the border to `{colors.violeta}` over 320ms.
- **Internal Padding:** 40px desktop, 24px below 900px.
- The card is not a page scaffold here. `04 · Lo construido` used to be three of them side by side; it is now one band per unit, where the card is the half a plate overlaps rather than a box standing on its own (see Unit Plates). A card in this system pairs a wide 700-weight name with a mono status marker and its mono proof line in orange, and it is never nested inside another card.

### Inputs / Fields
- **Style:** recessed `{colors.tinta-honda}` well, `{colors.filete}` hairline, zero radius, 16px padding, and the value set in Chivo Mono at 14.5px — the visitor's typing is a machine value like any other.
- **Focus:** border goes orange, background lifts to `{colors.tinta}`, plus a 2px orange outline at 2px offset.
- **Error:** border goes orange and a mono message in `{colors.naranja-claro}` appears beneath; the field itself is never tinted red.
- **Labels:** the narrow tracked uppercase label, with an optional-marker in mono to its right.

### Navigation
Sticky 56px bar on `rgba(21, 19, 30, 0.88)` with a 10px backdrop blur and a hairline bottom border. Links are the narrow tracked micro-label in hueso-tenue, each prefixed by its mono region number; hover goes orange and draws a 1px orange underline. Below 900px the names drop away and the numbers alone remain, and the bar's WhatsApp affordance is hidden. The lockup sits left and never breaks.

### Isometric Region Stack (signature)
Four square planes on a single rotation, fanned on both in-plane axes and in Z. Each plane carries its hex address (mono, left) and its region name (narrow Archivo, 76% width, 0.72 opacity — deliberately ambient, since isometric distortion disqualifies it from carrying hierarchy; the index and the 2D callouts carry the real reading). Inside, a churning byte field and an allocated-block structure occupy the same box and cross-fade as the region allocates: the noise blurs out at 3px while the structure resolves. The active plane borders orange, lifts clear of the stack, and takes its callouts. The whole plane is the hit area — a button with no drawn chrome, showing only the global focus ring.

### Leader-Line Callouts (signature)
A 2D layer above the 3D scene so labels are never distorted: a 6px orange dot, a 52px orange 1px line at 0.6 opacity, and a mono uppercase label in hueso. Two per active region, pinned to the measured screen band of the lifted plane — 11% from top on the left, 24% on the right — and entering staggered at 140ms + 110ms per index.

### Live Byte Field (signature)
A monospace grid (16×7 default, 11 columns inside a plane, reduced on narrow viewports) of two-hex-digit cells in `{colors.byte}`. Cells mutate by direct DOM writes on a `requestAnimationFrame` loop at roughly 100ms cadence, 6 cells per tick, each mutated cell flashing `{colors.byte-vivo}` for three ticks before decaying back over 420ms. The initial field is generated from a seeded PRNG so server and client render identically; mutation starts only after mount. An IntersectionObserver pauses the loop offscreen, and the loop never starts at all under `prefers-reduced-motion`. The field is `aria-hidden`.

### Responsive Storefront Trio (signature)

The `01 · Sitio web o tienda online` mark: one storefront drawn at three widths — a browser window, a tablet and a phone — stood on a shared floor in descending height, each carrying its real viewport width (`1440`, `768`, `390`) in mono above a hairline of its own. The group reads as a dimension sheet rather than a product shot, and the staircase its silhouettes make is a consequence of those measurements, not a chart.

**One layout, three widths.** The three screens are declared once in the component and differ only in four numbers: how many columns the product grid falls into (3 / 2 / 1), how many products, how many nav links, and which parts still fit. Writing three separate mockups would assert in the code the opposite of what the band asserts. Each screen carries a nav (a filled hueso square for the client's own mark, link ticks, an outlined cart), a headline and subhead bar, the product grid, and a footer pairing a chart-shaped module with the buy affordance.

**Square corners are what save it.** No radius, no notch, no home button — the devices are drawn from the same 1px hairline and `{colors.tinta-alta}` ground as every other box on the page, so they read as *viewports at a given width* rather than as a stock device mockup. Screens are the recessed `{colors.tinta-honda}` well; the byte field runs behind the desktop screen only, at 0.14 once resolved, because the business data keeps running under a finished shop.

**Scale is continuous, detail is stepped.** Everything drawn inside the three screens is measured in `--px`, a container-query unit (`0.2273cqw`, exactly 1px at the mark's 440px box), so the trio shrinks with its container instead of snapping at breakpoints and being squeezed at the widths in between. A per-device `--k` sets how much detail each screen carries — roughly the root of the width ratio rather than the ratio itself, since at true ratio the phone's margins land on half a pixel. Type does not scale: the address and the three measurements hold their own size, on the same principle as the handover ring's names.

**The frames arrive before their contents.** The three boxes are present from the start and what resolves is what is inside them: the noise blurs out while the storefront sweeps in from the left, screen by screen. A frame that faded in would leave nowhere to watch the noise become a shop, which is this page's one argument. Every delay derives by `calc()` from a single `--base` per screen (0 / 220 / 440ms) and a single `--i` per piece, so the sweep cannot drift out of step with itself.

**Nothing in it claims a result.** The chart-shaped module is page furniture — six even bars inside a hairline box, no axis, no figures, and a deliberate non-trend that opens at 64 and closes at 58. The price lines show a mono `$` and a redacted bar, which is this system's notation for something that exists but is not ours to fill in. The only numerals in the mark are the three viewport widths, and those are measurements. One orange rectangle per screen, on the buy affordance: inside a mark naranja names what is live, as it does for the lit cubes of the 02 and the changing vertex of the 04.

### Index Rows / Selector
A four-row hairline-ruled list: a 9px ring dot, a mono number, the region name in narrow tracked uppercase, and a mono hex address. Active fills the dot orange with its 4px halo, brings the name to hueso, and turns the address orange. The quote-form selector is the same row, plus a `{colors.tinta-capa}` fill on the selected and hovered row. Choosing a region in either place is the same choice, written into the quote.

### Handover Ring (signature)
The `04 · Capacitaciones` mark: six named tools at the vertices of a hexagon, placed clockwise from twelve o'clock in ascending address order under `0xC000` — the map's own region 04. Each vertex is a square node (36px desktop, 32/30/26px down the breakpoints) holding a 14px authored monoline glyph at 1px stroke, with its plain-Spanish name set in the tracked micro-label just outside the figure.

**Two movements, and the difference between them is the argument.** The *handover* runs once on arrival and never again: nodes and edges travel from `{colors.violeta}` to `{colors.hueso}` one at a time, 380ms apart over 1000ms each, and the piece changing hands wears naranja plus the 4px state-dot halo. Its rise into orange is linear so exactly one vertex is live at a time; only the decay back to hueso carries the page easing curve. The hueso it lands on never moves again — a delivery that undoes itself to redo itself is not a delivery. The *round* then starts half a second later and does not stop: a naranja light laps the finished ring every 5400ms, node to edge to node, lighting each piece for its sixth of the turn. It hands nothing back; what it paces is the operation running in the client's hands. Under the round a name brightens to `{colors.hueso}` rather than going orange — naranja in this mark means *changing hands*, and in the round nothing changes hands.

Both animations are declared on the same elements, handover first and round second so the later one wins once it begins; the round carries no fill, so while it waits its turn the handover holds its own final state and the handoff between them shows no seam. All timings live in the stylesheet as custom properties and every delay is derived from them with `calc()` off a single `--i` the component passes — the two movements cannot drift apart. The round pauses through `animation-play-state` whenever the mark loses `data-vivo`, since an infinite animation three screens away is spend with nothing to show for it.

The hexagon is deliberately irregular — compressed on X (rx 96, ry 112 in a 440×352 viewBox) — so the four side vertices pull inward and leave their names room to sit outside the figure. The two longest names take the top and bottom vertices, where a centred label has the full width of the box. A regular hexagon in a landscape box pushes the names out of frame.

Once the handover closes, no node is left holding a resting accent: what is ours is gone, and the only standing orange is the `0xC000` in the centre readout, which is an address and not a decoration.

**Materials note.** This is the one place the page draws with SVG rather than CSS boxes, and the split is deliberate: the hexagon's geometry goes in SVG so it scales with its box while `vector-effect="non-scaling-stroke"` holds the 1px hairline, and every piece carrying typography stays in HTML so names and addresses keep their own size and tracking instead of shrinking with the drawing until they are unreadable on a phone. The glyphs are authored here, not pulled from a library — a stock icon in this band would say "technology in general", which is exactly what the band must not say.

### Unit Plates (signature)

The opening movement of `04 · Lo construido`: one band per product this company built and runs, each a square plate laid over the card that explains it. It replaced three cards in a grid whose flat maps were identical — the largest element in each card and the one carrying the least — then an allocation matrix, which told the truth and compared at a glance but read as a spec sheet, and then a version where the plate carried that unit's own memory map.

**The plate is the logotype's place.** The brand files exist and have not been supplied, so the plate holds the unit's initials and nothing else: a hole with the shape of a mark, not a drawing standing in for one. Two letters, derived from the name rather than authored per unit, in `{colors.hueso-tenue}` rather than hueso — hueso is the colour of what is actually there. The day the files arrive, the plate's contents are replaced and nothing else moves.

**What the plate stopped carrying.** Until 2026-09-18 it held that unit's four allocated regions, which is what made the section's heading checkable: Lingua with two regions taken, Paseos with one, the prototype with none in production. That reading left the page with the map. The data stays confirmed and live in `lib/content.ts`, unrendered, for whenever there is somewhere to show it — the same treatment `CONTRA` gets. What remains of the map here is the byte ribbons, which prove nothing and claim nothing.

**Two planes that overlap, and the overlap is the composition.** Plate and card occupy the same grid cell; the card is pushed right by the plate's width less the overlap, and the plate wins on `z-index`. The card's left padding clears the plate exactly, so no line of prose ever runs beneath it, and its right padding repeats that same inset, so the text block sits symmetrically inside the card rather than shunted against one edge. The card's minimum height is the plate plus 64px, which insets the plate top and bottom rather than letting the two boxes align. Two boxes side by side are a layout; two boxes that overlap are a construction.

**This is the one block on the page that is centred rather than flush left**, and its heading travels with it on the same 1180px measure. Centring the bands alone would leave the title against the left edge and the composition in the middle, which is worse than either on its own; so the two share a wrapper and the title stays in square with the plates. The bands do not stretch to the section's full measure either: a unit's paragraph is three lines, and a card run to the edge leaves the text swimming. The community register below keeps the full measure — it is a sticky two-column scene and cannot be narrowed — so the hairline that separates them runs full width and marks the change of movement rather than pretending there is none.

**The plate's frame is 3px, and it is the one exception to the hairline rule.** Everything else on this page divides with the 1px `{colors.filete}`. The plate does not divide anything — it is the piece that sits on top — and at `#2E2940` on `#15131E` it did not separate from the ground at all. The frame is `{colors.hueso-tenue}` because what will occupy that square is a mark, and the frame may not outweigh it. Its ground is `{colors.tinta-capa}` with the edge-hairline shadow underneath, the same ground and bottom edge the isometric planes of `02` carry, so the square stays this page's material rather than an empty box. This exception is granted to the plate alone; no other element on the page earns a border above 1px.

**Two lines of bytes above the card and two below.** The material of `0x0000` — the region nobody reserved — running over and under each of our own products, which is what the section's heading says in so many words. The ribbons reach the card's edges, so the card itself carries no padding and its three bands carry their own: a byte field with a margin stops reading as something running underneath and starts reading as a centred ornament. They fade at both ends and clip, because a memory dump neither begins nor ends, and they pass behind the plate, so the field appears to come out from under it.

**The two planes enter crossing.** The card travels in from the right and the plate from the left, toward the point where they overlap: the movement *is* the assembly — two pieces meeting — rather than a generic fade applied to a box. The plate leaves 120ms later, because entering together the pair is already superimposed for the whole trip and the overlap is never seen to happen; with the card first, the plate lands on top at the end of its travel and which one is above reads without a word. As the band lands, the plate's frame and its edge hairline take naranja and decay back on the page curve — one live thing at a time, and no accent left standing afterwards except the unit's mono proof line, which is evidence and not decoration.

**A unit's link is its bare address in mono**, lowercase and underlined, not a tracked "Ver el sitio" button — the community register sits directly below in the same section carrying its links that way, and two treatments for *go and look at it* read as two different things. The footer checks for an address before it checks for a reserved marker: all three units are linkable, and what stays withheld on the prototype is the client's name, which its description carries and the footer does not.

**The card comes first in the DOM** although it is drawn second, so a screen reader hears which product this is before a pair of initials; the grid decides position, not source order, and the initials are `aria-hidden` because the name is already the heading. Below 900px the composition rotates rather than shrinking: the plate goes above and the card below, still overlapping, and the plate stays narrower than the card — at equal widths the two stacked boxes read as one box split in half and the overlap disappears. The top ribbon, which the plate would cover there, pushes its own padding down instead.

### Community Timeline (signature)

The closing movement of `04 · Lo construido`: community work plotted down a single vertical line that crosses from allocated into unallocated at a `hoy` marker, with a card passing alongside it as the visitor descends. It replaced two twin cards that read as a CV entry, and then a first version that kept each entry’s detail inside the line — correct, but 1100px of identical stacked paragraphs with nothing lit, because a register of finished things has nothing live to colour.

**The split is what makes it work.** The line keeps one row per entry — year, node, name — so nine years read at a glance, which is the argument. Everything else moves to a card. Nothing is read twice, and hierarchy appears: a small list beside one large piece. The line and the section heading sit in a sticky column; the cards scroll past in the other, each taking 45vh, the one crossing the middle band at full strength and its neighbours dimmed to 0.22. Two adjacent blocks dimming *are* the cross-fade — no stacking, no scrubbed scroll. It is the section 02 mechanism reused, deliberately: the visitor already learned that choreography, and the material differs (flat cards with their source, not a 3D stack with callouts).

**Naranja arrives only with the active state, and the system requires it.** With nothing live there was nothing to colour, which is why the first version was flat. Scroll creates a live entry, and the page’s law is one live region at a time in naranja everywhere it appears at once — here the year, the node and the name together, with the node taking the 4px state-dot halo. Solid orange is live; dashed orange is reserved; the two never blur.

**Three node forms, none decorative.** A square is a moment that happened — a hackathon lasts a weekend. A bar running the height of its row is a stretch that ran and ended. **The bar brackets a span, it does not measure one**: its height comes from its row, and the card’s two years carry the duration; putting the line on a true time scale would open dead gaps between entries. A dashed square is reserved and does not exist yet. No fourth state is needed for “no longer in use” — the bar stops, and that says it.

**Below the `hoy` crossing** the rail stops being a stroke and becomes a dashed violeta repeating-gradient, ending in a masked byte field fading downward: the stretch that has not happened is drawn with the material the map uses for a region nobody reserved. A missing value is drawn, never filled in — an unconfirmed year shows the dashed orange placeholder, deliberately ugly, until someone writes it in the data.

**A link only where there is one.** Cards carry the project’s bare address in mono or its press source, and entries without either simply have no footer rather than a row of pending placeholders. That notation serves one gap; across a whole panel it becomes a sign that nothing is there. Measurements a third party could count — `23 h · 120 inscriptos · 10 proyectos` — sit in mono beside the prose, and each one is checkable at the source linked below it.

Each row is also a button, so a keyboard visitor can jump entries instead of rolling through three screens. Below 1100px the scene stacks, the column unsticks, the cards all come up to full strength, and the compact line stays on top as the table of contents it already is. The hidden state lives behind the `.js` class like every other reveal on the page.

## Do's and Don'ts

### Do:
- **Do** place by address. Ascending hex order is the only ordering law on this page; every view of the regions must agree with it.
- **Do** keep exactly one region live at a time, in naranja, everywhere it appears at once — plane, callouts, index row, address.
- **Do** set every address, byte, measurement and user-typed value in Chivo Mono with tabular numerals, and everything a person wrote in prose in Archivo.
- **Do** express hierarchy on the width axis first (76% labels → 119% display) before reaching for size or a second family.
- **Do** ship the hidden reveal state behind the `.js` class that an inline `<head>` script sets before paint. Content is present and visible without JavaScript, without hydration, and if the observer never fires. This pattern is load-bearing and any new animated reveal must adopt it.
- **Do** put the safety net for a dead observer inside `useEnVista` and nowhere else, and let it trip only when the observer has never answered and only once the tab is actually visible. A plain timer in the component fires while the section is still three screens away or the tab is still in the background: the animation runs with nobody watching, and the visitor arrives to find everything already in its final state. A healthy observer answers the moment it observes, even off-screen, so that one fact is what tells the net to stand down.
- **Do** give every motion a reduced-motion resting state in the same stylesheet that dims something. Nothing that scroll activation turns on may stay off for a user who cannot scroll it on.
- **Do** keep the byte field decorative and `aria-hidden`, and keep every region name, address and callout as real text in the accessibility tree.
- **Do** theme the browser's own surfaces from the palette — selection, caret, `accent-color`, scrollbar track and thumb, `:focus-visible`, underline offset, tabular numerals. The page does not stop at its own edge.
- **Do** mark missing proof as a designed placeholder in the world's notation (dashed orange hairline, mono label), never as a filled-in stand-in — and only where it serves one gap. A panel closing on a row of them stops pointing at a hole and starts saying nothing here is real, so a card or column with nothing to link simply has no footer.

### Don't:
- **Don't** use a neutral near-black or pure black ground. The violet cast in `{colors.tinta}` is the identity.
- **Don't** treat naranja as a surface colour or a glow. It is a pigment with body, reserved for the live region and the primary action.
- **Don't** set running text, placeholders or addresses in `{colors.violeta}`. It is a structural colour for borders, bars and markers.
- **Don't** round a corner. Radius exists only for state dots.
- **Don't** lift an active layer partway. It clears the whole stack or it is not the active layer.
- **Don't** put a callout label inside the 3D space, and don't terminate a leader line in empty ground — the line must land on the lifted plane's measured band.
- **Don't** jack the scroll, scrub a timeline, or make any content depend on an animation in order to be readable.
- **Don't** load type through `next/font/google`. Both families are self-hosted because that path silently degrades to Arial when the build host cannot reach fonts.gstatic.com.
- **Don't** imply evidence that does not exist — no clients, testimonials, metrics, awards, press or pricing have a visual slot in this system, and none may be invented to fill a layout.
- **Don't** split "Origen MdP — Costa Tech". It condenses on the width axis; it never breaks or appears by halves.
