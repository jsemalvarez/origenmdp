---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

## Scope

Homepage (`app/page.tsx`) for Origen MdP — Costa Tech. Visitor mode: **Persuade**. Production fidelity, es-AR, single locale. The two unit pages inherit this world as further maps in the same set.

**Third world, 2026-09-16.** Two prior builds shipped and were rejected: *Plano de Líneas* (seed `51a95467`, astillero lines plan) and *Boleta* (Argentine formulario). Both are discarded whole — their components and libs are deleted, not restyled. What changed is not taste but the brief: the user added two binding constraints recorded in PRODUCT.md — **the visual concept must come from the IT and software world**, and **the page needs real motion on entry**, not one restrained moment. Product truth, copy, the service and unit architecture, the quote flow and the Next.js structure carry across all three.

## Pinned by the user's references

Two reference pages were supplied and their qualities are pinned, not optional:

- **flyhyer.com** — an object that idles from load, before any interaction (a plane appearing to glide), that then advances with scroll; sections and text arriving in soft sequence.
- **griffin.com** — an exploded isometric stack whose layers separate and explain themselves on scroll; a numbered list (01–04) at left that activates as each layer arrives; callout labels on leader lines pointing into the stack.

Colours and typography were explicitly left undecided and are therefore this direction's to choose. **The reference palette is not pinned and is deliberately not copied**: near-black with one neon accent over a dotted grid is the category's default and the user's competitors' look.

## Audience and job

A business owner or manager in and around Mar del Plata — clinic, hotel, school, distributor, taller — whose operation runs on WhatsApp, planillas, and software someone built in 2016. Usually arrives by referral, on a phone, skeptical. On arrival they must recognise an IT company.

**Primary action:** quote request carrying service + free-text message. WhatsApp is the impatient path and the failure fallback.

## Proof available

Lingua Campus and Paseos con Peques, as operating businesses. Nothing else. No clients, testimonials, metrics, awards, press or pricing exist — none appear. Logo, unit URLs and unit screenshots are pending and ship as designed placeholder marks in the world's own notation.

## Direction contract

**THESIS.** The page is the memory map of the visitor's operation: regions allocated in ascending address order, with live bytes running underneath. It refuses the category's arrangement (near-black hero, gradient mesh, three icon cards, stats strip, glass CTA) and refuses the hex-dump-as-wallpaper cliché — every region carries its name in plain Spanish at full size, so the map reads as an offer and not as decoration.

**OWN-WORLD.** Memory map and hex dump. Ground `#15131E` tinta — a deep violet-cast ink, never neutral near-black. `#E8DCC8` hueso for allocated, structured content. `#D4653A` naranja quemado as the single live accent for the active region and the primary action — a colour with body, never a neon. `#5F5870` violeta apagado for unallocated matter and `#38334A` for the resting byte field. Type is one variable family worked across its width axis — **Archivo Variable**, condensed for region labels and callouts, wide and heavy for display — with **Chivo Mono Variable** for every address, byte and measurement. Both self-hosted; `next/font/google` silently falls back to Arial where it cannot reach fonts.gstatic.com at build time. Materials: isometric planes in CSS 3D, leader-line callouts, an address gutter, a live byte field.

**STORY.** The visitor understands in one line that this company automates the part of their business still done by hand. They come to believe it because the same four regions appear under two businesses this company built and still operates. They act by choosing a region, which writes itself into the quote, and sending it.

**FIRST VIEWPORT.** Two columns. Left: the headline in wide Archivo, the bajada, and the numbered list `01`–`04` whose rows activate as their region allocates. Right: the isometric stack on tinta ground, with the topmost region `0x0000 · SIN ASIGNAR` alive from load — its hex cells churning and reordering on their own, unprompted. That idle churn is this page's equivalent of the gliding plane, and it is native to the material rather than an effect laid over it. The primary action sits in the left column under the list.

**FORM.** Mapa de Memoria — candidate 7 of 7 on my IT-world grounded list, assigned by the roll. Seed key `c776215f`, assigned card, code-led. Raises carried in, each named for the challenger that donated it: *capa latente* (Mapa del Tesoro) — each region holds a second reading that surfaces on interaction, not only on scroll; *promesa primero* (Semillero de Sobres) — every region opens with what the business gains and keeps the technical detail subordinate; *una sola ley física* (Río de Esmalte) — ascending address governs the whole reading order, with no arbitrary placement; *nombrar lo obvio* (Gramática Industrial) — every region label is plain Spanish at full size, with no cleverness.

**FINISH.** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment

Allocation. The map opens unallocated and noisy; as the visitor descends, each region is claimed, its churn resolving into structure, its callouts drawing in, its row in the numbered list lighting. The noise becoming structure in front of the visitor *is* the thing being sold to a business that works by hand.

## Motion contract — auditable, not decorative

Motion is a named deliverable of this direction, because its absence is why the previous two builds were rejected. The finish reviewer audits these in behaviour:

1. **Idle from load.** The unallocated region's byte field mutates continuously without interaction, at an irregular human cadence, bounded to a fixed cell budget.
2. **Scroll-driven allocation.** Each region lifts in Z, draws its callouts and activates its list row as it arrives, via IntersectionObserver and CSS transforms — never scroll-jacking, never a scrubbed timeline that traps the page.
3. **Soft sequential reveal.** Text arrives staggered within a region, exponential ease-out, from an already-visible default.
4. One orchestrated system, not scattered hover effects. Every one of the above collapses to its resting state under `prefers-reduced-motion`, with all content present.

## Constraints

- Next.js App Router, es-AR only, no i18n scaffolding.
- The isometric stack is built in CSS 3D transforms, not as an image and not as a scrubbed video.
- Every address, region name, callout and byte value is real text in the accessibility tree; the decorative byte field is `aria-hidden`.
- Mobile is designed, not reflowed: the stack flattens to a vertical address gutter with the regions stacked in reading order; the idle churn survives at a reduced cell budget.
- Anti-goals: gradient mesh, glass cards, dotted-grid background, neon accent on near-black, icon tiles for the three services, stats strip, logo wall, stock isometric illustration, scroll-jacking.

## Unresolved

- **Email service for the contact form** — unchosen. Built against Resend behind `RESEND_API_KEY`; the route degrades to the WhatsApp path when the key is absent.
- Deploy target.
- Logo asset, and the live URLs plus screenshots for both units.
- `WHATSAPP_NUMERO` in `lib/content.ts` is empty; WhatsApp affordances stay hidden until it is filled.
